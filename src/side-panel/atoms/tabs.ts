import { atom, useAtomValue, useSetAtom } from 'jotai'

const tabsAtom = atom<chrome.tabs.Tab[]>([])

export function useTabs() {
    return useAtomValue(tabsAtom)
}

export function useSetTabs() {
    return useSetAtom(tabsAtom)
}
