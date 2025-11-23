import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDragDrop } from './use-drag-drop'

describe('useDragDrop', () => {
    const mockTabs: chrome.tabs.Tab[] = [
        { id: 1, index: 0, title: 'Tab 1' } as chrome.tabs.Tab,
        { id: 2, index: 1, title: 'Tab 2' } as chrome.tabs.Tab,
        { id: 3, index: 2, title: 'Tab 3' } as chrome.tabs.Tab,
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should initialize with undefined draggedTabId and dragOverTabId', () => {
        const { result } = renderHook(() => useDragDrop(mockTabs))

        expect(result.current.draggedTabId).toBeUndefined()
        expect(result.current.dragOverTabId).toBeUndefined()
    })

    describe('handleDragStart', () => {
        it('should set draggedTabId and activate the tab', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                dataTransfer: {
                    effectAllowed: '',
                    setData: vi.fn(),
                },
            } as any

            act(() => {
                result.current.handleDragStart(1)(mockEvent)
            })

            expect(result.current.draggedTabId).toBe(1)
            expect(chrome.tabs.update).toHaveBeenCalledWith(1, { active: true })
            expect(mockEvent.dataTransfer.effectAllowed).toBe('move')
            expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith(
                'text/plain',
                '1',
            )
        })
    })

    describe('handleDragOver', () => {
        it('should set dragOverTabId when different from draggedTabId', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                dataTransfer: {
                    dropEffect: '',
                },
                preventDefault: vi.fn(),
            } as any

            // First drag a tab
            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            // Then drag over another tab
            act(() => {
                result.current.handleDragOver(2)(mockEvent)
            })

            expect(mockEvent.preventDefault).toHaveBeenCalled()
            expect(mockEvent.dataTransfer.dropEffect).toBe('move')
            expect(result.current.dragOverTabId).toBe(2)
        })

        it('should not set dragOverTabId when same as draggedTabId', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                dataTransfer: {
                    dropEffect: '',
                },
                preventDefault: vi.fn(),
            } as any

            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            act(() => {
                result.current.handleDragOver(1)(mockEvent)
            })

            expect(result.current.dragOverTabId).toBeUndefined()
        })
    })

    describe('handleDragEnd', () => {
        it('should reset draggedTabId and dragOverTabId', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))

            // Set up drag state
            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            act(() => {
                result.current.handleDragOver(2)({
                    dataTransfer: {
                        dropEffect: '',
                    },
                    preventDefault: vi.fn(),
                } as any)
            })

            // End drag
            act(() => {
                result.current.handleDragEnd()
            })

            expect(result.current.draggedTabId).toBeUndefined()
            expect(result.current.dragOverTabId).toBeUndefined()
        })
    })

    describe('handleDrop', () => {
        it('should call chrome.tabs.move with correct parameters', () => {
            const mockMove = vi.fn((tabId, moveProperties, callback) => {
                callback?.()
            })
            chrome.tabs.move = mockMove

            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                preventDefault: vi.fn(),
            } as any

            // Set up drag state
            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            // Drop on target
            act(() => {
                result.current.handleDrop(2)(mockEvent)
            })

            expect(mockEvent.preventDefault).toHaveBeenCalled()
            expect(mockMove).toHaveBeenCalledWith(
                1,
                { index: 1 },
                expect.any(Function),
            )
        })

        it('should not move tab when draggedTabId is undefined', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                preventDefault: vi.fn(),
            } as any

            act(() => {
                result.current.handleDrop(2)(mockEvent)
            })

            expect(chrome.tabs.move).not.toHaveBeenCalled()
        })

        it('should not move tab when targetTabId is undefined', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                preventDefault: vi.fn(),
            } as any

            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            act(() => {
                result.current.handleDrop(undefined)(mockEvent)
            })

            expect(chrome.tabs.move).not.toHaveBeenCalled()
        })

        it('should not move tab when draggedTabId equals targetTabId', () => {
            const { result } = renderHook(() => useDragDrop(mockTabs))
            const mockEvent = {
                preventDefault: vi.fn(),
            } as any

            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            act(() => {
                result.current.handleDrop(1)(mockEvent)
            })

            expect(chrome.tabs.move).not.toHaveBeenCalled()
        })

        it('should reset state after successful drop', () => {
            const mockMove = vi.fn((tabId, moveProperties, callback) => {
                callback?.()
            })

            chrome.tabs.move = mockMove

            const { result } = renderHook(() => useDragDrop(mockTabs))

            act(() => {
                result.current.handleDragStart(1)({
                    dataTransfer: {
                        effectAllowed: '',
                        setData: vi.fn(),
                    },
                } as any)
            })

            act(() => {
                result.current.handleDrop(2)({
                    preventDefault: vi.fn(),
                } as any)
            })

            expect(result.current.draggedTabId).toBeUndefined()
            expect(result.current.dragOverTabId).toBeUndefined()
        })
    })
})
