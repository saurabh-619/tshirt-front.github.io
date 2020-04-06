import React, { useState, useEffect } from "react";
import Base from "./../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, getProduct, updateproduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match: { params } }) => {
    const productId = params.productId;
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        updatedProduct: false,
        getRedirext: false,
        formData: "",
    });

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        updatedProduct,
        getRedirect,
        formData,
    } = values;

    const preLoad = (productId) => {
        getProduct(productId)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values, name: data.name, description: data.description, price: data.price, category: data.category._id, stock: data.stock, formData: new FormData(),
                    });
                    preLoadCategories()
                }
            })
            .catch(err => console.log(err))

    };

    const preLoadCategories = () => {
        getAllCategories().then((data) => {
            if (data.error) {
                setValues({ error: data.error });
            } else {
                setValues({ categories: data, formData: new FormData() });
            }
        });
    }

    useEffect(() => {
        preLoad(productId);
    }, []);

    const successMessage = () => {
        return (
            <div
                className="alert alert-success mt-3"
                style={{ display: updatedProduct ? "block" : "none" }}
            >
                {updatedProduct} Updated Successfully
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="alert alert-danger mt-3"
                style={{ display: error ? "block" : "none" }}
            >
                {error}
            </div>
        );
    };

    const handleChange = (name) => (e) => {
        const value = name === "photo" ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateproduct(productId, user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    console.log(data);
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        photo: "",
                        loading: false,
                        error: "",
                        updatedProduct: data.name,
                        getRedirect: true,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => {
                            return (
                                <option key={index} value={cate._id}>
                                    {cate.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={handleClick}
                className="btn btn-outline-success mb-3"
            >
                Update Product
      </button>
        </form>
    );
    return (
        <Base
            title="Add a product"
            description="Welcome to the Product creation section"
            className="text-white bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
      </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
