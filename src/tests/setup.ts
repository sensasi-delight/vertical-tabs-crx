import { vi } from 'vitest'

// Mock Chrome APIs
// biome-ignore lint/suspicious/noExplicitAny: Chrome API mocking requires any type
;(globalThis as any).chrome = {
    history: {
        deleteUrl: vi.fn(),
        search: vi.fn(),
    },
    storage: {
        onChanged: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        },
        sync: {
            get: vi.fn(),
            set: vi.fn(),
        },
    },
    tabs: {
        create: vi.fn(),
        move: vi.fn(),
        onActivated: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        },
        onCreated: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        },
        onRemoved: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        },
        onUpdated: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        },
        query: vi.fn(),
        remove: vi.fn(),
        update: vi.fn(),
    },
}
