import { useEffect, useState } from 'react'
import useActiveTab from '@/side-panel/hooks/use-active-tab'
import type { UseTabStateReturn } from './types'
import { cleanUrl } from './utils'

export function useTabState(): UseTabStateReturn {
    const activeTab = useActiveTab()
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (activeTab) {
            setInputValue(cleanUrl(activeTab.url || ''))
        }
    }, [activeTab])

    return { activeTab, inputValue, setInputValue }
}
