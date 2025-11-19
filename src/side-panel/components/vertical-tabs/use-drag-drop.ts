import { type DragEvent, useState } from 'react'
import type { TabId } from './types'

export interface UseDragDropReturn {
    draggedTabId: TabId
    dragOverTabId: TabId
    handleDragStart: (
        tabId: TabId,
    ) => (event: DragEvent<HTMLDivElement>) => void
    handleDragOver: (tabId: TabId) => (event: DragEvent<HTMLDivElement>) => void
    handleDragEnd: () => void
    handleDrop: (
        targetTabId: TabId,
    ) => (event: DragEvent<HTMLDivElement>) => void
}

export function useDragDrop(tabs: chrome.tabs.Tab[]): UseDragDropReturn {
    const [draggedTabId, setDraggedTabId] = useState<TabId>(undefined)
    const [dragOverTabId, setDragOverTabId] = useState<TabId>(undefined)

    const handleDragStart =
        (tabId: TabId) => (event: DragEvent<HTMLDivElement>) => {
            chrome.tabs.update(tabId as number, { active: true })
            setDraggedTabId(tabId)
            event.dataTransfer.effectAllowed = 'move'
            event.dataTransfer.setData('text/plain', String(tabId))
        }

    const handleDragOver =
        (tabId: TabId) => (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            event.dataTransfer.dropEffect = 'move'

            if (draggedTabId !== tabId) {
                setDragOverTabId(tabId)
            }
        }

    const handleDragEnd = () => {
        setDraggedTabId(undefined)
        setDragOverTabId(undefined)
    }

    const handleDrop =
        (targetTabId: TabId) => (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault()

            if (draggedTabId === undefined || targetTabId === undefined) return
            if (draggedTabId === targetTabId) return

            const draggedTab = tabs.find(tab => tab.id === draggedTabId)
            const targetTab = tabs.find(tab => tab.id === targetTabId)

            if (!draggedTab || !targetTab) return

            const targetIndex = targetTab.index

            chrome.tabs.move(
                draggedTabId as number,
                { index: targetIndex },
                () => {
                    setDraggedTabId(undefined)
                    setDragOverTabId(undefined)
                },
            )
        }

    return {
        draggedTabId,
        dragOverTabId,
        handleDragEnd,
        handleDragOver,
        handleDragStart,
        handleDrop,
    }
}
