import useActiveTab from '../../hooks/use-active-tab'
import { ARIA_LABELS } from './constants'
import { PlusIcon } from './icons'
import style from './index.module.css'
import { TabItem } from './tab-item'
import { useTabActions } from './use-tab-actions'
import useTabs from './use-tabs'

export default function VerticalTabs() {
    const tabs = useTabs()
    const activeTab = useActiveTab()
    const { createNewTab } = useTabActions()

    return (
        <div className={style['vertical-tabs-container']}>
            <div className={style['vertical-tabs']}>
                {tabs.map(tab => (
                    <TabItem
                        isActive={tab.id === activeTab?.id}
                        key={tab.id}
                        tab={tab}
                    />
                ))}
            </div>
            <div className={style['vertical-tabs-footer']}>
                <button
                    aria-label={ARIA_LABELS.NEW_TAB}
                    className={style['new-tab-button']}
                    onClick={createNewTab}
                    type="button">
                    <PlusIcon />
                    <span>New Tab</span>
                </button>
            </div>
        </div>
    )
}
