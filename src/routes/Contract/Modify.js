import React, { PureComponent } from 'react';
import { Row, Col, Card, Button, Table, Modal, Form, Input, Select, Message, Upload, Icon, DatePicker } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class Modify extends PureComponent {
  state = {
    visible: false,
  }
  // 显示弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 弹出框提交
  handleModalOk = () => {
    setTimeout(() => {
      this.setState({ visible: false });
      this.props.form.resetFields();
      Message.success('提交成功！');
    }, 100);
  }
  // 弹出框form方法
  handleModalSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleModalOk();
      }
    });
  }
  // 文件上传
  normModalFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  // 隐藏弹出框
  handleModalCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '变更日期',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '变更类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '变更内容摘要',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '变更原因',
      dataIndex: 'reason',
      key: 'reason',
    }, {
      title: '相关变更文件',
      dataIndex: 'filename',
      key: 'filename',
      fixed: 'right',
      width: 200,
      render: (text, render) => (
        <span>
          <Icon type="file" /><a>{ render.filename }</a>
        </span>
      ),
    }];
    const type = ['长期合同', '短期合同', '单货物合同', '内贸合同', '外贸合同', '单次合同'];
    const note = ['合同期限延长为长期', '合同期限缩短为短期', '合同运输货物改为仅仅是煤炭', '合同贸易类型改为内贸', '合同贸易类型改为外贸', '合同执行次数改为单词'];
    const reason = ['合同双方同意长期合作', '合同双方同意放弃长期合作', '合同一方被限制运输货物类型', '合同一方转为国内发展', '合同一方转为国外发展', '合同双方同意本次运输执行完成后，取消合同'];
    const filename = ['长期煤炭运输合同', '短期运输合同', '长期焦炭运输合同', '长期运输合同', '短期杂货运输合同', '长期内贸运输合同'];
    const dataSource = [];
    for (let i = 1; i < 7; i += 1) {
      dataSource.push({
        id: i,
        time: i < 10 ? `2017-0${i}-0${i}` : `2017-${i}-${i}`,
        type: type[i - 1],
        note: note[i - 1],
        reason: reason[i - 1],
        filename: filename[i - 1],
      });
    }
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
          <Col span={24} style={{ textAlign: 'right' }}>
            <Card>
              <Button type="primary" onClick={this.showModal}>新增+</Button>
            </Card>
          </Col>
        </Row>
        <br />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24}>
            <Table dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1366 }} />
          </Col>
        </Row>
        <Modal
          visible={this.state.visible}
          title="添加合同文档"
          onCancel={this.handleModalCancel}
          footer={[
            <Button key="back" onClick={this.handleModalCancel}>关闭</Button>,
            <Button key="submit" type="primary" onClick={this.handleModalSubmit}>提交</Button>,
          ]}
        >
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <FormItem {...formItemLayout} label="变更日期" >
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
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
