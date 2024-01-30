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
//este obtiene los datos de listproductos
const handleSelect =(e) =>{
const SelectedProduct= listproductos.find((producto) => producto.producto_name === e.target.value )
setproducto(SelectedProduct)
}
//este actualizara el valor de la base de datos
const HandleEdit = async(e) =>{
  e.preventDefault()
  try {
    const res= await axios.put(url + "/" + producto.producto_id, producto)
    if(res.status===200) {
        alert("el producto se edito exitosamente")
    }else Error
  } catch (error) {
    alert("error al editar el producto")
    
  }
}
//este actualizara el estado de producto por el nuevo valor que le coloque al input
const handlechange = (e) =>{
  setproducto({
    ...producto,
    [e.target.name]:e.target.value,
  })
}

return (
  <div className='input'>
    <select className='select' onChange={handleSelect}>
      {listproductos.map((producto) => (
        <option key={producto.producto_id}>{producto.producto_name}</option>
      ))}
    </select>

    <form onSubmit={HandleEdit}>
      <br></br>
      <label>Nombre: </label>
      <input
        value={producto.producto_name}
        type='text'
        name='producto_name'
        id='producto_name'
        onChange={handlechange}
      ></input>
      <br></br>
      <label>Categoría: </label>
      <input
        value={producto.producto_categoria}
        type='text'
        name='producto_categoria'
        id='producto_categoria'
        onChange={handlechange}
      ></input>
      <br></br>
      <label>Origen: </label>
      <input
        value={producto.producto_origen}
        type='text'
        name='producto_origen'
        id='producto_origen'
        onChange={handlechange}
      ></input>
      <br></br>
      <label>Stock: </label>
      <input
      className="input"
        value={producto.producto_stock}
        type='text'
        name='producto_stock'
        id='producto_stock'
        onChange={handlechange}
      ></input>
      <br></br>
      <br></br>
      <button type="submit" > editar </button>
    </form>
    
  </div>
);

}

export default EditProduct