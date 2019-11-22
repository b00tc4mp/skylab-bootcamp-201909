import React from 'react'
import './index.sass'

export default function ({ aside, main }) {
    return <div className='home'>
        <aside className="wrapper-aside">{aside}</aside>
        <main className="wrapper-main">{main}</main>
    </div>
}
