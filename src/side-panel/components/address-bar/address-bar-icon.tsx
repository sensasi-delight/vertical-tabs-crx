import style from './address-bar-icon.module.css'

interface AddressBarIconProps {
    favIconUrl?: string
}

export function AddressBarIcon({ favIconUrl }: AddressBarIconProps) {
    if (favIconUrl) {
        return <img alt="Favicon" height={16} src={favIconUrl} width={16} />
    }

    return (
        <svg
            aria-hidden="true"
            className={style.icon}
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16">
            <circle cx="8" cy="8" r="7" stroke="#444" strokeWidth="2" />
        </svg>
    )
}
