import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PropTypes from '../common/proptypes';
import * as Dialog from '../Shared/Dialog';
import { STYLE } from '../common/styles';
import LandingView from '../Entrance/LandingView';
import { $fetchProfilesAndProducts } from './state';
import ProfilesItem from './components/profile/ProfilesItem';
import  { Card, Col, Row } from  'antd';
const withStore = connect((state) => ({
    processing: state.Activity.processing,
    profiles: state.Home.profiles,
}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class HomeView extends Component {
  componentDidMount(){
    const { dispatch } = this.props
    dispatch($fetchProfilesAndProducts()).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
   
  }

  render() {
    const { processing, profiles} = this.props
    return processing || profiles.length < 0? (<h1>keep wait You Must Be Patient To Be with us :p</h1>
      ):(
        <div className="site-card-wrapper">
           {
              profiles
              .map(profile=>  <Row gutter={16}> <ProfilesItem profile={profile}/></Row>)
            
           } 
       </div>       
      )
  }
}

HomeView.propTypes = propTypes;

export default Wrapper(HomeView);
