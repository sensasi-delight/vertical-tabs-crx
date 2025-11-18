export interface UseTabStateReturn {
    currentTab: chrome.tabs.Tab | undefined
    inputValue: string
    setInputValue: (value: string) => void
}

export interface UseDropdownReturn {
    showDropdown: boolean
    setShowDropdown: (show: boolean) => void
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    dropdownRef: React.RefObject<HTMLDivElement | null>
}

export interface UseSuggestionsReturn {
    suggestions: chrome.history.HistoryItem[]
    hasSearchQuery: boolean
}
