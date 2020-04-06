const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        if (cart.some(product => product._id === item._id)) {

        } else {
            cart.push({
                ...item,
                count: 1
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    next();
}


const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
}


const removeItemFromCart = (productId) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            const newCart = cart.filter((item, index) => {
                return item._id !== productId
            })
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }
}

const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');
        let cart = [];
        localStorage.setItem('cart', JSON.stringify(cart))
        next(); //runs the callback function
    }
}
export { addItemToCart, loadCart, removeItemFromCart, cartEmpty };