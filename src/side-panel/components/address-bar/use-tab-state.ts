import { useEffect, useRef, useState } from 'react'
import type { UseTabStateReturn } from './types'
import { cleanUrl } from './utils'

export function useTabState(): UseTabStateReturn {
    const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>()
    const [inputValue, setInputValue] = useState('')
    const isInitRef = useRef(false)

    useEffect(() => {
        if (isInitRef.current) return
        isInitRef.current = true

        // Initialize with active tab
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const activeTab = tabs[0]
            if (activeTab) {
                setCurrentTab(activeTab)
                setInputValue(cleanUrl(activeTab.url ?? ''))
            }
        })

        // Listen for tab activation
        const handleTabActivated = (activeInfo: { tabId: number }) => {
            chrome.tabs.get(activeInfo.tabId, tab => {
                setCurrentTab(tab)
                setInputValue(cleanUrl(tab.url ?? ''))
            })
        }

        // Listen for tab updates
        const handleTabUpdated = (
            tabId: number,
            changeInfo: { url?: string },
            tab: chrome.tabs.Tab,
        ) => {
            if (currentTab?.id === tabId && changeInfo.url) {
                setCurrentTab(tab)
                setInputValue(cleanUrl(changeInfo.url))
            }
        }

        chrome.tabs.onActivated.addListener(handleTabActivated)
        chrome.tabs.onUpdated.addListener(handleTabUpdated)

        return () => {
            chrome.tabs.onActivated.removeListener(handleTabActivated)
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
        }
    }, [currentTab])

    return { currentTab, inputValue, setInputValue }
}
