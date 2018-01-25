import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Button, Table, Form, Modal, Message, Input, Select, Checkbox, Upload, Icon, DatePicker } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class Plan extends PureComponent {
  state = {
    ModalMessage: false,
    ModalUpdate: false,
    ModalTerminate: false,
    selectedRowKeys: [],
    selectedRows: [],
  }
  // 显示详情
  showModalMessage = () => {
    this.setState({
      ModalMessage: true,
    });
  }
  // 执行计划
  carryPlan = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length <= 0) {
      Message.error('请选择履行计划');
    } else if (selectedRows.length > 1) {
      Message.warning('无法操作多条履行计划');
    } else {
      this.rowSelectionOnChange([], []);
      Message.success('履行计划已开始执行');
    }
  }
  // 显示变更计划
  showModalUpdate = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length <= 0) {
      Message.error('请选择履行计划');
    } else if (selectedRows.length > 1) {
      Message.warning('无法操作多条履行计划');
    } else {
      this.rowSelectionOnChange([], []);
      this.setState({
        ModalUpdate: true,
      });
    }
  }
  // 显示终止计划
  showModalTerminate = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length <= 0) {
      Message.error('请选择履行计划');
    } else if (selectedRows.length > 1) {
      Message.warning('无法操作多条履行计划');
    } else {
      this.rowSelectionOnChange([], []);
      this.setState({
        ModalTerminate: true,
      });
    }
  }
  // 完成计划
  finishPlan = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length <= 0) {
      Message.error('请选择履行计划');
    } else if (selectedRows.length > 1) {
      Message.warning('无法操作多条履行计划');
    } else {
      this.rowSelectionOnChange([], []);
      Message.success('履行计划完成');
    }
  }
  // 变更计划form方法
  modalUpdateSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.modalHandleOk();
      }
    });
  }
  // 终止计划form方法
  modalTerminateSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.modalHandleOk();
      }
    });
  }
  // 隐藏弹出框
  modalHandleOk = () => {
    this.setState({
      ModalMessage: false,
      ModalUpdate: false,
      ModalTerminate: false,
    });
    this.props.form.resetFields();
  }
  // 表格多选框选择事件
  rowSelectionOnChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
    this.setState({ selectedRows });
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
    const { ModalMessage, ModalUpdate, ModalTerminate, selectedRowKeys } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      { title: '编号', dataIndex: 'id', key: 'id' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '前置条件', dataIndex: 'note', key: 'note' },
      { title: '履行计划名称', dataIndex: 'name', key: 'name' },
      { title: '预计完成时间', dataIndex: 'expectedtime', key: 'expectedtime' },
      { title: '实际完成时间', dataIndex: 'actualtime', key: 'actualtime' },
      { title: '更新日期', dataIndex: 'updatetime', key: 'updatetime' },
      { title: '执行者', dataIndex: 'username', key: 'username' },
      { title: '创建时间', dataIndex: 'createtime', key: 'createtime' },
      { title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => (
          <span>
            <a onClick={this.showModalMessage}>详情</a>
          </span>
        ),
      }];
    const dataSource = [{
      id: 1,
      status: '执行中',
      note: '暂无',
      name: '入库20吨焦炭',
      expectedtime: '2017-05-25',
      actualtime: '2017-06-01',
      updatetime: '2017-06-01',
      username: '李雷',
      createtime: '2017-04-25',
    }, {
      id: 2,
      status: '执行中',
      note: '暂无',
      name: '入库30吨玉米',
      expectedtime: '2017-06-25',
      actualtime: '2017-07-01',
      updatetime: '2017-07-01',
      username: '韩涛',
      createtime: '2017-05-25',
    }];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.rowSelectionOnChange,
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    return (
      <div>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24}>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1366 }} />
          </Col>
        </Row>
        <br />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button onClick={this.carryPlan}>执行计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={this.showModalUpdate}>变更计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={this.showModalTerminate}>终止计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={this.finishPlan}> 完成计划</Button>
          </Col>
        </Row>
        <Modal title="履行计划详情" visible={ModalMessage} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Table
            dataSource={[{ id: '1', number: '2', time: '2017-01-01' }, { id: '2', number: '2', time: '2017-01-02' }]}
            columns={[{ title: '编号', dataIndex: 'id', key: 'id' }, { title: '入库数量(吨)', dataIndex: 'number', key: 'number' }, { title: '入库时间', dataIndex: 'time', key: 'time' }]}
            rowKey="id"
          />
        </Modal>
        <Form>
          <Modal
            visible={ModalUpdate}
            title="变更履行计划"
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalUpdateSubmit}>提交</Button>,
            ]}
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <FormItem {...formItemLayout} label="编号" >
                {getFieldDecorator('id', {
                  initialValue: '1',
                })(
                  <Input disabled style={{ color: 'black' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="状态" >
                {getFieldDecorator('status', {
                  initialValue: '2',
                })(
                  <Select showSearch style={{ width: '100%' }} placeholder="请选择变更类型">
                    <Select.Option value="1">未执行</Select.Option>
                    <Select.Option value="2">执行中</Select.Option>
                    <Select.Option value="3">已终止</Select.Option>
                    <Select.Option value="4">已完成</Select.Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="前置条件" >
                <Row>
                  <Col span={12}><Checkbox value="A" defaultChecked disabled>货物入库</Checkbox></Col>
                  <Col span={12}><Checkbox value="B"> 支付80%货款</Checkbox></Col>
                  <Col span={12}><Checkbox value="C" defaultChecked disabled>收到上游发票</Checkbox></Col>
                  <Col span={12}><Checkbox value="D">支付20%货款</Checkbox></Col>
                </Row>
              </FormItem>
              <FormItem {...formItemLayout} label="履行计划名称" >
                {getFieldDecorator('name', {
                  initialValue: '入库焦炭20吨',
                })(
                  <Input disabled style={{ color: 'black' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="预计完成时间" >
                {getFieldDecorator('expectedtime', {
                  initialValue: moment('2017-05-05'),
                  rules: [{ required: true, message: '请选择预计完成时间!' }],
                })(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="执行人" >
                {getFieldDecorator('username', {
                  initialValue: '李雷',
                  rules: [{ required: true, message: '请填写执行人!' }],
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Row>
          </Modal>
        </Form>
        <Form>
          <Modal
            visible={ModalTerminate}
            title="终止合同"
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalTerminateSubmit}>终止履行计划</Button>,
            ]}
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <FormItem {...formItemLayout} label="终止理由" >
                {getFieldDecorator('reason', {
                  rules: [{ required: true, message: '请填写终止理由!' }],
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="选择上传文件">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normModalFile,
                })(
                  <Upload action="">
                    <Button><Icon type="upload" />选择文件</Button>
                  </Upload>
                )}
              </FormItem>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}
