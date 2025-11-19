export interface TabItemProps {
    tab: chrome.tabs.Tab
    isActive: boolean
}

export interface TabCloseButtonProps {
    tabId: chrome.tabs.Tab['id']
}

export type TabId = chrome.tabs.Tab['id']
