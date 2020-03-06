import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as PropTypes from '../../../common/proptypes';
import { STYLE } from '../../../common/styles';
import  { Card, Col, Row, Button } from  'antd';
import { API_ENDPOINT } from '../../../common/config';
import LandingView from '../../../Entrance/LandingView';
import ProductItem from './ProductItem';

const withStore = connect((state) => ({
    processing: state.Activity.processing,
    products: state.Home.products,
    user: state.Auth.user,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);
const   ProductList = ({ products, user}) =>  {

    return products.filter(product => product.user === user.id).length===0 ? (
        <h1>there is No Produc For You</h1>
         // <Redirect to='/company'/>
       ):(
         <div>
             <h2>All Products</h2>
           <table>
            <thead>
             <tr>
              <th>ID</th>
               <th>Name</th>
               <th>Category</th>
               <th>Size</th>
               <th>Quantity</th>
               <th>Price</th> 
               <th>Likes</th> 
              <th>Description</th>
              <th> Image</th>
              <th style={{ backgroundColor:'red', color: 'black'}}> Delete</th>
             </tr>
            </thead>
           { 
               products
               .filter(product => product.user === user.id)
               .map(product => <ProductItem key={product._id} product={product}/>)
           }
           </table>
           </div>
       )
}

ProductList.propTypes = propTypes;

export default Wrapper(ProductList);
