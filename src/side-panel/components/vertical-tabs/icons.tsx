import { ICON_SIZES } from './constants'
import style from './index.module.css'

export function PlaceholderIcon() {
    return (
        <div className={style['tab-favicon-placeholder']}>
            <svg
                aria-hidden="true"
                fill="none"
                height={ICON_SIZES.FAVICON}
                viewBox="0 0 16 16"
                width={ICON_SIZES.FAVICON}>
                <circle cx="8" cy="8" r="7" stroke="#444" strokeWidth="1.5" />
            </svg>
        </div>
    )
}

export function CloseIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            height={ICON_SIZES.CLOSE_BUTTON}
            viewBox="0 0 12 12"
            width={ICON_SIZES.CLOSE_BUTTON}>
            <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            />
        </svg>
    )
}

export function PlusIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            height={ICON_SIZES.NEW_TAB_BUTTON}
            viewBox="0 0 16 16"
            width={ICON_SIZES.NEW_TAB_BUTTON}>
            <path
                d="M8 2V14M2 8H14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            />
        </svg>
    )
}
