import { useState, useEffect } from "react";
import axios from "axios";

function SellProduct ()  {
const [product, setproduct] =useState(null)
const [newproduct, setnewproduct] = useState (null)
const url= "http://localhost:4555/api/productos";

const getlist = async () =>{
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error("error fetching data ", error )
        
    }
}
useEffect(() =>  {
getlist().then((data)=>
setproduct(data)
)

}, [] )
console.log(product)
return(
    <div className="container">
      <form >
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            className="input"
            placeholder="Insert the name of the product"
            type="text"
            name="producto_name" // Corrected the name attribute
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
)
}

export default SellProduct