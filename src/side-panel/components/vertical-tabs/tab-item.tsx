import { useState } from 'react'
import { CloseIcon, PlaceholderIcon } from './icons'
import style from './index.module.css'
import { useTabActions } from './use-tab-actions'

const KEYBOARD_KEYS = {
    ENTER: 'Enter',
    SPACE: ' ',
} as const

export function TabItem({
    tab,
    isActive,
    isDragging,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDrop,
}: {
    tab: chrome.tabs.Tab
    isActive: boolean
    isDragging: boolean
    isDragOver: boolean
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
    onDragEnd: () => void
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void
}) {
    const { activateTab } = useTabActions()

    const handleClick = () => {
        activateTab(tab.id)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const { key } = event
        if (key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE) {
            activateTab(tab.id)
        }
    }

    const tabTitle = tab.title ?? tab.url ?? 'Untitled'
    const tabClassName = `${style['tab-item']} ${isActive ? style.active : ''} ${isDragging ? style.dragging : ''} ${isDragOver ? style['drag-over'] : ''}`

    return (
        <div
            className={tabClassName}
            draggable
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            title={tabTitle}>
            <button
                className={style['tab-button']}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                type="button">
                <div className={style['tab-content']}>
                    <TabFavicon url={tab.favIconUrl} />
                    <span className={style['tab-title']}>{tabTitle}</span>
                </div>
            </button>

            <TabCloseButton tabId={tab.id} />
        </div>
    )
}
function TabFavicon({ url }: { url?: string }) {
    const [hasError, setHasError] = useState(false)

    if (!url || hasError) {
        return <PlaceholderIcon />
    }

    return (
        <img
            alt=""
            className={style['tab-favicon']}
            onError={() => setHasError(true)}
            src={url}
        />
    )
}

function TabCloseButton({ tabId }: { tabId: chrome.tabs.Tab['id'] }) {
    const { closeTab } = useTabActions()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        event.preventDefault()
        closeTab(tabId)
    }

    return (
        <button
            aria-label="Close tab"
            className={style['tab-close']}
            onClick={handleClick}
            type="button">
            <CloseIcon />
        </button>
    )
}
