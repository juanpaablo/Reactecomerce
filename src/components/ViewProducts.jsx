import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewProduct() {
  const url = "http://localhost:4555/api/productos";

  const getlist = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    getlist().then((data) => {
      setList(data);
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const content = list.map((card) => (
    <div className="container" key={card.producto_id}>
      <h3>{card.producto_name}</h3>
      <h2>{card.producto_origen}</h2>
      <h1>{card.producto_categoria}</h1>
    </div>
  ));

  return <>{content}</>; // Return the JSX content in the component
}

export default ViewProduct;
