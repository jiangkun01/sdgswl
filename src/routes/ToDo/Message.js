import React, { Component } from 'react';
import { Row, Col, Card, Modal, Form, Input, Button, Icon } from 'antd';
import styles from './list.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class Message extends Component {
  state = {
    modalVisible: false,
  }

  modalShow = () => {
    this.setState({
      modalVisible: true,
    });
  }

  deleteMessage = () => {
    Modal.confirm({
      title: '确定删除此消息吗？',
      content: '删除后将无法撤回！',
      okText: '确认',
      cancelText: '取消',
    });
  }

  modalHandleCancel = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.form.resetFields();
  }

  modalFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.modalHandleCancel();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={23}>
            <Card
              className={styles.chartCardhover}
              onClick={this.modalShow}
              style={{ borderRadius: 10 }}
            >
              <a className={styles.messageA}><span>李雷</span></a>：
              <span className={styles.messageA}>今天下午几点开会</span>
            </Card>
          </Col>
          <Col span={1} style={{ fontSize: 25, textAlign: 'center' }}>
            <div>
              <Icon className={styles.chartCardhover} type="close" onClick={this.deleteMessage} />
            </div>
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" align="middle">
          <Col span={23}>
            <Card
              className={styles.chartCardhover}
              onClick={this.modalShow}
              style={{ borderRadius: 10 }}
            >
              <a className={styles.messageA}><span>韩梅梅</span></a>：
              <span className={styles.messageA}>开会有什么要准备的吗</span>
            </Card>
          </Col>
          <Col span={1} style={{ fontSize: 25, textAlign: 'center' }}>
            <div>
              <Icon className={styles.chartCardhover} type="close" onClick={this.deleteMessage} />
            </div>
          </Col>
        </Row>
        <Form onSubmit={this.modalFormConfirm}>
          <Modal
            title="待回复消息"
            visible={this.state.modalVisible}
            onCancel={this.modalHandleCancel}
            footer={[
              <Button key="back" onClick={this.modalHandleCancel}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.modalFormSubmit}>回复</Button>,
            ]}
            width={800}
          >
            <Row>
              <Col span={24}>
                <div className={styles.stepsContent}>
                  <h3>回复李雷的消息：</h3>
                  <FormItem>
                    {getFieldDecorator('upload', { valuePropName: 'note',
                      rules: [{ required: true, message: '请填写回复消息!' }],
                    })(
                      <TextArea rows={2} />
                    )}
                  </FormItem>
                </div>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}
