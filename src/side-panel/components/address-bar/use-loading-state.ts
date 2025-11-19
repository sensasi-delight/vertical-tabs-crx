import { useEffect, useRef, useState } from 'react'

export function useLoadingState(activeTabId: number | undefined) {
    const [isLoading, setIsLoading] = useState(false)
    const isInitRef = useRef(false)
    const activeTabIdRef = useRef(activeTabId)

    useEffect(() => {
        activeTabIdRef.current = activeTabId
    }, [activeTabId])

    useEffect(() => {
        if (isInitRef.current) return
        isInitRef.current = true

        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (tabId !== activeTabIdRef.current) return

            if (changeInfo.status === 'loading') {
                setIsLoading(true)
            } else if (changeInfo.status === 'complete') {
                setIsLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        if (!activeTabId) {
            setIsLoading(false)
            return
        }

        chrome.tabs.get(activeTabId, tab => {
            setIsLoading(tab.status === 'loading')
        })
    }, [activeTabId])

    return isLoading
}
