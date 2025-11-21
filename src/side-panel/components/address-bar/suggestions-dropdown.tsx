import { Activity } from 'react'
import { GoogleSearchItem } from './google-search-item'
import { HistoryItem } from './history-item'
import style from './suggestions-dropdown.module.css'

export function SuggestionsDropdown({
    dropdownRef,
    hasSearchQuery,
    searchQuery,
    suggestions,
    selectedIndex,
    onSearchClick,
    onHistoryClick,
    onDelete,
    onItemHover,
}: {
    dropdownRef: React.RefObject<HTMLDivElement | null>
    hasSearchQuery: boolean
    searchQuery: string
    suggestions: chrome.history.HistoryItem[]
    selectedIndex: number
    onSearchClick: () => void
    onHistoryClick: (url: string) => void
    onDelete: (url: string) => void
    onItemHover: (index: number) => void
}) {
    return (
        <div className={style.dropdown} ref={dropdownRef}>
            <Activity mode={hasSearchQuery ? 'visible' : 'hidden'}>
                <GoogleSearchItem
                    isSelected={selectedIndex === 0}
                    onClick={onSearchClick}
                    onMouseEnter={() => onItemHover(0)}
                    query={searchQuery}
                />
            </Activity>

            {suggestions.map((item, index) => {
                const itemIndex = hasSearchQuery ? index + 1 : index

                return (
                    <HistoryItem
                        isSelected={itemIndex === selectedIndex}
                        item={item}
                        key={`${item.url}-${item.lastVisitTime}`}
                        onClick={() => item.url && onHistoryClick(item.url)}
                        onDelete={() => item.url && onDelete(item.url)}
                        onMouseEnter={() => onItemHover(itemIndex)}
                    />
                )
            })}
        </div>
    )
}
