import style from './index.module.css'

export default function NewTabButton() {
    const createNewTab = () => {
        chrome.tabs.create({ active: true })
    }

    return (
        <button
            aria-label="New tab"
            className={style['new-tab-button']}
            onClick={createNewTab}
            type="button">
            <PlusIcon />
            <span>New Tab</span>
        </button>
    )
}

function PlusIcon() {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            height={16}
            viewBox="0 0 16 16"
            width={16}>
            <path
                d="M8 2V14M2 8H14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            />
        </svg>
    )
}
