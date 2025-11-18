import { useRef } from 'react'
import { AddressBarIcon } from './address-bar-icon'
import style from './index.module.css'
import { SearchInput } from './search-input'
import { SuggestionsDropdown } from './suggestions-dropdown'
import { useDropdown } from './use-dropdown'
import { useSuggestions } from './use-suggestions'
import { useTabState } from './use-tab-state'
import { cleanUrl, formatUrlForNavigation } from './utils'

export default function AddressBar() {
    const inputRef = useRef<HTMLInputElement>(null)
    const { currentTab, inputValue, setInputValue } = useTabState()
    const {
        showDropdown,
        setShowDropdown,
        selectedIndex,
        setSelectedIndex,
        dropdownRef,
    } = useDropdown(inputRef)
    const { suggestions, hasSearchQuery } = useSuggestions(
        inputValue,
        showDropdown,
    )

    const totalItems = hasSearchQuery
        ? suggestions.length + 1
        : suggestions.length
    const shouldShowDropdown =
        showDropdown && (hasSearchQuery || suggestions.length > 0)

    const navigateToUrl = (url: string) => {
        if (!currentTab?.id) return

        const formattedUrl = formatUrlForNavigation(url)
        chrome.tabs.update(currentTab.id, { url: formattedUrl })
    }

    const handleInputChange = (value: string) => {
        setInputValue(value)
        setShowDropdown(true)
        setSelectedIndex(-1)
    }

    const handleInputFocus = () => {
        setShowDropdown(true)
    }

    const handleSearchClick = () => {
        navigateToUrl(inputValue)
        setShowDropdown(false)
    }

    const handleHistoryClick = (url: string) => {
        navigateToUrl(url)
        setInputValue(cleanUrl(url))
        setShowDropdown(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault()
                handleEnterKey()
                break
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex((prev: number) =>
                    Math.min(prev + 1, totalItems - 1),
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex((prev: number) => Math.max(prev - 1, -1))
                break
            case 'Escape':
                setShowDropdown(false)
                inputRef.current?.blur()
                break
        }
    }

    const handleEnterKey = () => {
        if (selectedIndex === -1) {
            // No selection, navigate to input value
            navigateToUrl(inputValue)
        } else if (selectedIndex === 0 && hasSearchQuery) {
            // Google search selected
            navigateToUrl(inputValue)
        } else {
            // History item selected
            const historyIndex = hasSearchQuery
                ? selectedIndex - 1
                : selectedIndex
            const selectedItem = suggestions[historyIndex]
            if (selectedItem?.url) {
                navigateToUrl(selectedItem.url)
                setInputValue(cleanUrl(selectedItem.url))
            }
        }

        setShowDropdown(false)
        inputRef.current?.blur()
    }

    return (
        <div className={style['address-bar']}>
            <div>
                <div className={style['address-bar-icon']}>
                    <AddressBarIcon favIconUrl={currentTab?.favIconUrl} />
                </div>

                <SearchInput
                    inputRef={inputRef}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    onValueChange={handleInputChange}
                    value={inputValue}
                />
            </div>

            {shouldShowDropdown && (
                <SuggestionsDropdown
                    dropdownRef={dropdownRef}
                    hasSearchQuery={hasSearchQuery}
                    onHistoryClick={handleHistoryClick}
                    onItemHover={setSelectedIndex}
                    onSearchClick={handleSearchClick}
                    searchQuery={inputValue}
                    selectedIndex={selectedIndex}
                    suggestions={suggestions}
                />
            )}
        </div>
    )
}
