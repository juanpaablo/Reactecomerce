import { useState, useEffect } from "react";
import axios from "axios";

function SellProduct() {
  const [list, setList] = useState([]);
  const [product, setProduct] = useState({
    producto_id: "",
    producto_name: "",
    producto_price: "",
    producto_origen: "",
    producto_categoria: "",
    producto_stock: "",
  });
  const [sellquantity, setSellQuantity] = useState("");

  const url = "http://localhost:4555/api/productos";

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setList(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelect = (e) => {
    const selectedProduct = list.find((producto) => producto.producto_name === e.target.value);
    setProduct(selectedProduct);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSell = async (e) => {
    e.preventDefault();

    const sellQuantityValue = parseInt(sellquantity, 10);

    if (sellQuantityValue > 0 && sellQuantityValue <= product.producto_stock) {
      const updatedStock = product.producto_stock - sellQuantityValue;

      setProduct({
        ...product,
        producto_stock: updatedStock,
      });

      await handleEdit();

      alert(`La venta de ${product.producto_name} se realizó correctamente`);
    } else {
      alert("La cantidad supera el stock");
    }
  };

  const handleEdit = async () => {
    try {
      const updatedProduct = {
        ...product,
      };

      console.log("Datos enviados al servidor:", updatedProduct);

      const res = await axios.put(url + '/' + product.producto_id, updatedProduct);

      console.log("Respuesta del servidor:", res);

      if (res.status === 200) {
        alert('Producto editado');
        fetchData(); // Actualizar la lista solo si la edición es exitosa
      } else if (res.status === 404) {
        alert("Para poder editar, necesita seleccionar un producto");
        console.log(updatedProduct);
      }
    } catch (error) {
      console.error("Error editing product", error);
      alert("Error al editar el producto");
    }
  };

  return (
    <div className='input'>
      <select className='select' onChange={handleSelect}>
        {list.map((producto) => (
          <option key={producto.producto_id}>{producto.producto_name}</option>
        ))}
      </select>

      <form onSubmit={handleSell}>
        <br></br>
        <label>Nombre: </label>
        <input
          value={product.producto_name}
          type='text'
          name='producto_name'
          id='producto_name'
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Categoría: </label>
        <input
          value={product.producto_categoria}
          type='text'
          name='producto_categoria'
          id='producto_categoria'
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Origen: </label>
        <input
          value={product.producto_origen}
          type='text'
          name='producto_origen'
          id='producto_origen'
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Stock: </label>
        <input
          value={product.producto_stock}
          type='text'
          name='producto_stock'
          id='producto_stock'
          onChange={handleChange}
        ></input>
        <br></br>
        <br></br>
        <button type='button' onClick={handleEdit}>EDITAR</button>
        <input
          value={sellquantity}
          onChange={(e) => setSellQuantity(e.target.value)}
          type='text'
          name='producto_sell'
          id='producto_sell'
        ></input>
        <button type="submit">Vender</button>
      </form>
    </div>
  );
}

export default SellProduct;







