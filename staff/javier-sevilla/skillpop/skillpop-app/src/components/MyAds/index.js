import React from 'react'
import './index.sass'
import MyAdsItem from '../MyAdsItem'

export default function ({ ads, adDetail }) {
    return <>
    <h2>{ ads ? 'My ADS' : '' }</h2>
    <ul className="results">
        {ads && ads.map(ad => <li className="results__item" key={ad.id}><MyAdsItem ad={ad} adDetail={adDetail} /></li>)}
    </ul>
    </>
}