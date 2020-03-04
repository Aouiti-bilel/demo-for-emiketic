import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as PropTypes from '../../../common/proptypes';
import { STYLE } from '../../../common/styles';
import  { Card, Col, Row, Button } from  'antd';
import { API_ENDPOINT } from '../../../common/config';
import LandingView from '../../../Entrance/LandingView';

const withStore = connect((state) => ({
    processing: state.Activity.processing,
    products: state.Home.products
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class ProfilesItem extends Component {

  render() {
    const { processing, products, profile: { user, name, imageUrl }, dispatch} = this.props
    return processing || products.length < 0? (<LandingView/>
      ):( 
          <div>
                 <Row style={{ color: 'black', fontSize: '18', display: 'flex', backgroundColor: 'lightgrey', alignItems: 'center', margin: '10px'}}>
                     <Col><img src={API_ENDPOINT + '/' + imageUrl} alt={name} width='40px' height='40'/></Col>
                     <Col style={{paddingLeft: '10px'}}>{name.charAt(0).toUpperCase() + name.slice(1)}</Col>
                  </Row>
            {
                products
                .filter((item) => item.user === user) 
                .filter((item, index) => index<3) 
                .map(product =>
                <Col span={8}> 
                    <Card title={product.name} bordered={true}>
                       <img src={API_ENDPOINT + '/' + product.imageUrl}/> 
                          <div style={{margin: '10px', color: 'black', padding: '10px', justifyContent: 'space-between', display: 'flex'}}>
                            <span > Price <div style={{color: 'red'}}>{product.price} $</div></span> 
                            <span> Size  <div style={{color: 'green'}}>{product.size}</div></span> 
                            {product.likes.length > 0 && <span>Likes <div style={{color: 'blue'}}>{product.likes.length }</div></span>}
                          </div>
                       <Button style={{ felx: 1 ,width: '100%', backgroundColor: 'black'}}>  <Link  to={`/product/${product._id}`}style={{ color: 'white'}} > More Details</Link></Button> 
                    </Card>
                </Col>)
            } 
          </div>
       
          
      );
  }
}

ProfilesItem.propTypes = propTypes;

export default Wrapper(ProfilesItem);
