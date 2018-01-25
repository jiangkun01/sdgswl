import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Form, Modal, Message } from 'antd';

@Form.create()
export default class Plan extends PureComponent {
  state = {
    ModalMessage: false,
    ModalUpdate: false,
    selectedRows: [],
  }
  // 显示详情
  showModalMessage = () => {
    this.setState({
      ModalMessage: true,
    });
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
        ModalUpdate: true,
      });
    }
  }
  // 弹出框form方法
  handleModalSubmit = (e) => {
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
    });
    this.props.form.resetFields();
  }
  // 表格多选框选择事件
  rowSelectionOnChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
  render() {
    const { ModalMessage, ModalUpdate } = this.state;
    const columns = [
      { title: '序号', dataIndex: 'id', key: 'id' },
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
      onChange: this.rowSelectionOnChange,
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
            <Button onClick={this.showModalUpdate}>变更计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button>终止合同</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button> 完成计划</Button>
          </Col>
        </Row>
        <Modal title="履行计划详情" visible={ModalMessage} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Table
            dataSource={[{ id: '1', number: '2', time: '2017-01-01' }, { id: '2', number: '2', time: '2017-01-02' }]}
            columns={[{ title: '编号', dataIndex: 'id', key: 'id' }, { title: '入库数量(吨)', dataIndex: 'number', key: 'number' }, { title: '入库时间', dataIndex: 'time', key: 'time' }]}
            rowKey="id"
          />
        </Modal>
        <Modal
          visible={ModalUpdate}
          title="变更履行计划"
          onCancel={this.modalHandleOk}
          footer={[
            <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
            <Button key="submit" type="primary" onClick={this.handleModalSubmit}>提交</Button>,
          ]}
        >
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              {/* <FormItem {...formItemLayout} label="变更日期" >
                {getFieldDecorator('time', {
                  rules: [{ required: true, message: '请填写类别名称!' }],
                })(
                  <DatePicker />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="变更类型" >
                {getFieldDecorator('pName', {
                  rules: [{ required: true, message: '请选择变更类型!' }],
                })(
                  <Select showSearch style={{ width: '100%' }} placeholder="请选择变更类型">
                    <Select.Option value="1">采购</Select.Option>
                    <Select.Option value="2">长期</Select.Option>
                    <Select.Option value="3">单次</Select.Option>
                    <Select.Option value="4">物流</Select.Option>
                    <Select.Option value="5">仓储</Select.Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="变更内容摘要" >
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: '请填写变更内容摘要!' }],
                })(
                  <TextArea rows={2} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="变更原因" >
                {getFieldDecorator('reason', {
                  rules: [{ required: true, message: '请填写变更原因!' }],
                })(
                  <TextArea rows={2} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="相关变更文件" >
                {getFieldDecorator('upload', { valuePropName: 'fileList',
                  getValueFromEvent: this.normModalFile,
                  rules: [{ required: true, message: '请选择文件!' }],
                })(
                  <Upload action="">
                    <Button><Icon type="upload" />选择文件</Button>
                  </Upload>
                )}
              </FormItem> */}
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
