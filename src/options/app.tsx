import { useEffect, useState } from 'react'
import style from './app.module.css'

const STORAGE_KEY_SHOW = 'showToggleButton'
const STORAGE_KEY_OPACITY = 'toggleButtonOpacity'

export function App() {
    const [showToggleButton, setShowToggleButton] = useState(true)
    const [opacity, setOpacity] = useState(0.5)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        // Load saved settings
        chrome.storage.sync.get(
            [STORAGE_KEY_SHOW, STORAGE_KEY_OPACITY],
            result => {
                const showValue = result[STORAGE_KEY_SHOW]
                if (typeof showValue === 'boolean') {
                    setShowToggleButton(showValue)
                }

                const opacityValue = result[STORAGE_KEY_OPACITY]
                if (typeof opacityValue === 'number') {
                    setOpacity(opacityValue)
                }
            },
        )
    }, [])

    const handleToggle = (checked: boolean) => {
        setShowToggleButton(checked)
        chrome.storage.sync.set({ [STORAGE_KEY_SHOW]: checked }, () => {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        })
    }

    const handleOpacityChange = (value: number) => {
        setOpacity(value)
        chrome.storage.sync.set({ [STORAGE_KEY_OPACITY]: value }, () => {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        })
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.title}>⚙️ Vertical Tabs Settings</h1>
                <p className={style.subtitle}>
                    Customize your vertical tabs experience
                </p>
            </div>

            <div className={style.content}>
                <div className={style.section}>
                    <div className={style.setting}>
                        <div className={style.settingInfo}>
                            <h2 className={style.settingTitle}>
                                Show Toggle Button
                            </h2>
                            <p className={style.settingDescription}>
                                Display a floating button on web pages to toggle
                                the side panel
                            </p>
                        </div>
                        <label className={style.switch}>
                            <input
                                checked={showToggleButton}
                                onChange={e => handleToggle(e.target.checked)}
                                type="checkbox"
                            />
                            <span className={style.slider} />
                        </label>
                    </div>

                    <div
                        className={`${style.setting} ${style.settingWithSlider}`}>
                        <div className={style.settingInfo}>
                            <h2 className={style.settingTitle}>
                                Button Opacity
                            </h2>
                            <p className={style.settingDescription}>
                                Adjust the transparency of the toggle button
                                (when not hovered)
                            </p>
                        </div>
                        <div className={style.sliderContainer}>
                            <input
                                className={style.rangeSlider}
                                disabled={!showToggleButton}
                                max="1"
                                min="0"
                                onChange={e =>
                                    handleOpacityChange(Number(e.target.value))
                                }
                                step="0.01"
                                type="range"
                                value={opacity}
                            />
                            <span className={style.opacityValue}>
                                {Math.round(opacity * 100)}%
                            </span>
                        </div>
                    </div>
                </div>

                {saved && (
                    <div className={style.savedMessage}>
                        ✓ Settings saved successfully
                    </div>
                )}
            </div>

            <div className={style.footer}>
                <p className={style.footerText}>
                    You can also use <kbd>Alt+X</kbd> to toggle the side panel
                </p>
            </div>
        </div>
    )
}
