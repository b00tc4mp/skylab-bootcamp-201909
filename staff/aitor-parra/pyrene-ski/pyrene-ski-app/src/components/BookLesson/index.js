import React from 'react'
import '../../../src/template/index.sass'

export default function ({ lesson: { id, date, timeStart, timeEnd, teamName, activityName }, onBookLesson}) {
    return <>
        <a href="/booklessonlist" className={'booking-lesson'}>{/* {id} */}
        <p className="booking-lesson__date">{date}</p>
        <p className="booking-lesson__timeStart">{timeStart}</p>
        <p className="booking-lesson__timeEnd">{timeEnd}</p>
        <p className="booking-lesson__teamName">{teamName}</p>
        <p className="booking-lesson__teamActivity">{activityName}</p>
        <span className="booking-lesson__lessonBooking">
            <form method="post" onSubmit={event => { event.preventDefault(); onBookLesson(id) }}>
                <button type="submit" title="book-button">⛷</button>
            </form>
        </span>
    </a>
    </>
}