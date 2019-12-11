import React, { useState, useEffect } from 'react';
import './index.sass'
import ProgressionItem from './Progression-item'
import { listPractices } from '../../logic'
import Feedback from '../Feedback'
const moment = require('moment')

export default function ({ id, user, onBack }) {
  const [practices, setPractices] = useState(undefined)
  const [notification, setNotification] = useState(null)
  const { token } = sessionStorage

  useEffect(() => {
    (async () => {
      try {
        if(token) {
          // retrieve all practices of the student
          const result = await listPractices(token, id)
          const { practices } = result
          // if there are no practices, we receive an empty array, which we set to undefind to avoid render errors
          setPractices(practices && practices.length === 0
            ? undefined
            : practices)
        }
      } catch ({ message }) {
        setNotification({ error: true, message })
      }
    })()
  }, [])

  return <>
    <div className='title'>
      <i onClick={onBack} className="material-icons">undo</i>
      <h3>Progression</h3>
    </div>
    <section className="timeline">
      <ul className='timeline__list'>
        { practices && practices
          .filter(pract => pract.valoration ) //filter only valorated practices
          .sort((a, b) =>  moment(a.date).diff(moment(b.date)))
          .map((practice, i) =>
            <ProgressionItem practice={practice} key={i} i={i + 1} /> )
        }
      </ul>
      {notification && <Feedback {...notification} />}
    </section>
  </>
}
