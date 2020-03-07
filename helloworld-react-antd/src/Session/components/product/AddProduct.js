import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Dialog from '../../../Shared/Dialog'
import * as PropTypes from '../../../common/proptypes';
import {
  Form, Icon, Input, Button, Upload
} from 'antd';
import { $addProduct } from '../../../Home/state';

const withStore = connect((state) => ({}));

const propTypes = {
  ...PropTypes.withRouting,
  ...PropTypes.withState,
};

const Wrapper = (C) => withStore(C);

class AddProduct extends Component {

  state = {
    name:'', price :'', size:'', category:'', description:'' ,imageUrl : '',
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
 add() {
    const { dispatch } = this.props;
    const newFormData = new FormData();
    newFormData.append('name', this.state.name);
    newFormData.append('price', this.state.price);
    newFormData.append('size', this.state.size);
    newFormData.append('category', this.state.category);
    newFormData.append('description', this.state.description);
    newFormData.append('imageUrl', this.state.imageUrl);
    dispatch($addProduct(newFormData)).catch((error) => Dialog.toast(Dialog.FAILURE, error.message));
  }
  render() {
    const { name, price, size, category, description,twitter, facebook, youtube, instagram, imageUrl } = this.state;
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
        name="price"
        prefix={<Icon type="$" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="price"
        defaultValue={price}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item>
    <Form.Item>
      <Input
        name="size"
        prefix={<Icon type="size" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="size"
        defaultValue={size}
        onChange={(e) => this.handleInputChange(e)}
      />
    </Form.Item><Form.Item>
      <Input
        name="category"
        prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
        type="text"
        placeholder="category"
        defaultValue={category}
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
      <Button type="primary" htmlType="submit" onClick={() => this.add()}>
        Add Product
      </Button>
    </Form.Item>
  </Form>
  }
}
AddProduct.propTypes = propTypes;
export default Wrapper(AddProduct);
