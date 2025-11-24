import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

const SHORT_NAME = 'Vertical Tabs'

export default defineManifest({
    action: {
        default_icon: {
            48: 'public/logo.png',
        },
        default_title: `Toggle the side panel — ${SHORT_NAME} by Sensasi Delight`,
    },
    author: pkg.author,
    background: {
        service_worker: 'src/service-worker.ts',
    },
    commands: {
        TOGGLE_SIDE_PANEL: {
            description: 'Toggle the side panel',
            suggested_key: {
                default: 'Alt+X',
                mac: 'Alt+X',
            },
        },
    },
    content_scripts: [
        {
            js: ['src/content-script/index.tsx'],
            matches: ['<all_urls>'],
        },
    ],
    description: `Press ALT + X to toggle the side panel 🧭 ${pkg.description}`,
    homepage_url: pkg.homepage,
    icons: {
        48: 'public/logo.png',
    },
    manifest_version: 3,
    name: `${SHORT_NAME} by Sensasi Delight — Sidebar & Fullscreen Navigation`,
    options_ui: {
        open_in_tab: false,
        page: 'src/options/index.html',
    },
    permissions: ['history', 'sidePanel', 'tabs', 'storage'],
    short_name: SHORT_NAME,
    side_panel: {
        default_path: 'src/side-panel/index.html',
    },
    version: pkg.version,
})
