import { useEffect, useRef, useState } from 'react'
import useActiveTab from '@/side-panel/hooks/use-active-tab'

export function useLoadingState() {
    const activateTab = useActiveTab()
    const [isLoading, setIsLoading] = useState(false)
    const activeTabRef = useRef(activateTab)

    useEffect(() => {
        activeTabRef.current = activateTab

        if (!activateTab?.id) {
            setIsLoading(false)
        }
    }, [activateTab])

    useEffect(() => {
        const handleTabUpdated = (
            tabId: number,
            changeInfo: chrome.tabs.OnUpdatedInfo,
        ) => {
            if (tabId !== activeTabRef.current?.id) return

            if (changeInfo.status === 'loading') {
                setIsLoading(true)
            } else if (changeInfo.status === 'complete') {
                setIsLoading(false)
            }
        }

        chrome.tabs.onUpdated.addListener(handleTabUpdated)

        return () => {
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
        }
    }, [])

    return isLoading
}
