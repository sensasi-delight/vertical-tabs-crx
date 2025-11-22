import { createRoot } from 'react-dom/client'
import { ToggleButton } from './toggle-button'

const container = document.createElement('div')
container.id = 'vertical-tabs-crx-root'
document.body.appendChild(container)

const root = createRoot(container)
root.render(<ToggleButton />)
