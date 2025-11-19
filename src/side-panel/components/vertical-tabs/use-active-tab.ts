import { useEffect, useRef, useState } from 'react'
import type { TabId } from './types'

export function useActiveTab() {
    const [activeTabId, setActiveTabId] = useState<TabId>()
    const isInitRef = useRef(false)

    useEffect(() => {
        if (isInitRef.current) return
        isInitRef.current = true

        const handleTabActivated = ({ tabId }: chrome.tabs.OnActivatedInfo) => {
            setActiveTabId(tabId)
        }

        chrome.tabs.onActivated.addListener(handleTabActivated)

        // Note: No cleanup needed per extension pattern guide
    }, [])

    return activeTabId
}
