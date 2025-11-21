import style from './app.module.css'
import AddressBar from './components/address-bar'
import Footer from './components/footer'
import LinearProgress from './components/linear-progress'
import NewTabButton from './components/new-tab-button'
import RefreshButton from './components/refresh-button'
import ShortcutSettingButton from './components/shortcut-setting-button'
import TipsButtonAndDialog from './components/tips-button-and-dialog'
import VerticalTabs from './components/vertical-tabs'

import { useInitializeTabs } from './hooks/use-initialize-tabs'

export default function App() {
    useInitializeTabs()
    return (
        <div className={style.container}>
            <div className={style['top-bar-container']}>
                <RefreshButton />
                <AddressBar />

                <LinearProgress />
            </div>

            <VerticalTabs />
            <NewTabButton />

            <div className={style['bottom-actions']}>
                <TipsButtonAndDialog />
                <ShortcutSettingButton />
            </div>

            <Footer />
        </div>
    )
}
