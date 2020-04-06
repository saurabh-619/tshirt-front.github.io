import { API } from "../../backend";

const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}


export { getAllProducts };