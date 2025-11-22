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

export default function App() {
    useRegisterListener()

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
                <RandomTip />
                <SettingsButton />
            </div>

            <Footer />
        </div>
    )
}
