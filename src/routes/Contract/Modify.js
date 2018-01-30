import React, { PureComponent } from 'react';
import { Row, Col, Table, Form, Icon } from 'antd';

/* const FormItem = Form.Item;
const { TextArea } = Input; */

@Form.create()
export default class Modify extends PureComponent {
  /* state = {
    visible: false,
  } */
  // 显示弹出框
  /* showModal = () => {
    this.setState({
      visible: true,
    });
  } */
  // 弹出框提交
  /* handleModalOk = () => {
    setTimeout(() => {
      this.setState({ visible: false });
      this.props.form.resetFields();
      Message.success('提交成功！');
    }, 100);
  } */
  // 弹出框form方法
  /* handleModalSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleModalOk();
      }
    });
  } */
  // 文件上传
  /* normModalFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  } */
  // 隐藏弹出框
  /* handleModalCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  } */
  render() {
    /* const { getFieldDecorator } = this.props.form; */
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'content',
      key: 'content',
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
    const dataSource = [
      { id: '1', name: '铝锭销售合同', time: '2017-08-31', type: '数量变更', content: '将原计划销售20吨改为30吨', reason: '相对方需求增加', filename: '铝锭销售合同' },
      { id: '2', name: '铝锭代理销售合同', time: '2017-09-20', type: '数量变更', content: '将原计划销售5吨改为10吨', reason: '相对方需求增加', filename: '铝锭代理销售合同' },
      { id: '3', name: '铝锭代理采购合同', time: '2018-01-01', type: '合同终止', content: '合同已终止', reason: '相对方暂无需求', filename: '铝锭代理采购合同' },
    ];
    /* const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    }; */
    return (
      <div>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24}>
            <Table dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1366 }} />
          </Col>
        </Row>
      </div>
      /* <Modal
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
      </Modal> */
    );
  }
}
