import style from './index.module.css'

export default function ShortcutsButton() {
    const openShortcuts = () => {
        chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
    }

    return (
        <button
            aria-label="Change keyboard shortcuts"
            className={style.button}
            onClick={openShortcuts}
            type="button">
            <span className={style.icon}>⚙️</span>
            Change Shortcut
        </button>
    )
}
