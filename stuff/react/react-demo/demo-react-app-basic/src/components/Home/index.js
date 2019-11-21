import React from 'react'
import './index.sass'

export default function ({ aside, main }) {
    return <div className='home'>
        <aside>{aside}</aside>
        <main>{main}</main>
    </div>
}
