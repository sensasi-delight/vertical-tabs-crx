import useActiveTab from '../../hooks/use-active-tab'
import style from './index.module.css'
import { TabItem } from './tab-item'
import useTabs from './use-tabs'

export default function VerticalTabs() {
    const tabs = useTabs()
    const activeTab = useActiveTab()

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
        </div>
    )
}
