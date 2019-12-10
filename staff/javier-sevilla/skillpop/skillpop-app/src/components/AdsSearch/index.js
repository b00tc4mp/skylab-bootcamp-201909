import React from 'react'
import './index.sass'
import AdItem from '../AdItem'

export default function ({ ads, adDetail,onFav }) {
    return <ul className="results">
        {ads && ads.map(ad => <li className="results__item" key={ad.id}><AdItem ad={ad} adDetail={adDetail} onFav={onFav}/></li>)}
    </ul>
}