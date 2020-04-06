import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper/index';

const SignIn = () => {
    const [values, setValues] = useState({
        email: "saurabh@gmail.com",
        password: "123456789",
        error: "",
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;
    const { token, user } = isAuthenticated();

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            error: false,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        setValues({ ...values, error: false, loading: true });
        signin({ email: email, password: password })
            .then(data => {
                if (data.error) {
                    setValues({ name: '', email: '', password: '', error: '', error: data.error })
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, didRedirect: true })
                    })      //authenticate sets value of user  in localstorage
                }
            })
            .catch(err => console.log(err))
        e.preventDefault();
    }

    const performRedirect = () => {

        if (didRedirect) {
            // if Admin
            if (user && user.role === 0) {
                return (<Redirect to="/admin/dashboard" />)
            } else {
                return (<Redirect to="/user/dashboard" />)
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errormessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger alert-dismissible fade show" style={{ display: error ? "block" : "none" }}>
                        {error}
                    </div>
                </div>
            </div>
        )

    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="email" className="text-light">Email</label>
                            <input value={email} className="form-control" type="email" name="email" id="email" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-light">Password</label>
                            <input value={password} className="form-control" type="password" name="password" id="password" onChange={handleChange} />
                        </div>
                        <button className="btn btn-success btn-block" onClick={handleSubmit}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign In" description="A page for user for Sign In">
            {loadingMessage()}
            {errormessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    );
}

export default SignIn;