import { useEffect, useState } from 'react'
import { MAX_HISTORY_SUGGESTIONS, SEARCH_DEBOUNCE_MS } from './constants'
import type { UseSuggestionsReturn } from './types'

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
            chrome.history.search(
                {
                    maxResults: MAX_HISTORY_SUGGESTIONS,
                    startTime: 0,
                    text: inputValue.trim(),
                },
                results => {
                    setSuggestions(results)
                },
            )
        }

        const timeoutId = setTimeout(searchHistory, SEARCH_DEBOUNCE_MS)
        return () => clearTimeout(timeoutId)
    }, [inputValue, showDropdown])

    const hasSearchQuery = inputValue.trim().length > 0

    return { hasSearchQuery, suggestions }
}
