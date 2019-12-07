import React, { useState, useEffect } from 'react';
import '../../../src/template/index.sass'
import Landing from '../Landing'
import Register from '../Register'
import Login from '../Login'
import BoardAdmin from '../BoardAdmin'
import BoardClient from '../BoardClient'
import CreateTeam from '../CreateTeam'
import TeamList from '../TeamList'
import AddLesson from '../AddLesson'
import LessonList from '../LessonList'
import Feedback from '../Feedback'
import BookLesson from '../BookLesson'


import { Route, withRouter, Redirect } from 'react-router-dom'
import { authenticateUser, registerUser, retrieveUser, retrieveTeams, retrieveLessons, createTeam, addLesson, deleteLesson  } from '../../logic'

export default withRouter(function ({ history }) {
    const [name, setName] = useState()
    const [user, setUser] = useState()
    const [teams, setTeams] = useState([])
    const [lessons, setLessons] = useState([])
    //const [users, setUsers] = useState()
    //const [role, setRole] = useState()

    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const { name, user } = await retrieveUser(token)

                setName(name)

                setUser(user)

            //  COMO REDIRECCIONAR DE BOARDCLIENT O BOARDADMIN EN FUNCION DE SI ROLE 'admin' o ROLE 'client'

                //await retrieveTeams(token)

                const teams = await retrieveTeams(token)

                setTeams(teams)

                const lessons = await retrieveLessons(token)

                setLessons(lessons)
            }

        })()

    }, [sessionStorage.token])


    async function listTeams(token) {
        const teams = await retrieveTeams(token)

        setTeams(teams)

    }


    function handleGoToLogin() { history.push('/login')}
    
    function handleGoToRegister() { history.push('/register')}

    async function handleRegister(name, surname, email, username, password) {

        try {
            await registerUser(name, surname, email, username, password )

            history.push('/login')

        } catch (error) {
            console.error(error)
        }
    }

    async function handleLogin(username, password) {debugger
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            //  COMO REDIRECCIONAR DE BOARDCLIENT O BOARDADMIN EN FUNCION DE SI ROLE 'admin' o ROLE 'client'

            const user = await retrieveUser(token)
            
            setUser(user)


            user && (user.role === 'admin') && history.push('/board-admin')

            user && (user.role === 'client') && history.push('/board-client')



           //history.push('/board')
     
        } catch (error) {
            console.error(error)
        }
    }



    function handleGoToLessonList() { history.push('/lessonlist'); setLessons(lessons) 

}

    function handleGoToTeamList() { history.push('/teamlist'); setTeams(teams)
    }

    
    function handleTeamList() {}
    function handleLessonList(token) {


    }


    async function handleAddLesson(date, timeStart, timeEnd, teamName, teamActivity) {
        try {
            const token = sessionStorage.token
    
            await addLesson(token, date, timeStart, timeEnd)
    
            await retrieveLessons(token)
        } catch (error) {
            console.error(error)
        }

        //history.push('/add-lesson')
        //setLessons(lessons)
    }


    async function handleCreateTeam(teamName, teamEmail, teamPhone, teamActivity) {debugger
        try {

            const token = sessionStorage.token

            await createTeam(token, teamName, teamEmail, teamPhone, teamActivity)

            await listTeams(token)
        } catch (error) {
            console.error(error)
        }

        //history.push('/create-team')
        //setTeams(teams) 
    }

    async function handleDeleteLesson(id) {debugger
        try {

            const  token  = sessionStorage.token

            await deleteLesson(token, id)

            await retrieveLessons(token)
        } catch (error) {
            console.error(error)
        }

            

    }


    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }



    function handleBookLesson() { history.push('/book-lesson')}
    





    const { token } = sessionStorage

    return <>
        <Route exact path='/' render={() => token ? <Redirect to='/' /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
        <Route path='/register' render={() => token ? <Redirect to='/board-client' /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
        <Route path='/login' render={() => token ? <Redirect to='/login' /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
        
        <Route path='/board-admin' render={() => token /* && user.role === 'admin' *//* I ES ADMIN */ ? <BoardAdmin user={name} onTeamList={handleGoToTeamList} onLessonList={handleGoToLessonList} onBack={handleGoBack}/> : <Redirect to='/' /> } />
        <Route path='/lessonlist' render={() => token /* && user.role === 'admin' */ ? <LessonList user={name} lessons={lessons} onDeleteLesson={handleDeleteLesson} onBack={handleGoBack}/> : <Redirect to='/' />} />
        <Route path='/teamlist' render={() => token /* && user.role === 'admin' */ ? <TeamList user={name} teams={teams} onCreateTeam={handleCreateTeam} onBack={handleGoBack}/> : <Redirect to='/' />} />
        <Route path='/create-team' render={() => token ? <CreateTeam user={name} teams={teams} onCreateTeam={handleCreateTeam}/> : <Redirect to='/' /> } />
        <Route path='/add-lesson' render={() => token ? <AddLesson user={name} teams={teams} lessons={lessons} onAddLesson={handleAddLesson} /> : <Redirect to='/' /> } />
        
        <Route path='/board-client' render={() => token /* && user.role === 'client' *//* I ES CLIENT */ ? <BoardClient user={name} onBookLesson={handleBookLesson} onLessonList={handleGoToLessonList} onLogout={handleLogout} /> : <Redirect to='/' />} />
        <Route path='/book-lesson' render={() => token /* && user.role === 'client'  */? <BookLesson user={name} /> : <Redirect to='/' />  }/>

    </>
})


/* 
<Route exact path='/' render={() => token ? <Redirect to='/landing' /> : <Landing />} />
<Route path='/register' render={() => token ? <Redirect to='/board-client' /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path='/login' render={() => token ? <Redirect to='/board-client' /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path='/board-client' render={() => token  ? <BoardClient user={name}  lessons={lessons}  onBuyLesson={handleBuyLesson} onLogout={handleLogout} /> : <Redirect to='/' />} />

<Route path='/board-admin' render={() => token ? <BoardAdmin user={name} onTeamList={handleGoToTeamList} onLessonList={handleGoToLessonList} /> : <Redirect to='/' /> } />

 */



/* return <>
<Route exact path='/' render={() => token ? <Redirect to='/board' /> : <Landing onRegister={handleGoToRegister} onLogin={handleGoToLogin} />} />
<Route path='/register' render={() => token ? <Redirect to='/board' /> : <Register onRegister={handleRegister} onBack={handleGoBack} />} />
<Route path='/login' render={() => token ? <Redirect to='/board' /> : <Login onLogin={handleLogin} onBack={handleGoBack} />} />
<Route path='/board' render={() => token ? <Board user={name} tasks={tasks} onLogout={handleLogout} onChangeTaskStatus={handleChangeTaskStatus} onNewTask={handleNewTask} /> : <Redirect to='/' />} />
</> */