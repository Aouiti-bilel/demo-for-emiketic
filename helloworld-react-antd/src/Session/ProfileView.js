import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import { $fetchProfile } from '../Auth/state';
import CreateProfile from './components/profile/CreateProfile';
import LandingView from '../Entrance/LandingView';
import ProductList from './components/product/ProductList';
import { API_ENDPOINT } from '../common/config';
import AddProduct from './components/product/AddProduct';
import { Button } from 'antd';

const withStore = connect((state) => ({
  processing: state.Activity.processing,
  user: state.Auth.user,
  profile: state.Auth.profile,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
  processing: PropTypes.bool.isRequired,
  user: PropTypes.User.isRequired,
  profile: PropTypes.object.isRequired,
};

const Wrapper = (C) => withStore(C);
const styles = {
  imageCover: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' , width:' 100%',
  backgroundSize: 'cover',
  height: '350px',
  borderBottom: '1px solid black', 
 overflow: 'hidden', marginBottom: '10px',
 backgroundPosition:'center',


 }
}
class ProfileView extends Component {
  state={
    showAddProductButton: false,
    showListProductButton: false
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchProfile()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    const { user, processing, profile } = this.props;
   const {showAddProductButton, showListProductButton} = this.state
    return processing? <LandingView/> :  !profile  ? <CreateProfile/> :
    (
     <div >
       <div style={{...styles.imageCover,  backgroundImage: `url(${API_ENDPOINT+'/'+ profile.imageUrl})`}}>
     
      
         
       </div>
      
       <Button onClick={()=>this.setState({showAddProductButton: !showAddProductButton, showListProductButton: false})}> Add New Product</Button>
       <Button onClick={()=>this.setState({showListProductButton: !showListProductButton, showAddProductButton: false })}> My Products </Button>
       {showAddProductButton&&   <AddProduct/>}
       {showListProductButton&&  <ProductList/>}
     
        </div>
    )
  }
}

ProfileView.propTypes = propTypes;

export default Wrapper(ProfileView);
