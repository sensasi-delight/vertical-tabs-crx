import { Activity } from 'react'
import style from './index.module.css'
import { useLoadingState } from './use-loading-state'

export default function LinearProgress() {
    const isLoading = useLoadingState()

    return (
        <Activity mode={isLoading ? 'visible' : 'hidden'}>
            <div className={style.container}>
                <div className={style.bar} />
            </div>
        </Activity>
    )
}
