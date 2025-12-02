import { useEffect } from 'react'
import { useSetActiveTab } from './atoms/active-tab'
import { useSetTabs } from './atoms/tabs'

export function useRegisterListener() {
    const setTabs = useSetTabs()
    const setActiveTab = useSetActiveTab()

    // 🔌 CONNECT TO SERVICE WORKER
    useEffect(() => {
        // Create persistent connection to service worker
        // This allows service worker to detect when side panel is closed
        const port = chrome.runtime.connect({ name: 'side-panel' })

        port.onMessage.addListener((message: { type: 'CLOSE_SIDE_PANEL' }) => {
            if (message.type === 'CLOSE_SIDE_PANEL') {
                window.close()
            }
        })

        return () => {
            port.disconnect()
        }
    }, [])

    // 🕛 SET INITIAL DATA
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
    }, [setTabs, setActiveTab])

    // 🆕 ON TAB CREATED
    useEffect(() => {
        const handleTabCreated = (tab: chrome.tabs.Tab) => {
            setTabs(prevTabs =>
                [...prevTabs, tab].sort((a, b) => a.index - b.index),
            )
        }

        chrome.tabs.onCreated.addListener(handleTabCreated)

        return () => {
            chrome.tabs.onCreated.removeListener(handleTabCreated)
        }
    }, [setTabs])

    // ✏️ ON TAB UPDATED
    useEffect(() => {
        const handleTabUpdated = (
            tabId: chrome.tabs.Tab['id'],
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

        chrome.tabs.onUpdated.addListener(handleTabUpdated)

        return () => {
            chrome.tabs.onUpdated.removeListener(handleTabUpdated)
        }
    }, [setTabs, setActiveTab])

    // 🗑️ ON TAB REMOVED
    useEffect(() => {
        const handleTabRemoved = (tabId: chrome.tabs.Tab['id']) => {
            setTabs(prevTabs => prevTabs.filter(tab => tab.id !== tabId))
        }

        chrome.tabs.onRemoved.addListener(handleTabRemoved)

        return () => {
            chrome.tabs.onRemoved.removeListener(handleTabRemoved)
        }
    }, [setTabs])

    // 📌 ON TAB ACTIVATED
    useEffect(() => {
        const handleTabActivated = ({ tabId }: chrome.tabs.OnActivatedInfo) => {
            chrome.tabs.get(tabId, tab => {
                setActiveTab(tab)
            })
        }

        chrome.tabs.onActivated.addListener(handleTabActivated)

        return () => {
            chrome.tabs.onActivated.removeListener(handleTabActivated)
        }
    }, [setActiveTab])

    // 🚚 ON TAB MOVED
    useEffect(() => {
        const handleTabMoved = () => {
            chrome.tabs.query({}, fetchedTabs => {
                setTabs(fetchedTabs.sort((a, b) => a.index - b.index))
            })
        }

        chrome.tabs.onMoved.addListener(handleTabMoved)

        return () => {
            chrome.tabs.onMoved.removeListener(handleTabMoved)
        }
    }, [setTabs])
}
