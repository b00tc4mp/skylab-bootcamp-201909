import Login from '../components/Login'
import Register from '../components/Register'
import MyUser from '../components/MyUser'
import User from '../components/User'
import UpdateUser from '../components/UpdateUser'
import MyGame from '../components/MyGame'
import Game from '../components/Game'
import NewGame from '../components/NewGame'
import UpdateGame from '../components/UpdateGame'
import Landing from '../components/Landing'

const  checkIfRelative =(s)=> {
if(s.indexOf('/') !== s.lastIndexOf('/')) return true
return false
}
export default function getRoute(route) {
    const isRelativeRoute = checkIfRelative(route)
    if (isRelativeRoute) {
        if (route.includes('mygame'))
            return MyGame;
        if (route.includes('updategame'))
            return UpdateGame; 
        if (route.includes('updateuser'))
            return UpdateUser; 
    }

    switch (route) {
        case '/login':
            return Login;
        case '/register':
            return Register;
        case '/myuser':
            return MyUser;
        case '/user':
            return User;
        case '/game':
            return Game;
        case '/newgame':
            return NewGame;
        default:
            return Landing
    }
}

