import React, {useEffect, useState }from 'react'
import ResultsItem from '../Results-item'
import {retrieveUser} from '../../logic'

export default function ({ results, onDetail, onToggleFavs}) {
    const [user, setUser] = useState()

    useEffect(()=>{
        try {

            (async () => {const {token} = sessionStorage
            setUser(await retrieveUser(token))
        })()

        } catch (error) {
            console.log(error)
        }    
    })
    return <> {user && <ul className="results">
        {results ? results.map(result => <li className="task-list__item" key={result.id}><ResultsItem result={result} onDetail = {onDetail} onToggleFavs = {onToggleFavs} favs= {user.favs} /></li>): <></>}

</ul>}</>
    
    
    
}
// {results && results.map(result => <li className="results__item" key={result.id}><ResultsItem result={result} /></li>)}