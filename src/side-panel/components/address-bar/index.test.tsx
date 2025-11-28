import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'jotai'
import { describe, expect, it, vi } from 'vitest'
import AddressBar from './index'

// Mock chrome API
const mockTabsOnCreated = {
    addListener: vi.fn(),
    removeListener: vi.fn(),
}

const mockTabsUpdate = vi.fn()

global.chrome = {
    tabs: {
        onCreated: mockTabsOnCreated,
        update: mockTabsUpdate,
    },
} as any

describe('AddressBar', () => {
    it('should focus input when a new tab is created', async () => {
        render(
            <Provider>
                <AddressBar />
            </Provider>,
        )

        const input = screen.getByRole('textbox')
        expect(document.activeElement).not.toBe(input)

        // Simulate new tab creation
        const [callback] = mockTabsOnCreated.addListener.mock.calls[0]
        callback({ active: false, id: 123 })

        await waitFor(() => {
            expect(document.activeElement).toBe(input)
        })
    })
})
