import React, { Component } from 'react';
import { Row, Col, Card, Modal, Form, Input, Button } from 'antd';
import styles from './list.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class ApprovalPlan extends Component {
  state = {
    stepsCurrent: 1,
    modalVisible: false,
    modalFormVisible: false,
  }

  modalShow = () => {
    this.setState({
      modalVisible: true,
    });
  }

  modalHandleOk = () => {
    Modal.confirm({
      title: '确定通过审批吗？',
      content: '此过程不可逆，请谨慎操作',
      okText: '确认',
      cancelText: '取消',
      onOk: this.modalHandleCancel,
    });
  }

  modalHandleCancel = () => {
    this.setState({
      stepsCurrent: 1,
      modalVisible: false,
      modalFormVisible: false,
    });
    this.props.form.resetFields();
  }

  modalFormShow = () => {
    this.setState({
      stepsCurrent: 0,
      modalFormVisible: true,
    });
  }

  modalFormConfirm = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Modal.confirm({
          title: '确定不通过审批吗？',
          content: '此过程不可逆，请谨慎操作',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.modalFormSubmit(values),
        });
      }
    });
  }

  modalFormSubmit = (values) => {
    console.log(values);
    this.setState({
      stepsCurrent: 1,
      modalVisible: false,
      modalFormVisible: false,
    });
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
        <Card
          className={styles.chartCardhover}
          onClick={this.modalShow}
          style={{ marginBottom: 24, borderRadius: 10 }}
        >
          <Row>
            <Col span={24}>
              <a className={styles.messageA}><span>货物出库</span></a>：
              <span className={styles.messageA}>今天下午五点会有一批货物出库，请及时做出审批</span>
              <span className={styles.messageA} style={{ float: 'right' }}>任务最晚审批时间：<strong>2018-02-27 16：00</strong></span>
            </Col>
          </Row>
        </Card>
        <Form onSubmit={this.modalFormConfirm}>
          <Modal
            title="待处理事项"
            visible={this.state.modalVisible}
            onCancel={this.modalHandleCancel}
            footer={[
              <Button key="back" onClick={this.modalHandleCancel} style={{ display: this.state.stepsCurrent === 1 ? 'none' : 'inline' }}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.state.modalFormVisible ? this.modalFormConfirm : this.modalFormShow}>审批不通过</Button>,
              <Button key="success" onClick={this.state.stepsCurrent === 1 ? this.modalHandleOk : this.modalHandleCancel} style={{ display: this.state.stepsCurrent === 1 ? 'inline' : 'none' }}>审批通过</Button>,
            ]}
            width={800}
          >
            <Row>
              <div className={styles.stepsContent}>
                <h3>出库计划审批</h3>
                <FormItem {...formItemLayout} label="计划出库" >
                  <Input value="20 吨" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="已出库库" >
                  <Input value="10 吨" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="本次出库数量" >
                  <Input value="10 吨" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="货物类型" >
                  <Input value="铝锭" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="对应的仓库" >
                  <Input value="散货仓库" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="计划创建人" >
                  <Input value="李雷" disabled style={{ color: 'black' }} />
                </FormItem>
                <FormItem {...formItemLayout} label="计划创建时间" >
                  <Input value="2018-02-27 08：00" disabled style={{ color: 'black' }} />
                </FormItem>
                {
                  this.state.modalFormVisible && (
                    <FormItem {...formItemLayout} label="请填写不通过原因">
                      {getFieldDecorator('upload', { valuePropName: 'note',
                        rules: [{ required: true, message: '请填写不通过原因!' }],
                      })(
                        <TextArea rows={4} />
                      )}
                    </FormItem>
                  )
                }
              </div>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}
