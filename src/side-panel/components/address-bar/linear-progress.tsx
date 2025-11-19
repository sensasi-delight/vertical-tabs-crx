import style from './linear-progress.module.css'

interface LinearProgressProps {
    isLoading: boolean
}

export function LinearProgress({ isLoading }: LinearProgressProps) {
    if (!isLoading) return null

    return (
        <div className={style.container}>
            <div className={style.bar} />
        </div>
    )
}
