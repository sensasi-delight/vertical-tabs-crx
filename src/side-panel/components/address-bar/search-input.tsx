import style from './search-input.module.css'
import { splitUrlParts } from './utils'

interface SearchInputProps {
    value: string
    inputRef: React.RefObject<HTMLInputElement | null>
    onValueChange: (value: string) => void
    onFocus: () => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function SearchInput({
    value,
    inputRef,
    onValueChange,
    onFocus,
    onKeyDown,
}: SearchInputProps) {
    // Check if value looks like a URL (contains domain pattern)
    const isUrl =
        value &&
        (/^https?:\/\//.test(value) ||
            /^[a-z0-9.-]+\.[a-z]{2,}/i.test(value) ||
            value.includes('/'))

    if (isUrl) {
        const { domain, path } = splitUrlParts(value)

        return (
            <div className={style['input-wrapper']}>
                <input
                    className={style.input}
                    onChange={e => onValueChange(e.target.value)}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    placeholder="Search Google or type a URL"
                    ref={inputRef}
                    type="text"
                    value={value}
                />
                <div className={style['url-display']}>
                    <span className={style['url-domain']}>{domain}</span>
                    <span className={style['url-path']}>{path}</span>
                </div>
            </div>
        )
    }

    return (
        <input
            className={style.input}
            onChange={e => onValueChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            placeholder="Search Google or type a URL"
            ref={inputRef}
            type="text"
            value={value}
        />
    )
}
