import { useState } from 'react'
import style from './toggle-button.module.css'

interface ToggleButtonProps {
    opacity: number
}

export function ToggleButton({ opacity }: ToggleButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        chrome.runtime.sendMessage({ type: 'TOGGLE_SIDE_PANEL_FROM_CONTENT' })
    }

    return (
        <button
            className={style.button}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: isHovered
                    ? 'rgba(26, 115, 232, 0.9)'
                    : `rgba(32, 33, 36, 0.6)`,
                opacity: isHovered ? 1 : opacity,
            }}
            title="Toggle Vertical Tabs (Alt+X)"
            type="button">
            🧭
        </button>
    )
}
