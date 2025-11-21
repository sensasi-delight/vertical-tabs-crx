import { useEffect, useState } from 'react'
import { useActiveTab } from '@/side-panel/atoms/active-tab'
import { cleanUrl } from './utils'

export function useTabState(): {
    activeTab: chrome.tabs.Tab | undefined
    inputValue: string
    setInputValue: (value: string) => void
} {
    const activeTab = useActiveTab()
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (activeTab) {
            setInputValue(cleanUrl(activeTab.url || ''))
        }
    }, [activeTab])

    return { activeTab, inputValue, setInputValue }
}
