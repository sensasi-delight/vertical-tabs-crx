import { BackIcon } from './back-icon'
import style from './index.module.css'
import { useBackNavigation } from './use-back-navigation'

export default function BackButton() {
    const { canGoBack, goBack } = useBackNavigation()

    return (
        <button
            aria-label="Go back to previous page"
            className={style['back-button']}
            disabled={!canGoBack}
            onClick={goBack}
            type="button">
            <BackIcon />
        </button>
    )
}
