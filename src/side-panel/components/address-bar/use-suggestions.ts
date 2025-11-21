import { useEffect, useState } from 'react'
import { MAX_HISTORY_SUGGESTIONS, SEARCH_DEBOUNCE_MS } from './constants'
import type { UseSuggestionsReturn } from './types'
import { isValidUrl } from './utils'

export function useSuggestions(
    inputValue: string,
    showDropdown: boolean,
): UseSuggestionsReturn {
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

            chrome.history.search(
                {
                    maxResults: MAX_HISTORY_SUGGESTIONS * 2,
                    startTime: 0,
                    text: inputValue.trim(),
                },
                results => {
                    const sortedResults = results.sort((a, b) =>
                        sortingFunction(a, b, trimmedInput),
                    )

                    setSuggestions(
                        sortedResults.slice(0, MAX_HISTORY_SUGGESTIONS),
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

const sortingFunction = (
    a: chrome.history.HistoryItem,
    b: chrome.history.HistoryItem,
    trimmedInput: string,
) => {
    const aUrl = (a.url || '').toLowerCase()
    const bUrl = (b.url || '').toLowerCase()
    const aTitle = (a.title || '').toLowerCase()
    const bTitle = (b.title || '').toLowerCase()

    const aUrlStartsWith =
        aUrl.includes(`://${trimmedInput}`) ||
        aUrl.includes(`://www.${trimmedInput}`)
    const bUrlStartsWith =
        bUrl.includes(`://${trimmedInput}`) ||
        bUrl.includes(`://www.${trimmedInput}`)

    if (aUrlStartsWith && !bUrlStartsWith) return -1
    if (!aUrlStartsWith && bUrlStartsWith) return 1

    const aTitleStartsWith = aTitle.startsWith(trimmedInput)
    const bTitleStartsWith = bTitle.startsWith(trimmedInput)

    if (aTitleStartsWith && !bTitleStartsWith) return -1
    if (!aTitleStartsWith && bTitleStartsWith) return 1

    const aUrlIncludes = aUrl.includes(trimmedInput)
    const bUrlIncludes = bUrl.includes(trimmedInput)

    if (aUrlIncludes && !bUrlIncludes) return -1
    if (!aUrlIncludes && bUrlIncludes) return 1

    return (b.visitCount || 0) - (a.visitCount || 0)
}
