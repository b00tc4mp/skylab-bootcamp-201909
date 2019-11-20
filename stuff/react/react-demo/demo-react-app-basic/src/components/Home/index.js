import React from 'react'
import Feedback from '../Feedback'


export default function ({ aside, main }) {
    return <>
        <aside>{aside}</aside>
        <main>{main}</main>
    </>
}
