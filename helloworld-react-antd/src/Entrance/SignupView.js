import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Dialog from '../Shared/Dialog';
import * as PropTypes from '../common/proptypes';
import {
  Form, Icon, Input, Button, Upload
} from 'antd';
import { STYLE } from '../common/styles';
import { $signup } from '../Auth/state';
const withStore = connect((state) => ({}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class SignupView extends Component {

  state = {
    email: '',
    password: '',
    imageUrl : '',
    error: {
      email: null,
      password: null,
    },
  };
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleFileChange(info) {
    this.setState({
      imageUrl: info.file.originFileObj ,
    });
  }
 signup() {
    const { dispatch } = this.props;
    const newFormData = new FormData();
    newFormData.append('email', this.state.email);
    newFormData.append('password', this.state.password);
    newFormData.append('imageUrl', this.state.imageUrl);
    dispatch($signup(newFormData)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }
  render() {
    const { email, password, error, imageUrl } = this.state;
    return  <Form>
    <Form.Item>
      <Input
        name="email"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="email"
        defaultValue={email}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="password"
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="password"
        placeholder="Password"
        defaultValue={password}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Upload
          name="imageUrl"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={(e) =>this.handleFileChange(e)}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div className="ant-upload-text">Logo</div>}
        </Upload>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={() => this.signup()}>
        Sign Up
      </Button>
    </Form.Item>
  </Form>
  }
}
SignupView.propTypes = propTypes;
export default Wrapper(SignupView);
