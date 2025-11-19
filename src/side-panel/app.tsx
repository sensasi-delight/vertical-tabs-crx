import style from './app.module.css'
import AddressBar from './components/address-bar'
import Footer from './components/footer'
import VerticalTabs from './components/vertical-tabs'

export default function App() {
    return (
        <div className={style.container}>
            <AddressBar />
            <VerticalTabs />
            <Footer />
        </div>
    )
}
