import React, {useState} from "react";
import axios from "axios";

function RegisterProducto () {
const url= "http://localhost:4555/api/productos"
const [NewProducto, Producto] = useState({
    producto_name:"",
    Producto_origen:"",
    productp_stock:""
})
const addproducto = async (e) =>{
    const productoagregar={
        ...NewProducto
    }
    const response = await axios.post(url,productoagregar)
}
}

export default RegisterProducto