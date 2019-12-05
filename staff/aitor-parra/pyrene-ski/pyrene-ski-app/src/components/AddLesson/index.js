import React from 'react'
import '../../template/index.sass'
import Feedback from '../Feedback'


export default function({user, onAddLesson, teamName, teamActivity, onBack, error}) {

return <section className="add-lesson">
    <h3 className="add-lesson__title">Add className</h3>
    <h4 className="add-lesson__user">{user}</h4>
    <form className="add-lesson__form" onSubmit={function (event) {
        event.preventDefault()

        const { date: { value: date }, timeStart: { value: timeStart }, timeEnd: { value: timeEnd }, teamName: { value: teamName }, teamActivity: { value: teamActivity } } = event.target

        onAddLesson(date, timeStart, timeEnd, teamName, teamActivity )

    }}>
        <input className="add-lesson__field" type="text" name="date" placeholder="date"/>
        <input className="add-lesson__field" type="text" name="timeStart" placeholder="starting time"/>
        <input className="add-lesson__field" type="text" name="timeEnd" placeholder="ending time"/>
        <select>
            <option className="add-lesson__field" value="teamName">{teamName}</option>
        </select> 
        <select>
            <option className="add-lesson__field" value="teamActivity">{teamActivity}</option>
        </select> 
        <button className="add-lesson__button">Submit</button>
    </form>
    <h2 className="add-lesson__goback"><a href="/" onClick={event => {
            event.preventDefault()

            onBack()

    }}>Go Back</a></h2>

        {error && <Feedback message={error} />}
</section>    

}
