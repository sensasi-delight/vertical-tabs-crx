import { useMemo } from 'react'
import style from './index.module.css'

export default function RandomTip() {
    const randomTip = useMemo(
        () => TIPS[Math.floor(Math.random() * TIPS.length)],
        [],
    )

    return (
        <div className={style['tip-container']}>
            <div className={style['tip-header']}>
                <span>{randomTip.icon}</span>
                <span>TIP #{randomTip.no}</span>
            </div>

            {randomTip.value}
        </div>
    )
}

const TIPS: {
    no: number
    icon: string
    value: React.ReactNode
}[] = [
    {
        icon: '💡',
        no: 1,
        value: (
            <>
                <kbd>ALT + X</kbd> to toggle the side panel
            </>
        ),
    },
    {
        icon: '🖱️',
        no: 2,
        value: 'Drag and drop tabs to reorder them',
    },
    {
        icon: '🔍',
        no: 3,
        value: 'Use the address bar to search your history',
    },
    {
        icon: '⌨️',
        no: 4,
        value: (
            <>
                Press <kbd>Tab</kbd> to autocomplete with selected history URL
            </>
        ),
    },
    {
        icon: '⚡',
        no: 5,
        value: (
            <>
                Learn more Chrome shortcuts on{' '}
                <a
                    href="https://support.google.com/chrome/answer/157179"
                    rel="noopener noreferrer"
                    target="_blank">
                    Google support
                </a>
            </>
        ),
    },
    {
        icon: '💡',
        no: 6,
        value: (
            <>
                <kbd>CTRL + W</kbd> to close current tab
            </>
        ),
    },
    {
        icon: '💡',
        no: 7,
        value: (
            <>
                <kbd>CTRL + T</kbd> to open a new tab
            </>
        ),
    },
    {
        icon: '💡',
        no: 8,
        value: (
            <>
                <kbd>CTRL + Tab</kbd> to switch to the next tab
            </>
        ),
    },
    {
        icon: '💡',
        no: 9,
        value: (
            <>
                <kbd>CTRL + Shift + Tab</kbd> to switch to the previous tab
            </>
        ),
    },
    {
        icon: '💡',
        no: 10,
        value: (
            <>
                <kbd>CTRL + 1-8</kbd> to switch to a specific tab
            </>
        ),
    },
    {
        icon: '💡',
        no: 11,
        value: (
            <>
                <kbd>CTRL + 9</kbd> to switch to the last tab
            </>
        ),
    },
    {
        icon: '💖',
        no: 12,
        value: (
            <>
                Support us on{' '}
                <a
                    href="https://github.com/sponsors/sensasi-delight"
                    rel="noopener noreferrer"
                    target="_blank">
                    GitHub Sponsors
                </a>
            </>
        ),
    },
    {
        icon: '⚙️',
        no: 13,
        value: 'You can toggle these random tips in Settings',
    },
]
