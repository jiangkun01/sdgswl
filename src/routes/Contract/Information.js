import React, { PureComponent } from 'react';
import { Row, Col, Card, Form, Input, Button, Modal } from 'antd';

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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return (
      <div>
        <Row>
          <Col md={22} sm={24} offset={1}>
            <Card>
              <FormItem {...formItemLayout} label="合同名称" >
                <Input value="铝锭销售合同" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="合同类型" >
                <Input value="销售合同" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="合同编号" >
                <Input value="2017SDHSLGGM0250" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="相对方">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col span={16}>
                    <Input value="继任（上海）商贸有限公司" disabled style={{ color: 'black' }} />
                  </Col>
                  <Col span={4} offset={1}>
                    <Button onClick={this.showModal}>详情</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...formItemLayout} label="相对方合同编号" >
                <Input value="2017SDHSLGGM0250" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="合同总金额">
                <Input value="320.6万元" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="签订时间" >
                <Input value="2017-08-21" disabled style={{ color: 'black' }} />
              </FormItem>
            </Card>
          </Col>
        </Row>
        <Modal title="合同相对方详情" visible={this.state.visible} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="相对方名称" >
                <Input value="继任（上海）商贸有限公司" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="相对方合同编号" >
                <Input value="2017SDHSLGGM0250" disabled style={{ color: 'black' }} />
              </FormItem>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="相对方创建时间" >
                <Input value="2017-08-21" disabled style={{ color: 'black' }} />
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
