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

        chrome.tabs.onActivated.addListener(handleTabActivated)

        return () => {
            chrome.tabs.onActivated.removeListener(handleTabActivated)
        }
    }, [])

    return activeTab
}
