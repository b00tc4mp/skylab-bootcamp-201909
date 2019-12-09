import React from 'react'

import Results from '../Results'

export default function ({ username, favs, onDetail, onToggleFavs }) {
    debugger
    return <>
        <section className="search">
            <p className='greeting'>Hello, {username}! Your favorites:  </p>
            <Results results={favs} onDetail = {onDetail} onToggleFavs={onToggleFavs} />
        </section>
    </>
}