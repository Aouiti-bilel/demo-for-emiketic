import React from 'react'
import './ProductItem.css'
const ProductItem = ({product: { imageUrl, price, category, _id, name, description, quantity, size, likes }}) => {
    return (
  <tbody>
   
    <tr> 
      <td>  {_id}</td>
      <td>{name }</td>
      <td>{category }</td>
      <td>{size }</td>
      <td>{quantity }</td>
      <td>{price }</td>
      <td>{likes.length }</td>
      <td>{description }</td>
      <td><img src={imageUrl} alt={category} style={{ width:'50px', height: '50px'}}/></td>
     {//<td><i onClick={() => deleteProduct(_id)} className="far fa-trash-alt"></i></td>
     }
      </tr>
  </tbody> 
    )
}
export default ProductItem