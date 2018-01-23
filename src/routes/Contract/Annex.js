import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Select, Upload, Message, Button, Icon } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class Annex extends PureComponent {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  // form
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.form.resetFields();
        Message.success('提交成功！');
      }
    });
  }
  // 文件上传
  normModalFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
    return (
      <Row>
        <Col span={12} offset={6}>
          <Card>
            <Form onSubmit={this.handleFormSubmit}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <FormItem {...formItemLayout} label="合同附件类型">
                  {getFieldDecorator('pName', {
                    rules: [{ required: true, message: '请选择合同附件类型!' }],
                  })(
                    <Select showSearch style={{ width: '100%' }} placeholder="请选择合同附件类型">
                      <Select.Option value="1">采购</Select.Option>
                      <Select.Option value="2">长期</Select.Option>
                      <Select.Option value="3">单次</Select.Option>
                      <Select.Option value="4">物流</Select.Option>
                      <Select.Option value="5">仓储</Select.Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="选择上传文件">
                  {getFieldDecorator('upload', { valuePropName: 'fileList',
                    getValueFromEvent: this.normModalFile,
                    rules: [{ required: true, message: '请选择文件!' }],
                  })(
                    <Upload action="">
                      <Button><Icon type="upload" />选择文件</Button>
                    </Upload>
                  )}
                </FormItem>
                <Col span={4} offset={1}>
                  <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit">添加</Button>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

