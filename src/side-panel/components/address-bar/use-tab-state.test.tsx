import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useTabState } from './use-tab-state'

// Mock the cleanUrl function
vi.mock('./utils', () => ({
    cleanUrl: vi.fn((url: string) => url.replace(/^https?:\/\//, '')),
}))

describe('useTabState', () => {
    it('should initialize with empty inputValue when no activeTab', () => {
        const { result } = renderHook(() => useTabState())

        expect(result.current.inputValue).toBe('')
        expect(result.current.activeTab).toBeUndefined()
    })

    // it('should update inputValue when activeTab has URL', () => {
    //     const { result } = renderHook(() => useTabState())

    //     expect(result.current.inputValue).toBe('example.com')
    //     expect(result.current.activeTab?.url).toBe('https://example.com')
    // })

    it('should allow manual inputValue updates', () => {
        const { result } = renderHook(() => useTabState())

        act(() => {
            result.current.setInputValue('custom value')
        })

        expect(result.current.inputValue).toBe('custom value')
    })
})
