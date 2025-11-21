import style from './dropdown-item.module.css'
import { FaviconImage } from './favicon-image'

export function HistoryItem({
    item,
    isSelected,
    onClick,
    onDelete,
    onMouseEnter,
}: {
    item: chrome.history.HistoryItem
    isSelected: boolean
    onClick: () => void
    onDelete: () => void
    onMouseEnter: () => void
}) {
    return (
        <div
            className={`${style.item} ${isSelected ? style.selected : ''}`}
            onClick={onClick}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    onClick()
                }
            }}
            onMouseEnter={onMouseEnter}
            role="button"
            tabIndex={0}
            title={item.title ?? item.url ?? ''}>
            <div className={style.icon}>
                {item.url && <FaviconImage url={item.url} />}
            </div>
            <div className={style.content}>
                <div className={style.title}>{item.title || item.url}</div>
                <div className={style.url}>{item.url}</div>
            </div>
            <button
                className={style.deleteButton}
                onClick={e => {
                    e.stopPropagation()
                    onDelete()
                }}
                title="Remove from history"
                type="button">
                <svg
                    fill="none"
                    height="12"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="12">
                    <title>Delete</title>
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}
