import style from './app.module.css'
import AddressBar from './components/address-bar'
import Footer from './components/footer'
import LinearProgress from './components/linear-progress'
import { RefreshButton } from './components/refresh-button'
import VerticalTabs from './components/vertical-tabs'

export default function App() {
    return (
        <div className={style.container}>
            <div className={style['top-bar-container']}>
                <RefreshButton />
                <AddressBar />

                <LinearProgress />
            </div>

            <VerticalTabs />
            <Footer />
        </div>
    )
}
