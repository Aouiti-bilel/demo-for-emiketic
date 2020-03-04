import React, { useEffect, useState,  Fragment } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../../../common/proptypes';
import { STYLE } from '../../../common/styles';
import  { Card, Col, Row, Button, Icon } from  'antd';
import { API_ENDPOINT } from '../../../common/config';
import LandingView from '../../../Entrance/LandingView';
import { $getProduct, $addLike, $removeLike } from '../../state'
import { Link } from 'react-router-dom';

const withStore = connect((state) => ({
    processing: state.Activity.processing,
    product: state.Home.product
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

const ProductDetails = ({ product, processing, dispatch, match }) => {
 
    const[show, hide]= useState(false)
    //ADD Like //Unlike 
    //ADD Comment 
    //
 useEffect(()=>{
     dispatch($getProduct(match.params.id))
 }, [])
    return processing || product === null? (<LandingView/>
      ):(
       <Fragment>
            <Button style={{ backgroundColor: 'black', marginBottom: '10px'}}> <Link to='/home' style={{ color: 'white'}}>Go Back</Link></Button>  
           <Row style={{justifyContent: 'space-around', flexDirection: 'column'}}>
               
               <Col><img src={API_ENDPOINT + '/' + product.imageUrl}/></Col>
               <Col>Name         :        {product.name}               </Col>
               <Col>Size         :        {product.size}               </Col>
               <Col>Price        :        {product.price}              </Col>
               <Col>Category     :        {product.category}           </Col>
               <Col>Description  :        {product.description}        </Col>

               <Button onClick={()=>dispatch($addLike(product._id))}>Like</Button>
                  <span>{product.likes.length>0&& <h1>{product.likes.length}</h1> }</span>
               <Button onClick={()=>dispatch($removeLike(product._id))}>UnLike</Button>
               <Button onClick={()=>hide(!show)}>Comments: </Button> 
                 {show&&product.comments.length>0&& product.comments.map(comment => comment.text)}
           </Row>
       </Fragment>
      );
  
}

ProductDetails.propTypes = propTypes;

export default Wrapper(ProductDetails);
