import React, { useState, useEffect } from 'react';
import '../styles.css'
import { API } from '../backend';
import Base from './Base';
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    // console.log(data);
                    setProducts(data)
                }
            })
            .catch()
    }

    useEffect(() => {
        loadAllProduct();
    }, [])

    return (
        <Base title="Home Page" description="Welcome to the SB Cart">
            <div className="row text-center">
                <h1 className="text-white">All of T-shirt</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-md-4 col-sm-6 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}

export default Home;
