import style from './search-input.module.css'

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
