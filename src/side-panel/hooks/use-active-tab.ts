import { useEffect, useState } from 'react'

export default function useActiveTab() {
    const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>()

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const [tab] = tabs
            setActiveTab(tab)
        })

        const handleTabActivated = ({ tabId }: chrome.tabs.OnActivatedInfo) => {
            chrome.tabs.get(tabId, tab => {
                setActiveTab(tab)
            })
        }

        const handleTabUpdated = (
            _tabId: number,
            _changeInfo: chrome.tabs.OnUpdatedInfo,
            tab: chrome.tabs.Tab,
        ) => {
            if (tab.active) {
                setActiveTab(tab)
            }
        }

        chrome.tabs.onActivated.addListener(handleTabActivated)
        chrome.tabs.onUpdated.addListener(handleTabUpdated)

        return () => {
            chrome.tabs.onActivated.removeListener(handleTabActivated)
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
        }
    }, [])

    return activeTab
}
