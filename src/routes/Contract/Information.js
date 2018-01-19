import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Button, Modal } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class Information extends PureComponent {
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  modalHandleOk = () => {
    this.setState({
      visible: false,
    });
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
    return (
      <div>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="合同名称" >
              <Input value="潍坊港煤炭长期运输合同" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="合同类型" >
              <Input value="长期类型" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="合同编号" >
              <Input value="201701012356" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="相对方">
              <Row gutter={8}>
                <Col span={20}>
                  <Input value="博涵运输" disabled style={{ color: 'black' }} />
                </Col>
                <Col span={4}>
                  <Button onClick={this.showModal}>详情</Button>
                </Col>
              </Row>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="相对方合同编号" >
              <Input value="201701012357" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="合同总金额">
              <Input value="122.4万元" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={24} offset={5}>
            <FormItem {...formItemLayout} label="签订时间" >
              <Input value="2017-01-01" disabled style={{ color: 'black' }} />
            </FormItem>
          </Col>
        </Row>
        <Modal title="合同相对方详情" visible={this.state.visible} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Row>
            <Col md={24} sm={24}>
              <FormItem {...formItemLayout} label="相对方名称" >
                <Input value="博涵运输" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="相对方合同编号" >
                <Input value="201701012357" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="相对方创建时间" >
                <Input value="2008-01-01" disabled style={{ color: 'black' }} />
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
