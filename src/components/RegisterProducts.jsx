import React, { useState } from "react";
import axios from "axios";

function RegisterProducto() {
  const url = "http://localhost:4555/api/productos";
  const [NewProducto, setNewProducto] = useState({
    producto_name: "",
    producto_origen: "",
    producto_stock: "",
    producto_categoria:"", // Corrected the typo in the state variable name
    producto_vencimiento:""
  });

  const handleChange = (e) => {
    setNewProducto({
      ...NewProducto,
      [e.target.name]: e.target.value,
    });
  };

  const addProducto = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const productoAgregar = {
      ...NewProducto,
    };

    try {
      const response = await axios.post(url, productoAgregar);
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        alert(NewProducto.producto_name + " se agregó correctamente"); // Corrected the concatenation
        window.location.reload()
      } else {
        alert("Error al agregar");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al agregar");
    }
  };
  console.log(NewProducto)
  return (
    <div className="container">
      <form onSubmit={addProducto}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            className="input"
            placeholder="Insert the name of the attraction"
            type="text"
            name="producto_name" // Corrected the name attribute
            onChange={handleChange}
            value={NewProducto.producto_name}
          />
        </div>
        <div className="form-group">
          <label className="label">Producto origen:</label>
          <input
            className="input"
            placeholder="Insert producto origen"
            type="text"
            name="producto_origen"
            onChange={handleChange}
            value={NewProducto.producto_origen}
            id="producto_origen"
          />
        </div>
        <div className="form-group">
          <label className="label">Product stock:</label>
          <input
            className="input"
            placeholder="Insert product stock"
            type="text"
            name="producto_stock"
            value={NewProducto.producto_stock}
            onChange={handleChange}
            id="producto_stock"
          />
        </div>
        <div className="form-group">
          <label className="label">Producto categoria:</label>
          <input
            className="input"
            placeholder="Insert producto categoria"
            type="text"
            name="producto_categoria"
            value={NewProducto.producto_categoria}
            onChange={handleChange}
            id="producto_categoria"
          />
        </div>
        <div className="form-group">
          <label className="label">Producto vencimiento:</label>
          <input
            className="input"
            placeholder="Insert producto categoria"
            type="date"
            name="producto_vencimiento"
            value={NewProducto.producto_vencimiento}
            onChange={handleChange}
            id="producto_vencimiento"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterProducto;
