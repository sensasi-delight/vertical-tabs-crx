import type { DragEvent } from 'react'

export interface TabItemProps {
    tab: chrome.tabs.Tab
    isActive: boolean
    isDragging: boolean
    isDragOver: boolean
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
    onDragOver: (event: DragEvent<HTMLDivElement>) => void
    onDragEnd: () => void
    onDrop: (event: DragEvent<HTMLDivElement>) => void
}

export interface TabCloseButtonProps {
    tabId: chrome.tabs.Tab['id']
}

export type TabId = chrome.tabs.Tab['id']
