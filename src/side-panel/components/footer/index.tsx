import pkg from '@/../package.json'
import style from './index.module.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={style.footer}>
            <div className={style.content}>
                <span className={style.text}>
                    Vertical Tabs © {currentYear}
                </span>
                <span className={style.separator}>by</span>
                <a
                    className={style.link}
                    href={pkg.author.url}
                    rel="noopener noreferrer"
                    target="_blank">
                    {pkg.author.name}
                </a>
            </div>
        </footer>
    )
}
