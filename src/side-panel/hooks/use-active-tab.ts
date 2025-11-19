import { useEffect, useRef, useState } from 'react'

export default function useActiveTab() {
    const [activeTab, setActiveTab] = useState<chrome.tabs.Tab>()
    const isInitRef = useRef(false)

    useEffect(() => {
        if (isInitRef.current) return
        isInitRef.current = true

        const handleTabActivated = ({ tabId }: chrome.tabs.OnActivatedInfo) => {
            chrome.tabs.get(tabId, tab => {
                setActiveTab(tab)
            })
        }

        chrome.tabs.onActivated.addListener(handleTabActivated)

        return () => {
            // IDK why but listener is removed automatically when this line is uncommented
            // chrome.tabs.onActivated.removeListener(handleTabActivated)
        }
    }, [])

    return activeTab
}
