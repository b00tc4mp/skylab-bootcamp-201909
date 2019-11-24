import Login from '../components/Login'
import User from '../components/User'
import Landing from '../components/Landing'
import Register from '../components/Register'

export default function getRoute (route){
    switch (route) {
        case '/user':
            return User;
        case '/login':
            return Login;
        case '/register':
            return Register;
        default:
            return Landing
    }
}

