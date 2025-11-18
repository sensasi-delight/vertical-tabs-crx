chrome.action.onClicked.addListener(tab => {
    chrome.sidePanel.open({
        tabId: tab.id,
        windowId: tab.windowId,
    })
})

chrome.commands.onCommand.addListener((command, tab) => {
    if (command === 'OPEN_SIDE_PANEL') {
        if (!tab) return

        chrome.sidePanel.open({
            tabId: tab.id,
            windowId: tab.windowId,
        })
    }
})
