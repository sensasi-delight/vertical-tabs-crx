import useActiveTab from '../../hooks/use-active-tab'
import style from './index.module.css'
import { TabItem } from './tab-item'
import { useDragDrop } from './use-drag-drop'
import useTabs from './use-tabs'

export default function VerticalTabs() {
    const tabs = useTabs()
    const activeTab = useActiveTab()
    const {
        draggedTabId,
        dragOverTabId,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop,
    } = useDragDrop(tabs)

    return (
        <div className={style['vertical-tabs-container']}>
            <div className={style['vertical-tabs']}>
                {tabs.map(tab => (
                    <TabItem
                        isActive={tab.id === activeTab?.id}
                        isDragging={tab.id === draggedTabId}
                        isDragOver={tab.id === dragOverTabId}
                        key={tab.id}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver(tab.id)}
                        onDragStart={handleDragStart(tab.id)}
                        onDrop={handleDrop(tab.id)}
                        tab={tab}
                    />
                ))}
            </div>
        </div>
    )
}
