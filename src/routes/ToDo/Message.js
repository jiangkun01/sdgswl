import React, { Component } from 'react';
import { Row, Col, Card, Modal, Form, Input, Button } from 'antd';
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
        <Card
          className={styles.chartCardhover}
          onClick={this.modalShow}
          style={{ marginBottom: 24, borderRadius: 10 }}
        >
          <Row>
            <Col span={24}>
              <a className={styles.messageA}><span>李雷</span></a>：
              <span className={styles.messageA}>今天下午几点开会</span>
            </Col>
          </Row>
        </Card>
        <Card
          className={styles.chartCardhover}
          onClick={this.modalShow}
          style={{ marginBottom: 24, borderRadius: 10 }}
        >
          <Row>
            <Col span={24}>
              <a className={styles.messageA}><span>韩梅梅</span></a>：
              <span className={styles.messageA}>开会有什么要准备的吗</span>
            </Col>
          </Row>
        </Card>
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
