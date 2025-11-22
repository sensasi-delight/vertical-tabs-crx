import { useEffect, useState } from 'react'
import { isValidUrl } from './utils'

const MAX_HISTORY_SUGGESTIONS = 7 // 7 history + 1 Google search = 8 total
const SEARCH_DEBOUNCE_MS = 150

export function useSuggestions(
    inputValue: string,
    showDropdown: boolean,
): {
    suggestions: chrome.history.HistoryItem[]
    hasSearchQuery: boolean
    deleteSuggestion: (url: string) => void
} {
    const [suggestions, setSuggestions] = useState<
        chrome.history.HistoryItem[]
    >([])

    useEffect(() => {
        if (!showDropdown) {
            setSuggestions([])
            return
        }

        const searchHistory = () => {
            const trimmedInput = inputValue.trim().toLowerCase()

            if (!trimmedInput) {
                setSuggestions([])
                return
            }

            chrome.history.search(
                {
                    maxResults: MAX_HISTORY_SUGGESTIONS * 5, // Fetch more to allow filtering
                    startTime: 0,
                    text: inputValue.trim(),
                },
                results => {
                    const sortedResults = results.sort((a, b) =>
                        sortingFunction(a, b, trimmedInput),
                    )

                    const filteredResults =
                        filterSimilarSuggestions(sortedResults)

                    setSuggestions(
                        filteredResults.slice(0, MAX_HISTORY_SUGGESTIONS),
                    )
                },
            )
        }

        const timeoutId = setTimeout(searchHistory, SEARCH_DEBOUNCE_MS)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [inputValue, showDropdown])

    const trimmedUrl = inputValue.trim()

    const hasSearchQuery = trimmedUrl.length > 0 && !isValidUrl(trimmedUrl)

    const deleteSuggestion = (url: string) => {
        chrome.history.deleteUrl({ url }, () => {
            setSuggestions(prev => prev.filter(item => item.url !== url))
        })
    }

    return { deleteSuggestion, hasSearchQuery, suggestions }
}

function filterSimilarSuggestions(
    items: chrome.history.HistoryItem[],
): chrome.history.HistoryItem[] {
    const seenUrls = new Set<string>()
    const seenTitles = new Set<string>()

    return items.filter(item => {
        if (!item.url) return false

        // Normalize URL: remove protocol, www, and trailing slash
        const normalizedUrl = item.url
            .replace(/^(https?:\/\/)?(www\.)?/, '')
            .replace(/\/$/, '')

        if (seenUrls.has(normalizedUrl)) return false
        seenUrls.add(normalizedUrl)

        // Filter by title similarity if title exists
        // This prevents showing multiple pages with the exact same title
        if (item.title) {
            const normalizedTitle = item.title.trim().toLowerCase()
            if (seenTitles.has(normalizedTitle)) return false
            seenTitles.add(normalizedTitle)
        }

        return true
    })
}

const sortingFunction = (
    a: chrome.history.HistoryItem,
    b: chrome.history.HistoryItem,
    trimmedInput: string,
) => {
    const aUrl = (a.url || '')
        .toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
    const bUrl = (b.url || '')
        .toLowerCase()
        .replace(/^(https?:\/\/)?(www\.)?/, '')
    const aTitle = (a.title || '').toLowerCase()
    const bTitle = (b.title || '').toLowerCase()

    // 1. Exact match (highest priority)
    if (aUrl === trimmedInput && bUrl !== trimmedInput) return -1
    if (bUrl === trimmedInput && aUrl !== trimmedInput) return 1

    // 2. Starts with URL (very high priority)
    const aStartsWith = aUrl.startsWith(trimmedInput)
    const bStartsWith = bUrl.startsWith(trimmedInput)
    if (aStartsWith && !bStartsWith) return -1
    if (!aStartsWith && bStartsWith) return 1

    // 3. Starts with Title (high priority)
    const aTitleStart = aTitle.startsWith(trimmedInput)
    const bTitleStart = bTitle.startsWith(trimmedInput)
    if (aTitleStart && !bTitleStart) return -1
    if (!aTitleStart && bTitleStart) return 1

    // 4. Visit Count (higher is better)
    const visitDiff = (b.visitCount || 0) - (a.visitCount || 0)
    if (visitDiff !== 0) return visitDiff

    // 5. Recency (newer is better)
    return (b.lastVisitTime || 0) - (a.lastVisitTime || 0)
}
