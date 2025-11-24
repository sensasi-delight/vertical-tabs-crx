import pkg from '@/../package.json'
import { REPORT_ISSUE_URL } from '@/options/constants'
import style from './index.module.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className={style.footer}>
            <div className={style.content}>
                <span className={style.text}>
                    <a
                        className={style.link}
                        href={pkg.homepage}
                        rel="noopener noreferrer"
                        target="_blank">
                        Vertical Tabs
                    </a>{' '}
                    © {currentYear}
                </span>

                <span className={style.separator}>•</span>

                <a
                    className={style.link}
                    href={pkg.author.url}
                    rel="noopener noreferrer"
                    target="_blank">
                    {pkg.author.name}
                </a>

                <span className={style.separator}>•</span>

                <a
                    className={style.feedbackLink}
                    href={REPORT_ISSUE_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Report bugs or send feedback">
                    📝 Feedback
                </a>
            </div>
        </footer>
    )
}
