import style from './index.module.css'

export default function SettingsButton() {
    const openSettings = () => {
        chrome.runtime.openOptionsPage()
    }

    return (
        <button
            aria-label="Open settings"
            className={style.button}
            onClick={openSettings}
            type="button">
            <span className={style.icon}>⚙️</span>
            Settings
        </button>
    )
}
