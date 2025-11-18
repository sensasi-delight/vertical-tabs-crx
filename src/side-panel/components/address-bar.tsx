import { useEffect, useRef, useState } from 'react'
import style from './address-bar.module.css'

export default function AddressBar() {
    const [inputValue, setInputValue] = useState('')
    const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>()
    const isInitRef = useRef(false)

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
            })
        })

        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (tabId === currentTab?.id && changeInfo.url) {
                setCurrentTab(tab)

                setInputValue(cleanUrl(changeInfo.url))
            }
        })

        return () => {
            chrome.tabs.onActivated.removeListener(() => {})
            chrome.tabs.onUpdated.removeListener(() => {})
        }
    }, [currentTab])

    return (
        <div className={style['address-bar']}>
            <div className={style['address-bar-icon']}>
                <svg
                    aria-hidden="true"
                    fill="none"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16">
                    <path
                        d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                        fill="currentColor"
                    />
                    <path
                        d="M8 4c-2.21 0-4 1.79-4 4s1.79 4 4 4c.74 0 1.43-.2 2.03-.55l2.76 2.76c.2.2.51.2.71 0 .2-.2.2-.51 0-.71l-2.76-2.76C11.8 9.43 12 8.74 12 8c0-2.21-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <input
                className={style['address-bar-input']}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && currentTab) {
                        handleSubmit(inputValue, currentTab)
                    }
                }}
                type="text"
                value={inputValue}
            />
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
        !formattedUrl.startsWith('http') ||
        !formattedUrl.startsWith('chrome')
    ) {
        formattedUrl = `https://${formattedUrl}`
    }

    chrome.tabs.update(tab.id as number, { url: formattedUrl })
}
