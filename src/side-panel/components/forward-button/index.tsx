import { ForwardIcon } from './forward-icon'
import style from './index.module.css'
import { useForwardNavigation } from './use-forward-navigation'

export default function ForwardButton() {
    const { canGoForward, goForward } = useForwardNavigation()

    return (
        <button
            aria-label="Go forward to next page"
            className={style['forward-button']}
            disabled={!canGoForward}
            onClick={goForward}
            type="button">
            <ForwardIcon />
        </button>
    )
}
