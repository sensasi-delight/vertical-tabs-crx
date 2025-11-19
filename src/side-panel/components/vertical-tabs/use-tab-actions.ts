import { useCallback } from 'react'
import type { TabId } from './types'

export function useTabActions() {
    const activateTab = useCallback((tabId: TabId) => {
        if (tabId === undefined) return

        chrome.tabs.update(tabId, { active: true })
    }, [])

    const closeTab = useCallback((tabId: TabId) => {
        if (tabId === undefined) return

        chrome.tabs.remove(tabId)
    }, [])

    return { activateTab, closeTab }
}
