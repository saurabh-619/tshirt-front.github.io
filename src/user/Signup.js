import React, { useState } from 'react';
import Base from '../core/Base';
// import { Link } from 'react-router-dom';
import signin, { signout, signup } from '../auth/helper/index';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            error: false,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        setValues({ ...values, error: false });
        signup(values)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
                }
            })
            .catch(err => console.log(err))
        e.preventDefault();
    }


    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="name" className="text-light">Name</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={values.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="text-light">Email</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={handleChange} value={values.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-light">Password</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={handleChange} value={values.password} />
                        </div>
                        <button className="btn btn-success btn-block" onClick={handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success alert-dismissible fade show" style={{ display: values.success ? "block" : "none" }}>
                        New account was created successfully. Please <Link to='/signin'>Login here</Link>
                    </div>
                </div>
            </div>
        )
    }

    const erroressage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger alert-dismissible fade show" style={{ display: values.error ? "block" : "none" }}>
                        {values.error}
                    </div>
                </div>
            </div>
        )

    }
    return (
        <Base title="Sign Up" description="A page for user for Sign Up">
            {successMessage()}
            {erroressage()}
            {signUpForm()}
        </Base>
    );
}

export default SignUp;