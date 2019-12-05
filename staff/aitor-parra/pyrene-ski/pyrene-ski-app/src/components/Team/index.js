import React from 'react'
import '../../../src/template/index.sass'

export default function ({ team: { id, teamName, teamEmail, teamPhone, teamActivity }, onChangeStatus }) {
    return <a href="teamlist" className={`team team--$`}>
        <h2 className="team__title">{teamName}</h2>
        <p className="team__description">{teamEmail}</p>
        <span className="team__action">
            <form method="post" onSubmit={event => { event.preventDefault(); onChangeStatus(id, 'TODO') }}>
                <button type="submit" title="TODO"></button>
            </form>
        </span>
        <span className="team__action">
            <form method="post" onSubmit={event => { event.preventDefault(); onChangeStatus(id, 'DOING') }}>
                <button type="submit" title="DOING"></button>
            </form>
        </span>
        <span className="team__action">
            <form method="post" onSubmit={event => { event.preventDefault(); onChangeStatus(id, 'REVIEW') }}>
                <button type="submit" title="REVIEW"></button>
            </form>
        </span>
        <span className="team__action">
            <form method="post" onSubmit={event => { event.preventDefault(); onChangeStatus(id, 'DONE') }}>
                <button type="submit" title="DONE"></button>
            </form>
        </span>
    </a>
}