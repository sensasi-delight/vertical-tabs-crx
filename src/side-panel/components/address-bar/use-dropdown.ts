import { useEffect, useRef, useState } from 'react'

export function useDropdown(
    inputRef: React.RefObject<HTMLInputElement | null>,
): {
    showDropdown: boolean
    setShowDropdown: (show: boolean) => void
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    dropdownRef: React.RefObject<HTMLDivElement | null>
} {
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node
            const isClickInside =
                dropdownRef.current?.contains(target) ||
                inputRef.current?.contains(target)

            if (!isClickInside) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [inputRef])

    return {
        dropdownRef,
        selectedIndex,
        setSelectedIndex,
        setShowDropdown,
        showDropdown,
    }
}
