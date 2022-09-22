import React from 'react'

export default function Chip({ title, onDelete, item, type, index }) {
    return (
        <div className="chip">
            <div className="chipText">{title}</div>
            <div onClick={() => {
                onDelete && onDelete(item, type, index)
            }}>
                <div name={'close'} className="deleteIcon icon-close" />
            </div>
        </div>
    )
}
