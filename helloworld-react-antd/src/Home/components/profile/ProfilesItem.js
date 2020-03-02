import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../../../common/proptypes';

import  { Card, Col, Row } from  'antd';
import { API_ENDPOINT } from '../../../common/config';
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
    const { processing, products, profile: { user, name, imageUrl }} = this.props
    return processing || products.length < 0? (<h1>wait ...</h1>
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
                    </Card>
                </Col>)
            } 
          </div>
       
          
      );
  }
}

ProfilesItem.propTypes = propTypes;

export default Wrapper(ProfilesItem);
