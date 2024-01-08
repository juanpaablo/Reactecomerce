import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import "../css/viewproduct.css"

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
      <div className="listado">
        {/* Utiliza la clase 'd-flex' para mostrar la lista horizontalmente */}
        <ListGroup horizontal className="listado">
          <ListGroup.Item>{card.producto_name}</ListGroup.Item>
          <ListGroup.Item>{card.producto_categoria}</ListGroup.Item>
          <ListGroup.Item>{card.producto_origen}</ListGroup.Item>
          <ListGroup.Item>{card.producto_price}</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  ));

  return <>{content}</>; // Return the JSX content in the component
}

export default ViewProduct;