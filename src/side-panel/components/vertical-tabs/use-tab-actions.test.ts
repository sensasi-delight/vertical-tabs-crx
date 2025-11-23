import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTabActions } from './use-tab-actions'

describe('useTabActions', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('activateTab', () => {
        it('should call chrome.tabs.update with correct tabId', () => {
            const { result } = renderHook(() => useTabActions())
            const tabId = 123

            result.current.activateTab(tabId)

            expect(chrome.tabs.update).toHaveBeenCalledWith(tabId, {
                active: true,
            })
        })

        it('should not call chrome.tabs.update when tabId is undefined', () => {
            const { result } = renderHook(() => useTabActions())

            result.current.activateTab(undefined)

            expect(chrome.tabs.update).not.toHaveBeenCalled()
        })
    })

    describe('closeTab', () => {
        it('should call chrome.tabs.remove with correct tabId', () => {
            const { result } = renderHook(() => useTabActions())
            const tabId = 456

            result.current.closeTab(tabId)

            expect(chrome.tabs.remove).toHaveBeenCalledWith(tabId)
        })

        it('should not call chrome.tabs.remove when tabId is undefined', () => {
            const { result } = renderHook(() => useTabActions())

            result.current.closeTab(undefined)

            expect(chrome.tabs.remove).not.toHaveBeenCalled()
        })
    })

    it('should return stable function references', () => {
        const { result, rerender } = renderHook(() => useTabActions())
        const firstActivateTab = result.current.activateTab
        const firstCloseTab = result.current.closeTab

        rerender()

        expect(result.current.activateTab).toBe(firstActivateTab)
        expect(result.current.closeTab).toBe(firstCloseTab)
    })
})
