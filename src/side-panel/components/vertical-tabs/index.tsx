import style from './index.module.css'
import { TabItem } from './tab-item'
import { useActiveTab } from './use-active-tab'
import useTabs from './use-tabs'

export default function VerticalTabs() {
    const tabs = useTabs()
    const activeTabId = useActiveTab()

    return (
        <div className={style['vertical-tabs-container']}>
            <div className={style['vertical-tabs']}>
                {tabs.map(tab => (
                    <TabItem
                        isActive={tab.id === activeTabId}
                        key={tab.id}
                        tab={tab}
                    />
                ))}
            </div>
        </div>
    )
}
