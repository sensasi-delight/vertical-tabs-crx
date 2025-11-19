import { useEffect, useState } from 'react'

export default function useTabs() {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([])

    useEffect(() => {
        chrome.tabs.query({}, fetchedTabs => {
            setTabs(fetchedTabs.sort((a, b) => a.index - b.index))
        })

        const handleTabCreated = (tab: chrome.tabs.Tab) => {
            setTabs(prevTabs =>
                [...prevTabs, tab].sort((a, b) => a.index - b.index),
            )
        }

        chrome.tabs.onCreated.addListener(handleTabCreated)

        const handleTabRemoved = (tabId: number) => {
            setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId))
        }

        chrome.tabs.onRemoved.addListener(handleTabRemoved)

        const handleTabUpdated = (
            tabId: number,
            _: chrome.tabs.OnUpdatedInfo,
            tab: chrome.tabs.Tab,
        ) => {
            setTabs(prevTabs =>
                prevTabs.map(prevTab =>
                    prevTab.id === tabId ? { ...prevTab, ...tab } : prevTab,
                ),
            )
        }

        chrome.tabs.onUpdated.addListener(handleTabUpdated)

        const handleTabMoved = () => {
            chrome.tabs.query({}, fetchedTabs => {
                setTabs(fetchedTabs.sort((a, b) => a.index - b.index))
            })
        }

        chrome.tabs.onMoved.addListener(handleTabMoved)

        return () => {
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
            chrome.tabs.onCreated.removeListener(handleTabCreated)
            chrome.tabs.onRemoved.removeListener(handleTabRemoved)
            chrome.tabs.onMoved.removeListener(handleTabMoved)
        }
    }, [])

    return tabs
}
