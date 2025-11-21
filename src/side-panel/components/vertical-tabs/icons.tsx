import style from './index.module.css'

export function PlaceholderIcon() {
    return (
        <div className={style['tab-favicon-placeholder']}>
            <svg
                aria-hidden="true"
                fill="none"
                height={16}
                viewBox="0 0 16 16"
                width={16}>
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
            height={12}
            viewBox="0 0 12 12"
            width={12}>
            <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            />
        </svg>
    )
}
