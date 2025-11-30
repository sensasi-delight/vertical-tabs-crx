const ports = new Map<number, chrome.runtime.Port>()
const processingWindows = new Set<number>()

const openSidePanel = async (tabId: number, windowId: number) => {
    if (processingWindows.has(windowId)) return
    processingWindows.add(windowId)

    try {
        await chrome.sidePanel.open({
            tabId,
            windowId,
        })
    } catch (error) {
        console.error('Failed to open side panel:', error)
        processingWindows.delete(windowId)
    }
}

const closeSidePanel = (windowId: number) => {
    if (processingWindows.has(windowId)) return

    const port = ports.get(windowId)
    if (port) {
        processingWindows.add(windowId)
        port.postMessage({ type: 'CLOSE_SIDE_PANEL' })
    }
}

// Listen for port connections from side panel
chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'side-panel') {
        const windowId = port.sender?.tab?.windowId

        if (typeof windowId === 'number') {
            ports.set(windowId, port)
            processingWindows.delete(windowId)

            // When port disconnects, side panel is closed
            port.onDisconnect.addListener(() => {
                ports.delete(windowId)
                processingWindows.delete(windowId)
            })
        }
    }
})

chrome.action.onClicked.addListener(tab => {
    if (!tab?.id || !tab.windowId) return

    if (processingWindows.has(tab.windowId)) return

    if (ports.has(tab.windowId)) {
        closeSidePanel(tab.windowId)
    } else {
        openSidePanel(tab.id, tab.windowId)
    }
})

chrome.commands.onCommand.addListener((command, tab) => {
    if (command === 'TOGGLE_SIDE_PANEL') {
        if (!tab?.id || !tab.windowId) return

        if (processingWindows.has(tab.windowId)) return

        if (ports.has(tab.windowId)) {
            closeSidePanel(tab.windowId)
        } else {
            openSidePanel(tab.id, tab.windowId)
        }
    }
})

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'TOGGLE_SIDE_PANEL_FROM_CONTENT') {
        if (!sender.tab?.id || !sender.tab.windowId) return

        if (processingWindows.has(sender.tab.windowId)) return

        if (ports.has(sender.tab.windowId)) {
            closeSidePanel(sender.tab.windowId)
        } else {
            openSidePanel(sender.tab.id, sender.tab.windowId)
        }
    }
})
