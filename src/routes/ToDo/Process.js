import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Card, Modal, Form, Input, Button } from 'antd';
import styles from './list.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Process extends Component {
  state = {
    modalVisible: false,
  }

  modalShow = () => {
    this.props.dispatch(routerRedux.push('/contract/create/info'));
    /* Modal.confirm({
      title: '确定吗？',
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk: this.toCreateContract,
    }); */
    /* this.setState({
      modalVisible: true,
    }); */
  }

  /* toCreateContract = () => {
    this.props.dispatch(routerRedux.push('/contract/create/info'));
  } */

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
              <a className={styles.messageA}><span>物品发放</span></a>：
              <span className={styles.messageA}>今天下午三点请领取个人所上报需要的办公用品</span>
              <span className={styles.messageA} style={{ float: 'right' }}>任务时间：<strong>2018-02-27 15：00</strong></span>
            </Col>
          </Row>
        </Card>
        <Form onSubmit={this.modalFormSubmit}>
          <Modal
            title="待处理事项"
            visible={this.state.modalVisible}
            onCancel={this.modalHandleCancel}
            footer={[
              <Button key="back" onClick={this.modalHandleCancel}>取消</Button>,
              <Button key="submit" type="primary" onClick={this.modalFormSubmit}>确定</Button>,
            ]}
            width={800}
          >
            <Row>
              <Col span={24}>
                <div className={styles.stepsContent}>
                  <h3>任务完成情况：</h3>
                  <FormItem>
                    {getFieldDecorator('upload', { valuePropName: 'note',
                      rules: [{ required: true, message: '请填写任务完成情况!' }],
                    })(
                      <TextArea rows={6} />
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
