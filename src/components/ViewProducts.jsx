import { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap"; // Corrige la importación
import "../css/viewproduct.css";

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
  const [deleteproduct, setdeleteproduct] = useState(null);

  useEffect(() => {
    getlist().then((data) => {
      setList(data);
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts


  const content = list.map((card) => (
    <div className="container" key={card.producto_id}>
      <div className="listado">
        <ListGroup horizontal className="listado">
          <ListGroup.Item>{card.producto_name}</ListGroup.Item>
          <ListGroup.Item>{card.producto_categoria}</ListGroup.Item>
          <ListGroup.Item>{card.producto_origen}</ListGroup.Item>
          <ListGroup.Item>{card.producto_price}</ListGroup.Item>
          <ListGroup.Item>{card.producto_stock}</ListGroup.Item>
          <ListGroupItem>
            <button
              className="simple"
              aria-label="borrar"
              onClick={() => {
                axios
                  .delete(url + "/" + card.producto_id)
                  .then((response) => {
                    if (response.status === 200) {
                      // Eliminar el elemento localmente en lugar de recargar la página
                      const updatedList = list.filter(
                        (item) => item.producto_id !== card.producto_id
                      );
                      setList(updatedList);
  
                      alert(card.producto_name + " se borró exitosamente");
                    }
                  })
                  .catch((error) => {
                    console.error("Error deleting item:", error);
                    alert("Error al borrar el elemento");
                  });
              }}
            >
              Borrar
            </button>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  ));

  return <>{content}</>; // Return the JSX content in the component
}

export default ViewProduct;
