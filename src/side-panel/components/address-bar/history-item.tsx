import style from './dropdown-item.module.css'
import { FaviconImage } from './favicon-image'

export function HistoryItem({
    item,
    isSelected,
    onClick,
    onMouseEnter,
}: {
    item: chrome.history.HistoryItem
    isSelected: boolean
    onClick: () => void
    onMouseEnter: () => void
}) {
    return (
        <button
            className={`${style.item} ${isSelected ? style.selected : ''}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            title={item.title ?? item.url ?? ''}
            type="button">
            <div className={style.icon}>
                {item.url && <FaviconImage url={item.url} />}
            </div>
            <div className={style.content}>
                <div className={style.title}>{item.title || item.url}</div>
                <div className={style.url}>{item.url}</div>
            </div>
        </button>
    )
}
