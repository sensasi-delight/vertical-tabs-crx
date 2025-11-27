let isOpen: boolean | 'processing' = false

const openSidePanel = (tabId: number, windowId: number) => {
    isOpen = 'processing'

    chrome.sidePanel.open({
        tabId,
        windowId,
    })
}

const closeSidePanel = () => {
    isOpen = 'processing'
}

// Listen for port connections from side panel
chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'side-panel') {
        isOpen = true

        // When port disconnects, side panel is closed
        port.onDisconnect.addListener(() => {
            isOpen = false
        })
    }
})

chrome.action.onClicked.addListener(tab => {
    if (!tab?.id || isOpen === 'processing') return

    if (isOpen) {
        closeSidePanel()
    } else {
        openSidePanel(tab.id, tab.windowId)
    }
})

chrome.commands.onCommand.addListener((command, tab) => {
    if (command === 'TOGGLE_SIDE_PANEL') {
        if (!tab?.id || isOpen === 'processing') return

        if (isOpen) {
            closeSidePanel()
        } else {
            openSidePanel(tab.id, tab.windowId)
        }
    }
})

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'TOGGLE_SIDE_PANEL_FROM_CONTENT') {
        if (!sender.tab?.id || isOpen === 'processing') return

        if (isOpen) {
            closeSidePanel()
        } else {
            openSidePanel(sender.tab.id, sender.tab.windowId)
        }
    }
})
