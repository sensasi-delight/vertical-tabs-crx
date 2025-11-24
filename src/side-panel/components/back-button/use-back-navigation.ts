import { useState } from 'react'
import { useActiveTab } from '@/side-panel/atoms/active-tab'

export type UseBackNavigationReturn = {
    canGoBack: boolean
    goBack: () => void
}

export function useBackNavigation(): UseBackNavigationReturn {
    const activeTab = useActiveTab()
    const [canGoBack] = useState(true)

    const goBack = () => {
        if (!activeTab?.id) return

        chrome.tabs.goBack(activeTab.id).catch(() => {
            // Silently handle error if goBack fails (e.g., no history available)
        })
    }

    return { canGoBack, goBack }
}
