import Login from '../components/Login'
import Register from '../components/Register'
import MyUser from '../components/MyUser'
import User from '../components/User'
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
        default:
            return Landing
    }
}

