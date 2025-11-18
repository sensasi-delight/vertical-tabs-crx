import { useEffect, useRef, useState } from 'react'
import './vertical-tabs.css'
import useTabs from '../hooks/use-tabs'

export default function VerticalTabs() {
    const [tabs] = useTabs()

    const [activeTabId, setActiveTabId] = useState<chrome.tabs.Tab['id']>()
    const isInitRef = useRef(false)

    useEffect(() => {
        if (isInitRef.current) return

        isInitRef.current = true

        chrome.tabs.onActivated.addListener(({ tabId }) => {
            setActiveTabId(tabId)
        })

        return () => {
            chrome.tabs.onActivated.removeListener(() => {})
        }
    }, [])

    return (
        <div className="vertical-tabs-container">
            <div className="vertical-tabs">
                {tabs.map(tab => (
                    <TabItem
                        active={tab.id === activeTabId}
                        key={tab.id}
                        tab={tab}
                    />
                ))}
            </div>
        </div>
    )
}

function TabItem({ tab, active }: { tab: chrome.tabs.Tab; active: boolean }) {
    const handleTabClick = (tab: chrome.tabs.Tab) => {
        chrome.tabs.update(tab.id as number, { active: true })
    }

    return (
        <div className={`tab-item ${active ? 'active' : ''}`} title={tab.title}>
            <button
                className="tab-button"
                onClick={() => handleTabClick(tab)}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleTabClick(tab)
                    }
                }}
                type="button">
                <div className="tab-content">
                    {tab.favIconUrl ? (
                        <img
                            alt=""
                            className="tab-favicon"
                            onError={e => {
                                ;(e.target as HTMLImageElement).style.display =
                                    'none'
                            }}
                            src={tab.favIconUrl}
                        />
                    ) : (
                        <PlaceholderFavicon />
                    )}
                    <span className="tab-title">
                        {tab.title ?? tab.url ?? 'Untitled'}
                    </span>
                </div>
            </button>

            <TabCloseButton tabId={tab.id} />
        </div>
    )
}

function PlaceholderFavicon() {
    return (
        <div className="tab-favicon-placeholder">
            <svg
                aria-hidden="true"
                fill="none"
                height="16"
                viewBox="0 0 16 16"
                width="16">
                <circle cx="8" cy="8" r="7" stroke="#444" strokeWidth="1.5" />
            </svg>
        </div>
    )
}

function TabCloseButton({ tabId }: { tabId: chrome.tabs.Tab['id'] }) {
    const handleTabClose = (
        e: React.MouseEvent,
        tabId: chrome.tabs.Tab['id'],
    ) => {
        e.stopPropagation()
        e.preventDefault()

        chrome.tabs.remove(tabId as number)
    }

    return (
        <button
            aria-label="Close tab"
            className="tab-close"
            onClick={e => handleTabClose(e, tabId)}
            type="button">
            <svg
                aria-hidden="true"
                fill="none"
                height="12"
                viewBox="0 0 12 12"
                width="12">
                <path
                    d="M1 1L11 11M11 1L1 11"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                />
            </svg>
        </button>
    )
}
