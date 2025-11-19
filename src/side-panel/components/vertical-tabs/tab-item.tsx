import { type KeyboardEvent, type MouseEvent, useState } from 'react'
import { ARIA_LABELS, KEYBOARD_KEYS, TAB_TITLE_FALLBACK } from './constants'
import { CloseIcon, PlaceholderIcon } from './icons'
import style from './index.module.css'
import type { TabCloseButtonProps, TabItemProps } from './types'
import { useTabActions } from './use-tab-actions'

export function TabItem({
    tab,
    isActive,
    isDragging,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDrop,
}: TabItemProps) {
    const { activateTab } = useTabActions()

    const handleClick = () => {
        activateTab(tab.id)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const { key } = event
        if (key === KEYBOARD_KEYS.ENTER || key === KEYBOARD_KEYS.SPACE) {
            activateTab(tab.id)
        }
    }

    const tabTitle = tab.title ?? tab.url ?? TAB_TITLE_FALLBACK
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

function TabCloseButton({ tabId }: TabCloseButtonProps) {
    const { closeTab } = useTabActions()

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        event.preventDefault()
        closeTab(tabId)
    }

    return (
        <button
            aria-label={ARIA_LABELS.CLOSE_TAB}
            className={style['tab-close']}
            onClick={handleClick}
            type="button">
            <CloseIcon />
        </button>
    )
}
