import { atom, useAtomValue, useSetAtom } from 'jotai'

const activeTabAtom = atom<chrome.tabs.Tab | undefined>(undefined)

export function useActiveTab() {
    return useAtomValue(activeTabAtom)
}

export function useSetActiveTab() {
    return useSetAtom(activeTabAtom)
}
