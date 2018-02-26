import React, { Component } from 'react';
import { Row, Col, Table, Modal, Steps, Form, Input, Button, Icon } from 'antd';
import Result from '../../components/Result/index';
import styles from './list.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class Task extends Component {
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
    this.setState({
      stepsCurrent: 2,
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
      modalFormVisible: true,
    });
  }

  handleFormSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          stepsCurrent: 1,
          modalVisible: false,
          modalFormVisible: false,
        });
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      { title: '编号', dataIndex: 'id', key: 'id' },
      {
        title: this.state.tabsKey === '1' ? '任务名称' : this.state.tabsKey === '2' ? '履行计划名称' : this.state.tabsKey === '3' ? '合同名称' : '流程名称',
        dataIndex: 'name',
        key: 'name',
      },
      { title: '最晚处理时间', dataIndex: 'time', key: 'time' },
    ];
    const data = [
      { key: '1', id: '1', name: '名称1', time: '2018-02-28' },
    ];
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
    const information = (
      <div className={styles.stepsContent}>
        <FormItem {...formItemLayout} label="当前库存" >
          <Input value="20 吨" disabled style={{ color: 'black', border: this.state.stepsCurrent === 1 ? '' : 0 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="已入库" >
          <Input value="10 吨" disabled style={{ color: 'black', border: this.state.stepsCurrent === 1 ? '' : 0 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="剩余入库数量" >
          <Input value="10 吨" disabled style={{ color: 'black', border: this.state.stepsCurrent === 1 ? '' : 0 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="入库数量" >
          <Input value="10 吨" disabled style={{ color: 'black', border: this.state.stepsCurrent === 1 ? '' : 0 }} />
        </FormItem>
        <FormItem {...formItemLayout} label="对应的仓库" >
          <Input value="散货仓库" disabled style={{ color: 'black', border: this.state.stepsCurrent === 1 ? '' : 0 }} />
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
    );
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={record => record.key}
          onRow={() => ({
            onClick: () => {
              this.modalShow();
            },
          })}
        />
        <Form onSubmit={this.handleFormSubmit}>
          <Modal
            title="待处理事项"
            visible={this.state.modalVisible}
            onCancel={this.modalHandleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.state.modalFormVisible ? this.handleFormSubmit : this.modalFormShow} style={{ display: this.state.stepsCurrent === 1 ? 'inline' : 'none' }}>审批不通过</Button>,
              <Button key="back" onClick={this.state.stepsCurrent === 1 ? this.modalHandleOk : this.modalHandleCancel}>{this.state.stepsCurrent === 1 ? '审批通过' : '确定'}</Button>,
            ]}
            width={800}
          >
            {
              this.state.stepsCurrent === 1 ? (
                <div>
                  <Row gutter={16} type="flex" align="middle">
                    <Col span={2}>
                      <span
                        style={{ fontSize: 22 }}
                        className={styles.iconhover}
                      >
                        <Icon type="left" />
                      </span>
                    </Col>
                    <Col span={20}>
                      <Steps current={this.state.stepsCurrent}>
                        <Steps.Step key="出库计划信息" title="出库计划信息" />
                        <Steps.Step key="提交审批" title="提交审批" />
                        <Steps.Step key="出库信息" title="出库信息" />
                      </Steps>
                    </Col>
                    <Col span={2}>
                      <span
                        style={{ fontSize: 22 }}
                        className={styles.iconhover}
                      >
                        <Icon type="right" />
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    {information}
                  </Row>
                </div>
              ) : (
                <div>
                  <Result
                    type="success"
                    title="操作成功"
                    description=""
                    extra={information}
                    actions=""
                    className={styles.result}
                  />
                </div>
              )
            }
          </Modal>
        </Form>
      </div>
    );
  }
}
