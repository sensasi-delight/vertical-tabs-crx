import { useEffect, useState } from 'react'
import style from './app.module.css'

const STORAGE_KEY = 'showToggleButton'

export function App() {
    const [showToggleButton, setShowToggleButton] = useState(true)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        // Load saved setting
        chrome.storage.sync.get([STORAGE_KEY], result => {
            const value = result[STORAGE_KEY]
            if (typeof value === 'boolean') {
                setShowToggleButton(value)
            }
        })
    }, [])

    const handleToggle = (checked: boolean) => {
        setShowToggleButton(checked)
        chrome.storage.sync.set({ [STORAGE_KEY]: checked }, () => {
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
