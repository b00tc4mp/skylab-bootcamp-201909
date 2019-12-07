import Login from '../components/Login'
import Register from '../components/Register'
import MyUser from '../components/MyUser'
import User from '../components/User'
import UpdateUser from '../components/UpdateUser'
import UpdateUserImage from '../components/UpdateUserImage'
import MyGame from '../components/MyGame'
import Game from '../components/Game'
import NewGame from '../components/NewGame'
import UpdateGame from '../components/UpdateGame'
import UpdateGameImage from '../components/UpdateGameImage'
import Landing from '../components/Landing'

const checkIfRelative = (s) => {
    if (s.indexOf('/') !== s.lastIndexOf('/')) return true
    return false
}
export default function getRoute(route) {
    const isRelativeRoute = checkIfRelative(route)
    if (isRelativeRoute) {
        if (route.includes('usergame'))
            return Game;
        if (route.includes('mygame'))
            return MyGame;
        if (route.includes('updategame'))
            return UpdateGame;
        if (route.includes('updateimggame'))
            return UpdateGameImage;
        if (route.includes('updateuser'))
            return UpdateUser;
        if (route.includes('updateimguser'))
            return UpdateUserImage;
        if (route.includes('userinfo'))
            return User;
    }

    switch (route) {
        case '/login':
            return Login;
        case '/register':
            return Register;
        case '/myuser':
            return MyUser;
        case '/newgame':
            return NewGame;
        default:
            return Landing
    }
}

