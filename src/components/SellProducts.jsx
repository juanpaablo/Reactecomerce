import { useState, useEffect } from "react";
import axios from "axios";

function SellProduct() {
  const [list, setlist] = useState([]);
  const [product, setproduct] = useState({
    producto_id: "",
    producto_name: "",
    producto_price: "",
    producto_origen: "",
    producto_categoria: "",
    producto_stock: "",
  });
  const [sellquantity, setsellquantity] = useState("")

  const url = "http://localhost:4555/api/productos";
//hago que lo que esta almacenado en url pase al gestlist
  const getlist = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("error fetching data ", error);
    }
  };
  //este useeffect sirve para asignar el valor de getlist en setlist que es un state
  useEffect(() => {
    getlist().then((data) => setlist(data));
  }, []);
//este handleselect sirve para buscar los productos de list y asignarlos al state product
  const handleselect = (e) => {
    const select = list.find((producto) => producto.producto_name === e.target.value);
    setproduct({
      producto_id: select.producto_id,
      producto_name: select.producto_name,
      producto_categoria: select.producto_categoria,
      producto_origen: select.producto_origen,
      producto_price: select.producto_price,
      producto_stock: select.producto_stock,
    });
    return console.log(select);
  };
//copio lo que tengo en product y despues le digo que sustituya los datos por los nuevos que estaran en el input
  const handlechange = (e) => {
    setproduct({ ...product, [e.target.id]: e.target.value });
  };
  const handlesell = (e) => {
    e.preventDefault()
    //asigno el valor del state sellquantitiy a la variable sellquantity value y lo parseo
    const sellquantityvalue=parseInt(sellquantity,10)
    //esto es para comprobar que no ponga un numero mayor al que hay de stock
    if (sellquantityvalue>0 && sellquantityvalue <= product.producto_stock){
      setsellquantity("")
      //asigno el nuevo valor del stock despues de la venta, cambiando el state original product
      setproduct({
        ...product,
        producto_stock:product.producto_stock-sellquantityvalue
      })
      alert(`la venta de ${product.producto_name} se hizo correctamente`)
    }else{
      alert("la cantidad supera el stock")
    }
  };

  const edit = async (e) => {
    e.preventDefault();
    const res = await axios.put(url + '/' + product.producto_id, product);
    if (res.status === 200) {
      alert('atraccion editada');
      window.location.reload();
    } else if (res.status === 404) {
      alert("para poder editar necesita seleccionar una atraccion");
    }
  };
  console.log(sellquantity)

  return (
    <div className='input'>
      <select className='select' onChange={handleselect}>
        {list.map((producto) => (
          <option key={producto.producto_id}>{producto.producto_name}</option>
        ))}
      </select>

      <form onSubmit={edit}>
        <br></br>
        <label>name: </label>
        <input
          value={product.producto_name}
          type='text'
          name='producto_name'
          id='producto_name'
          onChange={handlechange}
        ></input>
        <br></br>
        <label>direccion: </label>
        <input
          value={product.producto_categoria}
          type='text'
          name='producto_categoria'
          id='producto_categoria'
          onChange={handlechange}
        ></input>
        <br></br>
        <label>imagen: </label>
        <input
          value={product.producto_origen}
          type='text'
          name='producto_origen'
          id='producto_origen'
          onChange={handlechange}
        ></input>
        <br></br>
        <label>stock: </label>
        <input
          value={product.producto_stock}
          type='text'
          name='producto_stock'
          id='producto_stock'
          onChange={handlechange}
        ></input>
        <br></br>
        <br></br>
        <button type='submit'>EDIT</button>
        <input
        value={sellquantity}
        onChange={(e)=>setsellquantity(e.target.value)}
          type='text'
          name='producto_sell'
          id='producto_sell'
        ></input>
        <button type="button" onClick={handlesell} > Vender </button>
      </form>
    </div>
  );
}

export default SellProduct;
