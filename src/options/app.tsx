import { Activity } from 'react'
import style from './app.module.css'
import { REPORT_ISSUE_URL } from './constants'
import { SwitchItem } from './switch-item'
import { useSettings } from './use-settings'

export function App() {
    const {
        settings,
        saved,
        handleToggle,
        handleOpacityChange,
        handleTipsToggle,
        handleBackButtonToggle,
        handleForwardButtonToggle,
        handleRefreshButtonToggle,
    } = useSettings()

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
                        <SwitchItem
                            checked={settings.showToggleButton}
                            label="On Page Toggle Button"
                            onChange={handleToggle}
                        />
                        <SwitchItem
                            checked={settings.showRandomTips}
                            label="Random Tips"
                            onChange={handleTipsToggle}
                        />
                        <SwitchItem
                            checked={settings.showBackButton}
                            label="Back Button"
                            onChange={handleBackButtonToggle}
                        />
                        <SwitchItem
                            checked={settings.showForwardButton}
                            label="Forward Button"
                            onChange={handleForwardButtonToggle}
                        />
                        <SwitchItem
                            checked={settings.showRefreshButton}
                            label="Refresh Button"
                            onChange={handleRefreshButtonToggle}
                        />
                    </div>

                    <Activity
                        mode={settings.showToggleButton ? 'visible' : 'hidden'}>
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
                                    value={settings.opacity}
                                />
                                <span className={style.opacityValue}>
                                    {Math.round(settings.opacity * 100)}%
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
                <div className={style.section}>
                    <div className={style.settingInfo}>
                        <h2 className={style.settingTitle}>Help & Feedback</h2>
                        <p className={style.settingDescription}>
                            Report bugs, request features, or share your
                            experience
                        </p>
                    </div>
                    <a
                        className={style.feedbackLink}
                        href={REPORT_ISSUE_URL}
                        rel="noopener noreferrer"
                        target="_blank">
                        📝 Submit Feedback
                    </a>
                </div>

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
