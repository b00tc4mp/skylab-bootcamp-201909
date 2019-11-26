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

export default function getRoute(route) {
    switch (route) {
        case '/login':
            return Login;
        case '/register':
            return Register;
        case '/myuser':
            return MyUser;
        case '/user':
            return User;
        case '/updateuser':
            return UpdateUser;
        case '/mygame':
            return MyGame;
        case '/game':
            return Game;
        case '/newgame':
            return NewGame;
        case '/updategame':
            return UpdateGame;
        default:
            return Landing
    }
}

