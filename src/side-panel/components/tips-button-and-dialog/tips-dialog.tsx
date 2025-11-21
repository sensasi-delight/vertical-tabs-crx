import { useEffect } from 'react'
import style from './tips-dialog.module.css'

const TIPS: {
    icon: string
    title: string
    description: React.ReactNode
}[] = [
    {
        description: (
            <>
                Press <span className={style.tipCode}>ALT + X</span> to quickly
                open or close the vertical tabs panel.
            </>
        ),
        icon: '⌨️',
        title: 'Keyboard Shortcut',
    },
    {
        description: (
            <>
                Chrome has many built-in keyboard shortcuts to boost your
                productivity. Learn more at{' '}
                <a
                    className={style.tipLink}
                    href="https://support.google.com/chrome/answer/157179"
                    rel="noopener noreferrer"
                    target="_blank">
                    Chrome Keyboard Shortcuts
                </a>
                .
            </>
        ),
        icon: '⚡',
        title: 'Other Keyboard Shortcuts',
    },
]

export default function TipsDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClose()
        }
    }

    return (
        <div
            aria-label="Close dialog"
            className={style.overlay}
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}>
            <div className={style.dialog}>
                <div className={style.header}>
                    <h2 className={style.title}>💡 Tips</h2>

                    <button
                        aria-label="Close"
                        className={style.closeButton}
                        onClick={onClose}
                        type="button">
                        ✕
                    </button>
                </div>

                <div className={style.content}>
                    {TIPS.map(tip => (
                        <div className={style.tip} key={tip.title}>
                            <h3 className={style.tipTitle}>
                                <span className={style.tipIcon}>
                                    {tip.icon}
                                </span>
                                {tip.title}
                            </h3>
                            <p className={style.tipDescription}>
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
