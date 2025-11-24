import { Activity, useEffect, useState } from 'react'
import style from './app.module.css'

const STORAGE_KEY_SHOW = 'showToggleButton'
const STORAGE_KEY_OPACITY = 'toggleButtonOpacity'
const STORAGE_KEY_SHOW_TIPS = 'showRandomTips'

export function App() {
    const [showToggleButton, setShowToggleButton] = useState(true)
    const [opacity, setOpacity] = useState(0.5)
    const [showRandomTips, setShowRandomTips] = useState(true)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        // Load saved settings
        chrome.storage.sync.get(
            [STORAGE_KEY_SHOW, STORAGE_KEY_OPACITY, STORAGE_KEY_SHOW_TIPS],
            result => {
                const showValue = result[STORAGE_KEY_SHOW]
                if (typeof showValue === 'boolean') {
                    setShowToggleButton(showValue)
                }

                const opacityValue = result[STORAGE_KEY_OPACITY]
                if (typeof opacityValue === 'number') {
                    setOpacity(opacityValue)
                }

                const showTipsValue = result[STORAGE_KEY_SHOW_TIPS]
                if (typeof showTipsValue === 'boolean') {
                    setShowRandomTips(showTipsValue)
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

    const handleTipsToggle = (checked: boolean) => {
        setShowRandomTips(checked)
        chrome.storage.sync.set({ [STORAGE_KEY_SHOW_TIPS]: checked }, () => {
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
                    <div className={style.settingInfo}>
                        <h2 className={style.settingTitle}>
                            Show/Hide Components
                        </h2>

                        <p className={style.settingDescription}>
                            Toggle the visibility of various UI components in
                            the extension
                        </p>
                    </div>

                    <div className={style.switchGroup}>
                        <div className={style.switchRow}>
                            <label className={style.switch}>
                                <input
                                    checked={showToggleButton}
                                    onChange={e =>
                                        handleToggle(e.target.checked)
                                    }
                                    type="checkbox"
                                />
                                <span className={style.slider} />
                            </label>
                            <span className={style.switchLabel}>
                                On Page Toggle Button
                            </span>
                        </div>

                        <div className={style.switchRow}>
                            <label className={style.switch}>
                                <input
                                    checked={showRandomTips}
                                    onChange={e =>
                                        handleTipsToggle(e.target.checked)
                                    }
                                    type="checkbox"
                                />
                                <span className={style.slider} />
                            </label>
                            <span className={style.switchLabel}>
                                Random Tips
                            </span>
                        </div>
                    </div>

                    <Activity mode={showToggleButton ? 'visible' : 'hidden'}>
                        <div
                            className={`${style.setting} ${style.settingWithSlider}`}>
                            <div className={style.settingInfo}>
                                <h2 className={style.settingTitle}>
                                    On Page Toggle Button Opacity
                                </h2>
                                <p className={style.settingDescription}>
                                    Adjust the transparency of the toggle button
                                    (when not hovered)
                                </p>
                            </div>
                            <div className={style.sliderContainer}>
                                <input
                                    className={style.rangeSlider}
                                    max="1"
                                    min="0"
                                    onChange={e =>
                                        handleOpacityChange(
                                            Number(e.target.value),
                                        )
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
                    </Activity>
                </div>

                <Activity mode={saved ? 'visible' : 'hidden'}>
                    <div className={style.savedMessage}>
                        ✓ Settings saved successfully
                    </div>
                </Activity>
            </div>

            <div className={style.footer}>
                <p className={style.supportText}>
                    Enjoying Vertical Tabs?{' '}
                    <a
                        className={style.supportLink}
                        href="https://github.com/sponsors/sensasi-delight"
                        rel="noopener noreferrer"
                        target="_blank">
                        Support us on GitHub Sponsors 💖
                    </a>
                </p>
                <p className={style.footerText}>
                    You can also use <kbd>Alt+X</kbd> to toggle the side panel
                </p>
                <button
                    className={style.shortcutLink}
                    onClick={() =>
                        chrome.tabs.create({
                            url: 'chrome://extensions/shortcuts',
                        })
                    }
                    type="button">
                    Configure Keyboard Shortcuts
                </button>
            </div>
        </div>
    )
}
