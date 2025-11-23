import { Activity, useEffect, useState } from 'react'
import style from './app.module.css'
import AddressBar from './components/address-bar'
import Footer from './components/footer'
import LinearProgress from './components/linear-progress'
import NewTabButton from './components/new-tab-button'
import RandomTip from './components/random-tip'
import RefreshButton from './components/refresh-button'
import SettingsButton from './components/settings-button'
import VerticalTabs from './components/vertical-tabs'

import { useRegisterListener } from './use-register-listener'

const STORAGE_KEY_SHOW_TIPS = 'showRandomTips'

export default function App() {
    useRegisterListener()
    const [showRandomTips, setShowRandomTips] = useState(true)

    useEffect(() => {
        // Load saved setting
        chrome.storage.sync.get([STORAGE_KEY_SHOW_TIPS], result => {
            const showTipsValue = result[STORAGE_KEY_SHOW_TIPS]
            if (typeof showTipsValue === 'boolean') {
                setShowRandomTips(showTipsValue)
            }
        })

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
        }

        chrome.storage.onChanged.addListener(handleStorageChange)
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange)
        }
    }, [])

    return (
        <div className={style.container}>
            <div className={style['top-bar-container']}>
                <RefreshButton />
                <AddressBar />
                <LinearProgress />
            </div>

            <VerticalTabs />

            <NewTabButton />

            <div className={style['middle-container']}>
                <Activity mode={showRandomTips ? 'visible' : 'hidden'}>
                    <RandomTip />
                </Activity>
                <SettingsButton />
            </div>

            <Footer />
        </div>
    )
}
