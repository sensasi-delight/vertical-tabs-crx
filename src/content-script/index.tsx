import { createRoot } from 'react-dom/client'
import { ToggleButton } from './toggle-button'

const STORAGE_KEY = 'showToggleButton'

const container = document.createElement('div')
container.id = 'vertical-tabs-crx-root'
document.body.appendChild(container)

const root = createRoot(container)

// Check storage setting before rendering
chrome.storage.sync.get([STORAGE_KEY], result => {
    const shouldShow = result[STORAGE_KEY] !== false // Default to true

    if (shouldShow) {
        root.render(<ToggleButton />)
    }
})

// Listen for storage changes
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes[STORAGE_KEY]) {
        if (changes[STORAGE_KEY].newValue) {
            root.render(<ToggleButton />)
        } else {
            root.render(null)
        }
    }
})
