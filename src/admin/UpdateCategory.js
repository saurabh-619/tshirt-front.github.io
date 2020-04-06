import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { updatecategory } from './helper/adminapicall';
import Base from './../core/Base';


const UpdateCategory = ({ match: { params } }) => {
    const categoryId = params.categoryId;

    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, token } = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
                    Admin Home
                </Link>
            </div>
        );
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setError("");
        setCategory(value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        let name = category;
        updatecategory(user._id, categoryId, token, { name })  //since we are calling json.stringify on this we need to pass object
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess(true);
                    setError("");
                    setCategory("");
                }
            })
            .catch(err => console.log(err))

    }

    const successMessage = () => {
        if (success) {
            return <h6 className="text-success">Category Updation successfully</h6>
        }
    }

    const errormessage = () => {
        if (error) {
            return <h6 className="text-danger">Category Updation failed</h6>
        }

    }

    const myCategoryForm = () => {
        return (
            <form action="">
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input
                        type="text"
                        className="form-control my-3"
                        name="category"
                        onChange={handleChange}
                        value={category}
                        autoFocus
                        required
                        placeholder="For ex. Summer"
                    />
                    <button className="btn btn-outline-info" onClick={handleClick}>Update category</button>
                </div>
            </form>
        );
    };

    return (
        <Base
            title="Create a category"
            description="Add a new category for new T-shirts"
            className="container p-4 bg-info"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {errormessage()}
                    {successMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategory;