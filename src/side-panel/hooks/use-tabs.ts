import { useEffect, useRef, useState } from 'react'

export default function useTabs() {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])
    const isInitRef = useRef(false)

    useEffect(() => {
        if (isInitRef.current) return

        isInitRef.current = true

        chrome.tabs.query({}, fetchedTabs => {
            setTabs(fetchedTabs)
        })

        chrome.tabs.onCreated.addListener(tab => {
            setTabs(prevTabs => [...prevTabs, tab])
        })

        chrome.tabs.onRemoved.addListener(tabId => {
            setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId))
        })

        chrome.tabs.onUpdated.addListener((tabId, _, tab) => {
            setTabs(prevTabs =>
                prevTabs.map(prevTab =>
                    prevTab.id === tabId ? { ...prevTab, ...tab } : prevTab,
                ),
            )
        })

        return () => {
            chrome.tabs.onUpdated.removeListener(() => {})
            chrome.tabs.onCreated.removeListener(() => {})
            chrome.tabs.onRemoved.removeListener(() => {})
        }
    }, [])

    return [tabs, setTabs] as const
}
