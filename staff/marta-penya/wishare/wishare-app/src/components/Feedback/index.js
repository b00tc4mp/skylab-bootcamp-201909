import React from 'react'
import './index.sass'

export default function({ message }){
    return <section class="feedback">
    <p class="feedback__message">{ message }</p>
</section>
}