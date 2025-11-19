import useActiveTab from '@/side-panel/hooks/use-active-tab'
import style from './index.module.css'
import { RefreshIcon } from './refresh-icon'

export function RefreshButton() {
    const activeTab = useActiveTab()

    const handleRefresh = () => {
        if (!activeTab?.id) return
        chrome.tabs.reload(activeTab.id)
    }

    return (
        <button
            aria-label="Refresh page"
            className={style['refresh-button']}
            onClick={handleRefresh}
            type="button">
            <RefreshIcon />
        </button>
    )
}
