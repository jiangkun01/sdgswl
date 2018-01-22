import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Select, Upload, message, Button, Icon } from 'antd';

const FormItem = Form.Item;

export default class Annex extends PureComponent {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Row>
        <Col span={12} offset={6}>
          <Card>
            <FormItem {...formItemLayout} label="合同附件类型">
              <Select defaultValue="1" style={{ width: '100%' }} onChange={this.handleChange}>
                <Select.Option value="1">国贸流转单</Select.Option>
                <Select.Option value="2">物流流转单</Select.Option>
                <Select.Option value="3">客市报告</Select.Option>
                <Select.Option value="4">审核意见</Select.Option>
              </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="选择上传文件">
              <Upload {...props}>
                <Button><Icon type="upload" />选择文件</Button>
              </Upload>
            </FormItem>
          </Card>
        </Col>
      </Row>
    );
  }
}

