import React from 'react'

function ConfirmDelete({ resourceName, onClose, disabled, onConfirm }) {
    return (
        <div>
            <h2 className='font-bold text-base mb-8'
            >آیا از حذف {resourceName} مطمعن هستید؟</h2>
            <div
             className='flex justify-between items-center gap-x-16'>
                <button
                 className='btn btn--primary flex-1'
                    onClick={onClose}
                    disabled={disabled}
                >لغو</button>
                <button
                    onClick={onConfirm}
                    disabled={disabled}
                    className='btn btn--danger flex-1 py-3'
                >تایید</button>
            </div>
        </div>
    )
}

export default ConfirmDelete