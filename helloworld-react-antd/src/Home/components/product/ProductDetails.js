import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../../../common/proptypes';
import { STYLE } from '../../../common/styles';
import  { Card, Col, Row, Button } from  'antd';
import { API_ENDPOINT } from '../../../common/config';
import LandingView from '../../../Entrance/LandingView';
import { $getProduct } from '../../state'
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
 useEffect(()=>{
     dispatch($getProduct(match.params.id))
 }, [])
    return processing || product === null? (<LandingView/>
      ):(
       <Fragment>
           <Row>
               <Col><img src={API_ENDPOINT + '/' + product.imageUrl}/> </Col>
               <Col>{product.description}</Col>
           </Row>
       </Fragment>
      );
  
}

ProductDetails.propTypes = propTypes;

export default Wrapper(ProductDetails);
