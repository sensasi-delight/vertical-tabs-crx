import { createRoot } from 'react-dom/client'
import { ToggleButton } from './toggle-button'

const STORAGE_KEY_SHOW = 'showToggleButton'
const STORAGE_KEY_OPACITY = 'toggleButtonOpacity'

const container = document.createElement('div')
container.id = 'vertical-tabs-crx-root'
document.body.appendChild(container)

const root = createRoot(container)

// Check storage settings before rendering
chrome.storage.sync.get([STORAGE_KEY_SHOW, STORAGE_KEY_OPACITY], result => {
    const shouldShow = result[STORAGE_KEY_SHOW] !== false // Default to true
    const opacity =
        typeof result[STORAGE_KEY_OPACITY] === 'number'
            ? result[STORAGE_KEY_OPACITY]
            : 0.5 // Default opacity 50%

    if (shouldShow) {
        root.render(<ToggleButton opacity={opacity} />)
    }
})

// Listen for storage changes
chrome.storage.onChanged.addListener((_changes, areaName) => {
    if (areaName === 'sync') {
        chrome.storage.sync.get(
            [STORAGE_KEY_SHOW, STORAGE_KEY_OPACITY],
            result => {
                const shouldShow = result[STORAGE_KEY_SHOW] !== false
                const opacity =
                    typeof result[STORAGE_KEY_OPACITY] === 'number'
                        ? result[STORAGE_KEY_OPACITY]
                        : 0.5

                if (shouldShow) {
                    root.render(<ToggleButton opacity={opacity} />)
                } else {
                    root.render(null)
                }
            },
        )
    }
})
