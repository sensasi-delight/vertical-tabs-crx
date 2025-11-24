import { useState } from 'react'
import { useActiveTab } from '@/side-panel/atoms/active-tab'

export type UseForwardNavigationReturn = {
    canGoForward: boolean
    goForward: () => void
}

export function useForwardNavigation(): UseForwardNavigationReturn {
    const activeTab = useActiveTab()
    const [canGoForward] = useState(true)

    const goForward = () => {
        if (!activeTab?.id) return

        chrome.tabs.goForward(activeTab.id).catch(() => {
            // Silently handle error if goForward fails (e.g., no forward history available)
        })
    }

    return { canGoForward, goForward }
}
