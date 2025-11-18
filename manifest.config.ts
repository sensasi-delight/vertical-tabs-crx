import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
    action: {
        default_icon: {
            48: 'public/logo.png',
        },
        default_title: 'Sidenav Delight',
    },
    background: {
        service_worker: 'src/service-worker.ts',
    },
    commands: {
        OPEN_SIDE_PANEL: {
            description: 'Open the side panel',
            suggested_key: {
                default: 'Ctrl+Shift+X',
                mac: 'Command+Shift+X',
            },
        },
    },
    description: pkg.description,
    icons: {
        48: 'public/logo.png',
    },
    manifest_version: 3,
    name: 'Sidenav Delight',
    permissions: ['history', 'sidePanel', 'tabs'],
    side_panel: {
        default_path: 'src/side-panel/index.html',
    },
    version: pkg.version,
})
