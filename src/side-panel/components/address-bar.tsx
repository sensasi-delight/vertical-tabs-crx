import { useEffect, useRef, useState } from 'react'
import style from './address-bar.module.css'

const MAX_SUGGESTIONS = 7 // 7 history + 1 Google search = 8 total

export default function AddressBar() {
    const [inputValue, setInputValue] = useState('')
    const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>()
    const [showDropdown, setShowDropdown] = useState(false)
    const [suggestions, setSuggestions] = useState<
        chrome.history.HistoryItem[]
    >([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const isInitRef = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isInitRef.current) return

        isInitRef.current = true

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            setCurrentTab(tabs[0])
            setInputValue(cleanUrl(tabs[0].url ?? ''))
        })

        chrome.tabs.onActivated.addListener(({ tabId }) => {
            chrome.tabs.get(tabId, tab => {
                setCurrentTab(tab)
                setInputValue(cleanUrl(tab.url ?? ''))
                setShowDropdown(false)
            })
        })

        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (tabId === currentTab?.id && changeInfo.url) {
                setCurrentTab(tab)
                setInputValue(cleanUrl(changeInfo.url))
                setShowDropdown(false)
            }
        })

        return () => {
            chrome.tabs.onActivated.removeListener(() => {})
            chrome.tabs.onUpdated.removeListener(() => {})
        }
    }, [currentTab])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                !inputRef.current?.contains(e.target as Node)
            ) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Search history when input changes
    useEffect(() => {
        if (!showDropdown) {
            setSuggestions([])
            return
        }

        const searchHistory = () => {
            chrome.history.search(
                {
                    maxResults: MAX_SUGGESTIONS,
                    startTime: 0,
                    text: inputValue.trim(),
                },
                results => {
                    setSuggestions(results)
                },
            )
        }

        // Debounce search
        const timeoutId = setTimeout(searchHistory, 150)
        return () => clearTimeout(timeoutId)
    }, [inputValue, showDropdown])

    return (
        <div className={style['address-bar']}>
            <div>
                <div className={style['address-bar-icon']}>
                    {currentTab?.favIconUrl ? (
                        <img
                            alt="Favicon"
                            height={16}
                            src={currentTab.favIconUrl}
                            width={16}
                        />
                    ) : (
                        <svg
                            aria-hidden="true"
                            fill="none"
                            height="16"
                            viewBox="0 0 16 16"
                            width="16">
                            <circle
                                cx="8"
                                cy="8"
                                r="7"
                                stroke="#444"
                                strokeWidth="2"
                            />
                        </svg>
                    )}
                </div>

                <input
                    className={style['address-bar-input']}
                    onChange={e => {
                        setInputValue(e.target.value)
                        setShowDropdown(true)
                        setSelectedIndex(-1)
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && currentTab) {
                            e.preventDefault()
                            if (
                                selectedIndex >= 0 &&
                                suggestions[selectedIndex]
                            ) {
                                const suggestion = suggestions[selectedIndex]
                                handleSubmit(suggestion.url || '', currentTab)
                            } else {
                                handleSubmit(inputValue, currentTab)
                            }
                            setShowDropdown(false)
                            inputRef.current?.blur()
                        } else if (e.key === 'ArrowDown') {
                            e.preventDefault()
                            setSelectedIndex(prev =>
                                prev < suggestions.length - 1 ? prev + 1 : prev,
                            )
                        } else if (e.key === 'ArrowUp') {
                            e.preventDefault()
                            setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
                        } else if (e.key === 'Escape') {
                            setShowDropdown(false)
                            inputRef.current?.blur()
                        }
                    }}
                    placeholder="Search Google or type a URL"
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                />
            </div>

            {showDropdown &&
                (inputValue.trim().length > 0 || suggestions.length > 0) && (
                    <div className={style.dropdown} ref={dropdownRef}>
                        {inputValue.trim().length > 0 && (
                            <button
                                className={`${style['dropdown-item']} ${
                                    selectedIndex === 0 ? style.selected : ''
                                }`}
                                key="google-search"
                                onClick={() => {
                                    if (currentTab) {
                                        handleSubmit(inputValue, currentTab)
                                        setShowDropdown(false)
                                    }
                                }}
                                onMouseEnter={() => setSelectedIndex(0)}
                                type="button">
                                <div className={style['dropdown-item-icon']}>
                                    <svg
                                        aria-hidden="true"
                                        fill="currentColor"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        width="16">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                    </svg>
                                </div>
                                <div className={style['dropdown-item-content']}>
                                    <div
                                        className={
                                            style['dropdown-item-title']
                                        }>
                                        Search Google for "{inputValue}"
                                    </div>
                                </div>
                            </button>
                        )}
                        {suggestions.map((item, index) => {
                            const actualIndex =
                                inputValue.trim().length > 0 ? index + 1 : index
                            return (
                                <button
                                    className={`${style['dropdown-item']} ${
                                        actualIndex === selectedIndex
                                            ? style.selected
                                            : ''
                                    }`}
                                    key={`${item.url}-${item.lastVisitTime}`}
                                    onClick={() => {
                                        if (currentTab && item.url) {
                                            handleSubmit(item.url, currentTab)
                                            setInputValue(cleanUrl(item.url))
                                            setShowDropdown(false)
                                        }
                                    }}
                                    onMouseEnter={() =>
                                        setSelectedIndex(actualIndex)
                                    }
                                    title={item.title ?? item.url ?? ''}
                                    type="button">
                                    <div
                                        className={style['dropdown-item-icon']}>
                                        {item.url ? (
                                            <img
                                                alt=""
                                                onError={e => {
                                                    const target =
                                                        e.target as HTMLImageElement
                                                    target.style.display =
                                                        'none'
                                                    const svg =
                                                        target.nextElementSibling as HTMLElement
                                                    if (svg)
                                                        svg.style.display =
                                                            'block'
                                                }}
                                                src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`}
                                                style={{
                                                    borderRadius: '2px',
                                                    height: '16px',
                                                    width: '16px',
                                                }}
                                            />
                                        ) : (
                                            <svg
                                                aria-hidden="true"
                                                fill="none"
                                                height="14"
                                                style={{ display: 'none' }}
                                                viewBox="0 0 16 16"
                                                width="14">
                                                <path
                                                    d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div
                                        className={
                                            style['dropdown-item-content']
                                        }>
                                        <div
                                            className={
                                                style['dropdown-item-title']
                                            }>
                                            {item.title || item.url}
                                        </div>
                                        <div
                                            className={
                                                style['dropdown-item-url']
                                            }>
                                            {item.url}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}
        </div>
    )
}

function cleanUrl(url: string): string {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
}

const URL_REGEX =
    /^((https?|chrome?|chrome-extensions):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$|^chrome:\/\/[\w-]+/

function isValidUrl(href: string): boolean {
    return URL_REGEX.test(href)
}

function handleSubmit(url: string, tab: chrome.tabs.Tab) {
    let formattedUrl = url.trim()

    if (!isValidUrl(formattedUrl)) {
        formattedUrl = `https://google.com/search?q=${encodeURIComponent(formattedUrl)}`
    }

    if (
        !formattedUrl.startsWith('http') &&
        !formattedUrl.startsWith('chrome')
    ) {
        formattedUrl = `https://${formattedUrl}`
    }

    chrome.tabs.update(tab.id as number, { url: formattedUrl })
}
