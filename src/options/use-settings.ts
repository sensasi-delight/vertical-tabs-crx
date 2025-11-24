import { useEffect, useState } from 'react'
import {
    STORAGE_KEY_OPACITY,
    STORAGE_KEY_SHOW,
    STORAGE_KEY_SHOW_BACK_BUTTON,
    STORAGE_KEY_SHOW_FORWARD_BUTTON,
    STORAGE_KEY_SHOW_REFRESH_BUTTON,
    STORAGE_KEY_SHOW_TIPS,
} from './constants'

interface Settings {
    showToggleButton: boolean
    opacity: number
    showRandomTips: boolean
    showBackButton: boolean
    showForwardButton: boolean
    showRefreshButton: boolean
}

export function useSettings() {
    const [settings, setSettings] = useState<Settings>({
        opacity: 0.5,
        showBackButton: true,
        showForwardButton: true,
        showRandomTips: true,
        showRefreshButton: true,
        showToggleButton: true,
    })
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        chrome.storage.sync.get(
            [
                STORAGE_KEY_SHOW,
                STORAGE_KEY_OPACITY,
                STORAGE_KEY_SHOW_TIPS,
                STORAGE_KEY_SHOW_BACK_BUTTON,
                STORAGE_KEY_SHOW_FORWARD_BUTTON,
                STORAGE_KEY_SHOW_REFRESH_BUTTON,
            ],
            result => {
                setSettings(prev => ({
                    ...prev,
                    opacity:
                        typeof result[STORAGE_KEY_OPACITY] === 'number'
                            ? result[STORAGE_KEY_OPACITY]
                            : prev.opacity,
                    showBackButton:
                        typeof result[STORAGE_KEY_SHOW_BACK_BUTTON] ===
                        'boolean'
                            ? result[STORAGE_KEY_SHOW_BACK_BUTTON]
                            : prev.showBackButton,
                    showForwardButton:
                        typeof result[STORAGE_KEY_SHOW_FORWARD_BUTTON] ===
                        'boolean'
                            ? result[STORAGE_KEY_SHOW_FORWARD_BUTTON]
                            : prev.showForwardButton,
                    showRandomTips:
                        typeof result[STORAGE_KEY_SHOW_TIPS] === 'boolean'
                            ? result[STORAGE_KEY_SHOW_TIPS]
                            : prev.showRandomTips,
                    showRefreshButton:
                        typeof result[STORAGE_KEY_SHOW_REFRESH_BUTTON] ===
                        'boolean'
                            ? result[STORAGE_KEY_SHOW_REFRESH_BUTTON]
                            : prev.showRefreshButton,
                    showToggleButton:
                        typeof result[STORAGE_KEY_SHOW] === 'boolean'
                            ? result[STORAGE_KEY_SHOW]
                            : prev.showToggleButton,
                }))
            },
        )
    }, [])

    const showSavedMessage = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const updateSetting = (key: string, value: boolean | number) => {
        chrome.storage.sync.set({ [key]: value }, showSavedMessage)
    }

    const handleToggle = (checked: boolean) => {
        setSettings(prev => ({ ...prev, showToggleButton: checked }))
        updateSetting(STORAGE_KEY_SHOW, checked)
    }

    const handleOpacityChange = (value: number) => {
        setSettings(prev => ({ ...prev, opacity: value }))
        updateSetting(STORAGE_KEY_OPACITY, value)
    }

    const handleTipsToggle = (checked: boolean) => {
        setSettings(prev => ({ ...prev, showRandomTips: checked }))
        updateSetting(STORAGE_KEY_SHOW_TIPS, checked)
    }

    const handleBackButtonToggle = (checked: boolean) => {
        setSettings(prev => ({ ...prev, showBackButton: checked }))
        updateSetting(STORAGE_KEY_SHOW_BACK_BUTTON, checked)
    }

    const handleForwardButtonToggle = (checked: boolean) => {
        setSettings(prev => ({ ...prev, showForwardButton: checked }))
        updateSetting(STORAGE_KEY_SHOW_FORWARD_BUTTON, checked)
    }

    const handleRefreshButtonToggle = (checked: boolean) => {
        setSettings(prev => ({ ...prev, showRefreshButton: checked }))
        updateSetting(STORAGE_KEY_SHOW_REFRESH_BUTTON, checked)
    }

    return {
        handleBackButtonToggle,
        handleForwardButtonToggle,
        handleOpacityChange,
        handleRefreshButtonToggle,
        handleTipsToggle,
        handleToggle,
        saved,
        settings,
    }
}
