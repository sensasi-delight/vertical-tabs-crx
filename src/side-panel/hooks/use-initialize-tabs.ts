import { useEffect } from 'react'
import { useSetActiveTab } from '../atoms/active-tab'
import { useSetTabs } from '../atoms/tabs'

export function useInitializeTabs() {
    const setTabs = useSetTabs()
    const setActiveTab = useSetActiveTab()

    useEffect(() => {
        // Initialize tabs
        chrome.tabs.query({}, fetchedTabs => {
            setTabs(fetchedTabs.sort((a, b) => a.index - b.index))
        })

        // Initialize active tab
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const [tab] = tabs
            setActiveTab(tab)
        })

        const handleTabCreated = (tab: chrome.tabs.Tab) => {
            setTabs(prevTabs =>
                [...prevTabs, tab].sort((a, b) => a.index - b.index),
            )
        }

        const handleTabRemoved = (tabId: number) => {
            setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId))
        }

        const handleTabUpdated = (
            tabId: number,
            _changeInfo: chrome.tabs.OnUpdatedInfo,
            tab: chrome.tabs.Tab,
        ) => {
            setTabs(prevTabs =>
                prevTabs.map(prevTab =>
                    prevTab.id === tabId ? { ...prevTab, ...tab } : prevTab,
                ),
            )

            if (tab.active) {
                setActiveTab(tab)
            }
        }

        const handleTabMoved = () => {
            chrome.tabs.query({}, fetchedTabs => {
                setTabs(fetchedTabs.sort((a, b) => a.index - b.index))
            })
        }

        const handleTabActivated = ({ tabId }: chrome.tabs.OnActivatedInfo) => {
            chrome.tabs.get(tabId, tab => {
                setActiveTab(tab)
            })
        }

        chrome.tabs.onCreated.addListener(handleTabCreated)
        chrome.tabs.onRemoved.addListener(handleTabRemoved)
        chrome.tabs.onUpdated.addListener(handleTabUpdated)
        chrome.tabs.onMoved.addListener(handleTabMoved)
        chrome.tabs.onActivated.addListener(handleTabActivated)

        return () => {
            chrome.tabs.onCreated.removeListener(handleTabCreated)
            chrome.tabs.onRemoved.removeListener(handleTabRemoved)
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
            chrome.tabs.onMoved.removeListener(handleTabMoved)
            chrome.tabs.onActivated.removeListener(handleTabActivated)
        }
    }, [setTabs, setActiveTab])
}
