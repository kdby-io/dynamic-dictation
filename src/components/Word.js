import React from 'react'

export const Word = ({ word, volume }) => (
    <div style={{display: 'inline '}}>
    <span style={{ fontSize: Math.floor(volume * 200) + 10 }}>
        {`${word}`}
    </span><span>{' '}</span>
    </div>
)