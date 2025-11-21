import { useActiveTab } from '@/side-panel/atoms/active-tab'

export function useLoadingState() {
    return useActiveTab()?.status === 'loading'
}
