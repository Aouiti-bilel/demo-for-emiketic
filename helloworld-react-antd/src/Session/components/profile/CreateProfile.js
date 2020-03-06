import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Dialog from '../../../Shared/Dialog'
import * as PropTypes from '../../../common/proptypes';
import {
  Form, Icon, Input, Button, Upload
} from 'antd';
import { $createProfile } from '../../../Auth/state';
const withStore = connect((state) => ({}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class CreateProfile extends Component {

  state = {
    name:'', location :'', phone:'', website:'', description:'' ,twitter:'', facebook:'', youtube:'' ,instagram:'',imageUrl : '',
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
 buildProfile() {
    const { dispatch } = this.props;
    const newFormData = new FormData();
    newFormData.append('name', this.state.name);
    newFormData.append('location', this.state.location);
    newFormData.append('phone', this.state.phone);
    newFormData.append('website', this.state.website);
    newFormData.append('description', this.state.description);
    newFormData.append('twitter', this.state.twitter);
    newFormData.append('facebook', this.state.facebook);
    newFormData.append('youtube', this.state.youtube);
    newFormData.append('instagram', this.state.instagram);
    newFormData.append('imageUrl', this.state.imageUrl);
    dispatch($createProfile(newFormData)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }
  render() {
    const { name, location, phone, website, description,twitter, facebook, youtube, instagram, imageUrl } = this.state;
    return  <Form>
    <Form.Item>
      <Input
        name="name"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="name"
        defaultValue={name}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
  
    <Form.Item>
      <Input
        name="location"
        prefix={<Icon type="maps" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="location"
        defaultValue={location}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="phone"
        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="phone"
        defaultValue={phone}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item><Form.Item>
      <Input
        name="website"
        prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="website"
        defaultValue={website}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item><Form.Item>
      <Input
        name="description"
        prefix={<Icon type="text" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="description"
        defaultValue={description}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="facebook"
        prefix={<Icon type="facebook" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="facebook"
        defaultValue={facebook}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="youtube"
        prefix={<Icon type="youtube" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="youtube"
        defaultValue={youtube}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>  <Form.Item>
      <Input
        name="twitter"
        prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="twitter"
        defaultValue={twitter}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="instagram"
        prefix={<Icon type="instagram" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="instagram"
        defaultValue={instagram}
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
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div className="ant-upload-text">Upload</div>}
        </Upload>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={() => this.buildProfile()}>
        Sign Up
      </Button>
    </Form.Item>
  </Form>
  }
}
CreateProfile.propTypes = propTypes;
export default Wrapper(CreateProfile);
