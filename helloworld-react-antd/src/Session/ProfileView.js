import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';

import * as Dialog from '../Shared/Dialog';

import { $fetchProfile } from '../Auth/state';
import CreateProfile from './components/profile/CreateProfile';
import LandingView from '../Entrance/LandingView';
import ProductList from './components/product/ProductList';
import { API_ENDPOINT } from '../common/config';

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

class ProfileView extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch($fetchProfile()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }

  render() {
    const { user, processing, profile } = this.props;

    return processing? <LandingView/> :  !profile  ? <CreateProfile/> :
    (
     <div>
       <h1>{profile.name}</h1>
       <img src={API_ENDPOINT + '/' + profile.imageUrl} whidth= '50px' height="50px"/>
       {// TODO ADD PRoduct}
       }
      <ProductList/>
        </div>
    )
  }
}

ProfileView.propTypes = propTypes;

export default Wrapper(ProfileView);
