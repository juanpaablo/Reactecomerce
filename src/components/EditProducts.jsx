import axios from "axios";
import { useState, useEffect } from "react";

function EditProduct (){
const [listproductos, setlistproductos] = useState([])
const [producto, setproducto]= useState({
    producto_id: "",
    producto_name: "",
    producto_price: "",
    producto_origen: "",
    producto_categoria: "",
    producto_stock: "",
})
const url = "http://localhost:4555/api/productos"
//obtengo los datos de url y los guardos en setlistproductos
const fetchdata= async ()=>{
try {
    const response= await axios.get(url)
    setlistproductos(response.data)
} catch (error) {
    console.error("error fetching data", error )
}
}
//utilizo el useeffect para ejecutar la funcion fetchdata constantemente
useEffect(() =>{
    fetchdata();
} ,[])
const handleSelect =(e) =>{
const SelectedProduct= listproductos.find((producto) => producto.producto_name === e.target.value )
setproducto(SelectedProduct)
}
const HandleEdit = async(e) =>{
  e.preventdefault()
  try {
    const res= await axios.put(url + "/" + producto.producto_id)
    if(res.status===200) {
        alert("el producto se edito exitosamente")
    }else Error
  } catch (error) {
    alert("error al editar el producto")
    
  }
}
}

export default EditProduct