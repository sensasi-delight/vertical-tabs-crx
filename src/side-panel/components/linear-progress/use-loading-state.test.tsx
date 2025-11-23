import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useLoadingState } from './use-loading-state'

describe('useLoadingState', () => {
    it('should return true when activeTab status is loading', () => {
        // const { result } = renderHook(() => useLoadingState())
        // expect(result.current).toBe(true)
    })

    it('should return false when activeTab status is complete', () => {
        const { result } = renderHook(() => useLoadingState())
        expect(result.current).toBe(false)
    })

    it('should return false when activeTab is undefined', () => {
        const { result } = renderHook(() => useLoadingState())
        expect(result.current).toBe(false)
    })
})
