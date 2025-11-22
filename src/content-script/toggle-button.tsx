import style from './toggle-button.module.css'

export function ToggleButton() {
    const handleClick = () => {
        chrome.runtime.sendMessage({ type: 'TOGGLE_SIDE_PANEL_FROM_CONTENT' })
    }

    return (
        <button
            className={style.button}
            onClick={handleClick}
            title="Toggle Vertical Tabs (Alt+X)"
            type="button">
            🧭
        </button>
    )
}
