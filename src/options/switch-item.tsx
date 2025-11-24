import style from './app.module.css'

interface SwitchItemProps {
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
}

export function SwitchItem({ checked, onChange, label }: SwitchItemProps) {
    return (
        <div className={style.switchRow}>
            <label className={style.switch}>
                <input
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                    type="checkbox"
                />
                <span className={style.slider} />
            </label>
            <span className={style.switchLabel}>{label}</span>
        </div>
    )
}
