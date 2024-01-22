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

  const handleSell = async (e) => {
    e.preventDefault();

    const sellQuantityValue = parseInt(sellquantity, 10);

    if (sellQuantityValue > 0 && sellQuantityValue <= product.producto_stock) {
      const updatedStock = product.producto_stock - sellQuantityValue;

      try {
        // Realizar una solicitud PUT para actualizar el stock en la base de datos
        const res = await axios.put(url + '/' + product.producto_id, {
          ...product,
          producto_stock: updatedStock,
        });

        if (res.status === 200) {
          alert(`La venta de ${product.producto_name} se realizó correctamente`);
          // Actualizar la lista después de la venta
          fetchData();
        } else {
          alert("Error al actualizar el stock en la base de datos");
        }
      } catch (error) {
        console.error("Error al actualizar el stock en la base de datos", error);
        alert("Error al actualizar el stock en la base de datos");
      }
    } else {
      alert("La cantidad supera el stock");
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
          readOnly
        ></input>
        <br></br>
        <label>Categoría: </label>
        <input
          value={product.producto_categoria}
          type='text'
          name='producto_categoria'
          id='producto_categoria'
          readOnly
        ></input>
        <br></br>
        <label>Origen: </label>
        <input
          value={product.producto_origen}
          type='text'
          name='producto_origen'
          id='producto_origen'
          readOnly
        ></input>
        <br></br>
        <label>Stock: </label>
        <input
          value={product.producto_stock}
          type='text'
          name='producto_stock'
          id='producto_stock'
          readOnly
        ></input>
        <br></br>
        <br></br>
        <input
          value={sellquantity}
          onChange={(e) => setSellQuantity(e.target.value)}
          type='text'
          name='producto_sell'
          id='producto_sell'
          placeholder='Cantidad a vender'
        ></input>
        <button type="submit">Vender</button>
      </form>
    </div>
  );
}

export default SellProduct;









