import { Activity, useEffect, useState } from 'react'
import style from './app.module.css'
import AddressBar from './components/address-bar'
import BackButton from './components/back-button'
import Footer from './components/footer'
import ForwardButton from './components/forward-button'
import LinearProgress from './components/linear-progress'
import NewTabButton from './components/new-tab-button'
import RandomTip from './components/random-tip'
import RefreshButton from './components/refresh-button'
import SettingsButton from './components/settings-button'
import VerticalTabs from './components/vertical-tabs'

import { useRegisterListener } from './use-register-listener'

const STORAGE_KEY_SHOW_TIPS = 'showRandomTips'
const STORAGE_KEY_SHOW_BACK_BUTTON = 'showBackButton'
const STORAGE_KEY_SHOW_FORWARD_BUTTON = 'showForwardButton'
const STORAGE_KEY_SHOW_REFRESH_BUTTON = 'showRefreshButton'

export default function App() {
    useRegisterListener()
    const [showRandomTips, setShowRandomTips] = useState(true)
    const [showBackButton, setShowBackButton] = useState(true)
    const [showForwardButton, setShowForwardButton] = useState(true)
    const [showRefreshButton, setShowRefreshButton] = useState(true)

    useEffect(() => {
        // Load saved setting
        chrome.storage.sync.get(
            [
                STORAGE_KEY_SHOW_TIPS,
                STORAGE_KEY_SHOW_BACK_BUTTON,
                STORAGE_KEY_SHOW_FORWARD_BUTTON,
                STORAGE_KEY_SHOW_REFRESH_BUTTON,
            ],
            result => {
                const showTipsValue = result[STORAGE_KEY_SHOW_TIPS]
                if (typeof showTipsValue === 'boolean') {
                    setShowRandomTips(showTipsValue)
                }

                const showBackButtonValue = result[STORAGE_KEY_SHOW_BACK_BUTTON]
                if (typeof showBackButtonValue === 'boolean') {
                    setShowBackButton(showBackButtonValue)
                }

                const showForwardButtonValue =
                    result[STORAGE_KEY_SHOW_FORWARD_BUTTON]
                if (typeof showForwardButtonValue === 'boolean') {
                    setShowForwardButton(showForwardButtonValue)
                }

                const showRefreshButtonValue =
                    result[STORAGE_KEY_SHOW_REFRESH_BUTTON]
                if (typeof showRefreshButtonValue === 'boolean') {
                    setShowRefreshButton(showRefreshButtonValue)
                }
            },
        )

        // Listen for changes
        const handleStorageChange = (
            changes: { [key: string]: chrome.storage.StorageChange },
            areaName: string,
        ) => {
            if (areaName === 'sync' && changes[STORAGE_KEY_SHOW_TIPS]) {
                setShowRandomTips(
                    changes[STORAGE_KEY_SHOW_TIPS].newValue as boolean,
                )
            }

            if (areaName === 'sync' && changes[STORAGE_KEY_SHOW_BACK_BUTTON]) {
                setShowBackButton(
                    changes[STORAGE_KEY_SHOW_BACK_BUTTON].newValue as boolean,
                )
            }

            if (
                areaName === 'sync' &&
                changes[STORAGE_KEY_SHOW_FORWARD_BUTTON]
            ) {
                setShowForwardButton(
                    changes[STORAGE_KEY_SHOW_FORWARD_BUTTON]
                        .newValue as boolean,
                )
            }

            if (
                areaName === 'sync' &&
                changes[STORAGE_KEY_SHOW_REFRESH_BUTTON]
            ) {
                setShowRefreshButton(
                    changes[STORAGE_KEY_SHOW_REFRESH_BUTTON]
                        .newValue as boolean,
                )
            }
        }

        chrome.storage.onChanged.addListener(handleStorageChange)
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange)
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style['top-bar-container']}>
                <Activity mode={showBackButton ? 'visible' : 'hidden'}>
                    <BackButton />
                </Activity>
                <Activity mode={showForwardButton ? 'visible' : 'hidden'}>
                    <ForwardButton />
                </Activity>
                <Activity mode={showRefreshButton ? 'visible' : 'hidden'}>
                    <RefreshButton />
                </Activity>
                <AddressBar />
                <LinearProgress />
            </div>

            <VerticalTabs />

            <NewTabButton />

            <div className={style['footer-container']}>
                <div className={style['pre-footer-container']}>
                    <Activity mode={showRandomTips ? 'visible' : 'hidden'}>
                        <RandomTip />
                    </Activity>

                    <SettingsButton />
                </div>

                <Footer />
            </div>
        </div>
    )
}
