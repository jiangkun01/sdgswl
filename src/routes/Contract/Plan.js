import React, { PureComponent } from 'react';
import moment from 'moment';
import { Row, Col, Button, Table, Form, Modal, Message, Input, Select, Checkbox,
  Upload, Icon, DatePicker,
  InputNumber, Divider } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
@Form.create()
export default class Plan extends PureComponent {
  state = {
    modalStatus: '',
    modalVisible: false,
    ModalMessage: false,
    ModalUpdate: false,
    ModalTerminate: false,
    ModalPerform: false,
    selectedRowKeys: [],
    selectedRows: [],
    isInput: 'none',
    isOutput: 'none',
    isQuality: 'none',
    isPay: 'none',
    dataSource: [{
      id: 1,
      status: '执行中',
      precondition: '暂无',
      name: '出库20吨铝锭',
      expectedtime: '2018-1-21',
      actualtime: '暂无',
      updatetime: '2017-08-26',
      username: '李雷',
      createtime: '2017-08-21',
    }],
  }
  // 显示新建计划
  handleModalVisible = (flag) => {
    this.setState({
      modalStatus: '新建计划',
      modalVisible: !!flag,
    });
    this.props.form.resetFields();
  };
  changeCTemplat = (value) => {
    if (value === '0') {
      this.setState({
        isInput: 'block',
        isOutput: 'none',
        isQuality: 'none',
        isPay: 'none',
      });
    } else if (value === '1') {
      this.setState({
        isInput: 'none',
        isOutput: 'block',
        isQuality: 'none',
        isPay: 'none',
      });
    } else if (value === '2') {
      this.setState({
        isInput: 'none',
        isOutput: 'none',
        isQuality: 'none',
        isPay: 'block',
      });
    } else if (value === '3') {
      this.setState({
        isInput: 'none',
        isOutput: 'none',
        isQuality: 'block',
        isPay: 'none',
      });
    }
  };
  // 显示详情
  showModalMessage = () => {
    this.setState({
      modalStatus: '显示详情',
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
      this.setState({
        modalStatus: '执行计划',
        ModalPerform: true,
      });
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
      this.setState({
        modalStatus: '变更计划',
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
      this.setState({
        modalStatus: '终止计划',
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
      this.setState({
        modalStatus: '完成计划',
      });
      Message.success('履行计划完成');
    }
  }
  // form方法
  modalSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { modalStatus } = this.state;
        if (modalStatus.indexOf('新建') >= 0) {
          this.planAdd(values);
        } else if (modalStatus.indexOf('执行') >= 0) {
          this.planPerform();
        }
        this.modalHandleOk();
      }
    });
  }
  // 添加履行计划
  planAdd = (values) => {
    const { dataSource } = this.state;
    dataSource.push({
      id: Number(dataSource[dataSource.length - 1].id) + 1,
      status: '未执行',
      precondition: '暂无',
      name: values.mess,
      expectedtime: values.wilDate != null ? `${new Date(values.wilDate).getFullYear()}-${new Date(values.wilDate).getMonth() + 1 < 10 ? `0${new Date(values.wilDate).getMonth() + 1}` : `${new Date(values.wilDate).getMonth() + 1}`}-${new Date(values.wilDate).getDate()}` : '暂无',
      actualtime: '暂无',
      updatetime: '暂无',
      username: values.flowO,
      createtime: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`}-${new Date().getDate()}`,
    });
  }
  // 执行计划
  planPerform = () => {
    const { selectedRowKeys, dataSource } = this.state;
    for (let i = 0; i < dataSource.length; i += 1) {
      if (dataSource[i].id === selectedRowKeys[0]) {
        dataSource[i].status = '执行中';
        dataSource[i].updatetime = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`}-${new Date().getDate()}`;
      }
    }
  }
  // 隐藏弹出框
  modalHandleOk = () => {
    this.rowSelectionOnChange([], []);
    this.setState({
      ModalMessage: false,
      ModalUpdate: false,
      ModalTerminate: false,
      modalVisible: false,
      ModalPerform: false,
    });
    this.setState({
      modalStatus: '',
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
    const { ModalMessage, ModalUpdate, ModalTerminate, selectedRowKeys,
      modalVisible, ModalPerform, isInput, isOutput, isQuality, isPay, dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      { title: '编号', dataIndex: 'id', key: 'id' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '前置条件', dataIndex: 'precondition', key: 'precondition' },
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
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
            <Button type="primary" onClick={this.handleModalVisible}>新建计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.carryPlan}>执行计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.showModalUpdate}>变更计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.showModalTerminate}>终止计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.finishPlan}> 完成计划</Button>
          </Col>
        </Row>
        <Form>
          <Modal
            visible={ModalPerform}
            title="执行计划"
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalSubmit}>提交</Button>,
            ]}
          >
            <FormItem {...formItemLayout} label="入库数量" >
              {getFieldDecorator('sInputSum', {
              })(
                <InputNumber style={{ width: '100%' }} min={1} max={10000000} />
              )}
            </FormItem>
          </Modal>
        </Form>
        <Modal title="履行计划详情" visible={ModalMessage} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Table
            dataSource={[{ id: '1', number: '5', time: '2017-08-23' }, { id: '2', number: '10', time: '2017-08-26' }]}
            columns={[{ title: '编号', dataIndex: 'id', key: 'id' }, { title: '出库数量(吨)', dataIndex: 'number', key: 'number' }, { title: '出库时间', dataIndex: 'time', key: 'time' }]}
            rowKey="id"
          />
          <Table
            dataSource={[{ id: '1', content: '修改执行人为李雷', reason: '工作责任人调换', time: '2017-08-31' }, { id: '2', content: '修改预计时间为2018-2-21', reason: '不可控因素', time: '2018-01-21' }]}
            columns={[{ title: '编号', dataIndex: 'id', key: 'id' }, { title: '变更内容', dataIndex: 'content', key: 'content' }, { title: '变更原因', dataIndex: 'reason', key: 'reason' }, { title: '变更时间', dataIndex: 'time', key: 'time' }]}
            rowKey="id"
          />
        </Modal>
        <Form>
          <Modal
            visible={ModalUpdate}
            title="变更计划"
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalSubmit}>提交</Button>,
            ]}
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <FormItem {...formItemLayout} label="编号" >
                {getFieldDecorator('upId', {
                  initialValue: '1',
                })(
                  <Input disabled style={{ color: 'black' }} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="状态" >
                {getFieldDecorator('upStatus', {
                  initialValue: '2',
                })(
                  <Select disabled showSearch style={{ width: '100%' }} placeholder="请选择变更类型">
                    <Select.Option value="1">未执行</Select.Option>
                    <Select.Option value="2">执行中</Select.Option>
                    <Select.Option value="3">已终止</Select.Option>
                    <Select.Option value="4">已完成</Select.Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="前置条件" >
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    <Col span={12}><Checkbox value="A" defaultChecked>货物入库</Checkbox></Col>
                    <Col span={12}><Checkbox value="B"> 支付80%货款</Checkbox></Col>
                    <Col span={12}><Checkbox value="C" defaultChecked>收到上游发票</Checkbox></Col>
                    <Col span={12}><Checkbox value="D">支付20%货款</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </FormItem>
              <FormItem {...formItemLayout} label="履行计划名称" >
                {getFieldDecorator('upName', {
                  initialValue: '入库焦炭20吨',
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="预计完成时间" >
                {getFieldDecorator('upExpectedtime', {
                  initialValue: moment('2017-05-05'),
                  /* rules: [{ required: true, message: '请选择预计完成时间!' }], */
                })(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="执行人" >
                {getFieldDecorator('upUsername', {
                  initialValue: '李雷',
                  /* rules: [{ required: true, message: '请填写执行人!' }], */
                })(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="变更备注" >
                {getFieldDecorator('upNote', {
                  /* rules: [{ required: true, message: '请填写变更备注!' }], */
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </FormItem>
            </Row>
          </Modal>
        </Form>
        <Form>
          <Modal
            visible={ModalTerminate}
            title="终止计划"
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalSubmit}>提交</Button>,
            ]}
          >
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <FormItem {...formItemLayout} label="终止理由" >
                {getFieldDecorator('teReason', {
                  /* rules: [{ required: true, message: '请填写终止理由!' }], */
                })(
                  <TextArea rows={2} placeholder="请输入" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="选择上传文件">
                {getFieldDecorator('teUpload', {
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
        <Form>
          <Modal
            title="新增计划"
            visible={modalVisible}
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.modalSubmit}>提交</Button>,
            ]}
          >
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="履行计划条目"
            >
              {getFieldDecorator('mess', {
                /* rules: [
                  { required: true, message: '请输入履行计划条目' },
                ], */
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="履行计划内容"
            >
              {getFieldDecorator('textA', {
                /* rules: [
                  { required: true, message: '请输入履行计划内容' },
                ], */
              })(
                <TextArea placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="预计完成时间"
            >
              {getFieldDecorator('wilDate', {
                /* rules: [
                  { required: true, message: '请输入预计完成时间' },
                ], */
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="执行者"
            >
              {getFieldDecorator('flowO', {
                /* rules: [
                  { required: true, message: '请输入执行者' },
                ], */
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="前置条件"
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={24}><Checkbox value="A">货物入库</Checkbox></Col>
                  <Col span={24}><Checkbox value="B"> 支付80%货款</Checkbox></Col>
                  <Col span={24}><Checkbox value="C">收到上游发票</Checkbox></Col>
                  <Col span={24}><Checkbox value="D">支付20%货款</Checkbox></Col>
                </Row>
              </Checkbox.Group>,
            </FormItem>
            <Divider />
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="履行计划模板"
            >
              {getFieldDecorator('cTemplat', {
                /* rules: [
                  { required: true, message: '请选择履行计划模板' },
                ], */
              })(
                <Select style={{ width: 295 }} showSearch placeholder="请选择履行计划模板" onChange={this.changeCTemplat}>
                  <Option value="0">货物入库</Option>
                  <Option value="1">货物出库</Option>
                  <Option value="2">支付模板</Option>
                  <Option value="3">质检模板</Option>
                </Select>
              )}
            </FormItem>
            <strong>履行计划模板预览</strong>
            <div style={{ display: isInput }}>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="入库数量"
                hasFeedback
              >
                {getFieldDecorator('inputSum', {
                 /* rules: [
                    { required: false, message: '请输入入库数量' },
                  ], */
                })(
                  <InputNumber style={{ width: 295 }} min={1} max={10000000} />
                )}
                <span>/吨</span>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="入库时间"
                hasFeedback
              >
                {getFieldDecorator('inputDate', {
                 /* rules: [
                    { required: false, message: '请输入入库时间' },
                  ], */
                })(
                  <DatePicker style={{ width: 295 }} />
                )}
              </FormItem>
            </div>
            <div style={{ display: isQuality }}>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="货物取样时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="到达第三方"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="质检时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="质检报告时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </div>
            <div style={{ display: isOutput }}>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="出库数量"
                hasFeedback
              >
                {getFieldDecorator('outSum', {
                  /* rules: [
                    { required: false, message: '请输入出库数量' },
                  ], */
                })(
                  <InputNumber style={{ width: 295 }} min={1} max={10000000} />
                )}
                <span>/吨</span>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="出库时间"
                hasFeedback
              >
                {getFieldDecorator('outDate', {
                  /* rules: [
                    { required: false, message: '请输入出库时间' },
                  ], */
                })(
                  <DatePicker style={{ width: 295 }} />
                )}
              </FormItem>
            </div>
            <div style={{ display: isPay }}>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="首款金额"
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} /><span>万元</span>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="首款时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="尾款金额"
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} /><span>万元</span>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="尾款时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="支付笔数"
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="第一笔金额"
                hasFeedback
              >
                <InputNumber style={{ width: '100%' }} /><span>万元</span>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="第一笔时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" style={{ width: '75%', marginLeft: '5%' }}>
                  <Icon type="plus" /> 增加分次明细
                </Button>
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="发票开出时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
              <FormItem
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15 }}
                label="到达时间"
                hasFeedback
              >
                <DatePicker style={{ width: '100%' }} />
              </FormItem>
            </div>
          </Modal>
        </Form>
      </div>
    );
  }
}
