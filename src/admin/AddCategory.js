import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { cretecategory } from "./helper/adminapicall";


const AddCategory = () => {
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

        let name = category
        cretecategory(user._id, token, { name })  //since we are calling json.stringify on this we need to pass object
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
            return <h6 className="text-success">Category created successfully</h6>
        }
    }

    const errormessage = () => {
        if (error) {
            return <h6 className="text-danger">Category creation failed</h6>
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
                    <button className="btn btn-outline-info" onClick={handleClick}>Create category</button>
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
};

export default AddCategory;
