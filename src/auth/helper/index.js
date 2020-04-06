import { API } from '../../backend';


const signup = user => {
    return fetch(`${API}/signup`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();  //calls callback function
    }
}

const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))

    }
}

const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}

export { signin, signout, signup, isAuthenticated, authenticate };