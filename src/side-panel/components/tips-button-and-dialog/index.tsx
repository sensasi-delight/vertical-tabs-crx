import { useState } from 'react'
import style from './index.module.css'
import TipsDialog from './tips-dialog'

export default function TipsButton() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => {
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
    }

    return (
        <div className={style['tips-container']}>
            <button
                aria-label="Show tips"
                className={style.button}
                onClick={openDialog}
                type="button">
                <span className={style.icon}>💡</span>
                Tips
            </button>

            <TipsDialog isOpen={isDialogOpen} onClose={closeDialog} />
        </div>
    )
}
