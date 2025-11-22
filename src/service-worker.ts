let isOpen: boolean | 'processing' = false

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

const openSidePanel = (tabId: number, windowId: number) => {
    isOpen = 'processing'

    chrome.sidePanel
        .open({
            tabId,
            windowId,
        })
        .then(() => {
            isOpen = true
        })
}

const closeSidePanel = () => {
    isOpen = 'processing'

    chrome.runtime.sendMessage({ type: 'CLOSE_SIDE_PANEL' }).then(() => {
        isOpen = false
    })
}

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
