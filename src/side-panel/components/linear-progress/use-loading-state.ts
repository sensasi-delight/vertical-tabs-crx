import { useEffect, useRef, useState } from 'react'
import useActiveTab from '@/side-panel/hooks/use-active-tab'

export function useLoadingState() {
    const activateTab = useActiveTab()
    const [isLoading, setIsLoading] = useState(false)
    const isInitRef = useRef(false)
    const activeTabRef = useRef(activateTab)

    useEffect(() => {
        activeTabRef.current = activateTab
    }, [activateTab])

    useEffect(() => {
        if (isInitRef.current) return
        isInitRef.current = true

        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (tabId !== activeTabRef.current?.id) return

            if (changeInfo.status === 'loading') {
                setIsLoading(true)
            } else if (changeInfo.status === 'complete') {
                setIsLoading(false)
            }
        })
    }, [])

    useEffect(() => {
        if (!activateTab?.id) {
            setIsLoading(false)
            return
        }

        if (activateTab.id === undefined) {
            setIsLoading(false)
            return
        }
    }, [activateTab])

    return isLoading
}
