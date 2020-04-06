import React, { useState, useEffect } from 'react';
import '../styles.css'
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './StripeCheckout';
import PaymentBTree from './PaymentBTree';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    const preLoad = () => {
        const items = loadCart();
        setProducts(items);
    }

    useEffect(() => {
        preLoad();
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                {
                    products.map((product, index) => {
                        return (
                            <Card
                                key={index}
                                product={product}
                                addToCard={false}
                                removeFromCart={true}
                                reload={reload}
                                setReload={setReload}
                            />
                        )
                    })}
            </div>
        )
    }
    const loadCheckOut = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }


    return (
        <Base title="Cart Page" description="Ready to Checkout">
            <div className="row text-center">
                <div className="col-6">{(typeof products !== undefined && products.length > 0) ? (loadAllProducts(products)) : (<h4>No products</h4>)}                </div>
                <div className="col-6">
                    {/* <StripeCheckout products={products} reload={reload} setReload={setReload} /> */}
                    <PaymentBTree products={products} reload={reload} setReload={setReload}></PaymentBTree>
                </div>
            </div>
        </Base>
    );
}

export default Cart;
