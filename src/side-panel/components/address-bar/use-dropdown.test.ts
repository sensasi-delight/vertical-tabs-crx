import { act, fireEvent, renderHook } from '@testing-library/react'
import { createRef } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useDropdown } from './use-dropdown'

describe('useDropdown', () => {
    let inputRef: React.RefObject<HTMLInputElement>

    beforeEach(() => {
        inputRef = createRef<HTMLInputElement>()
        // Create a real input element for the ref
        const input = document.createElement('input')
        document.body.appendChild(input)
        ;(inputRef as any).current = input
    })

    afterEach(() => {
        document.body.innerHTML = ''
    })

    it('should initialize with showDropdown false and selectedIndex -1', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        expect(result.current.showDropdown).toBe(false)
        expect(result.current.selectedIndex).toBe(-1)
    })

    it('should update showDropdown when setShowDropdown is called', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        act(() => {
            result.current.setShowDropdown(true)
        })

        expect(result.current.showDropdown).toBe(true)

        act(() => {
            result.current.setShowDropdown(false)
        })

        expect(result.current.showDropdown).toBe(false)
    })

    it('should update selectedIndex when setSelectedIndex is called', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        act(() => {
            result.current.setSelectedIndex(5)
        })

        expect(result.current.selectedIndex).toBe(5)

        act(() => {
            result.current.setSelectedIndex(prev => prev + 1)
        })

        expect(result.current.selectedIndex).toBe(6)
    })

    it('should close dropdown when clicking outside', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        // Open dropdown
        act(() => {
            result.current.setShowDropdown(true)
        })

        expect(result.current.showDropdown).toBe(true)

        // Click outside
        act(() => {
            fireEvent.mouseDown(document.body)
        })

        expect(result.current.showDropdown).toBe(false)
    })

    it('should not close dropdown when clicking inside input', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        act(() => {
            result.current.setShowDropdown(true)
        })

        expect(result.current.showDropdown).toBe(true)

        // Click inside input
        act(() => {
            fireEvent.mouseDown(inputRef.current!)
        })

        expect(result.current.showDropdown).toBe(true)
    })

    it('should not close dropdown when clicking inside dropdown', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        // Create dropdown element
        const dropdown = document.createElement('div')
        document.body.appendChild(dropdown)
        ;(result.current.dropdownRef as any).current = dropdown

        act(() => {
            result.current.setShowDropdown(true)
        })

        expect(result.current.showDropdown).toBe(true)

        // Click inside dropdown
        act(() => {
            fireEvent.mouseDown(dropdown)
        })

        expect(result.current.showDropdown).toBe(true)
    })

    it('should provide a dropdownRef', () => {
        const { result } = renderHook(() => useDropdown(inputRef))

        expect(result.current.dropdownRef).toBeDefined()
        expect(result.current.dropdownRef.current).toBeNull()
    })
})
