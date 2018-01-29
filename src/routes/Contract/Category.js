import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, Divider, Menu, Dropdown, Alert, Modal, DatePicker, message, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { confirm } = Modal;

@connect(({ ccategory, loading }) => ({
  ccategory,
  loading: loading.models.rule,
}))
@Form.create()
export default class Category extends PureComponent {
  state = {
    selectedRowKeys: [],
    loading: false,
    visible: false,
    filteredInfo: null,
    sortedInfo: null,
  };
  // loading...
  componentWillMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  }
  // 表格多选框
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  }
  // 取消全部选中
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  // 显示弹出框
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 弹出框提交
  handleModalOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      this.props.form.resetFields();
      message.success('提交成功！');
    }, 100);
  }
  // 弹出框form表单
  handleModalSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.handleModalOk();
      }
    });
  }
  // 隐藏弹出框
  handleModalCancel = () => {
    this.setState({ visible: false });
    this.props.form.resetFields();
  }
  // 删除
  handleMenuClick = () => {
    confirm({
      title: '确认删除吗？',
      onOk() {
        message.success('删除成功！');
      },
    });
    this.handleRowSelectChange([], []);
  }
  // 表格排序查找
  handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  render() {
    const { selectedRowKeys, visible, loading } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: '类目名称',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: '采购', value: '采购' },
          { text: '长期', value: '长期' },
          { text: '单次', value: '单次' },
          { text: '物流', value: '物流' },
          { text: '仓储', value: '仓储' },
          { text: '销售', value: '销售' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
      },
      { title: '添加时间', dataIndex: 'addtime', key: 'addtime' },
      { title: '修改时间', dataIndex: 'updatetime', key: 'updatetime' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 120,
        render: (/* text, record */) => (
          <span>
            <a onClick={this.showModal} >修改</a>
            <Divider type="vertical" />
            <a onClick={this.handleMenuClick} >删除</a>
          </span>
        ),
      }];
    const data = [];
    const dataName = ['采购合同', '物流合同', '仓储合同', '销售合同', '长期协议合同', '单次合同', '框架合同'];
    for (let i = 1; i < 8; i += 1) {
      data.push({
        id: `${i}`,
        name: dataName[i - 1],
        addtime: `2017-0${i}-0${i}`,
        updatetime: `2017-0${i}-0${i + 1}`,
      });
    }
    return (
      <PageHeaderLayout title="合同类目列表">
        <Card border="false">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6}>
                <FormItem {...formItemLayout} label="类目名称">
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
              <Col md={6}>
                <FormItem {...formItemLayout} label="添加时间">
                  <DatePicker />
                </FormItem>
              </Col>
              <Col md={4}>
                <FormItem>
                  <Button type="primary" htmlType="submit">查询</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <br />
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
              <Alert
                message={(
                  <div>
                    已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
                    &nbsp;&nbsp;
                    <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      selectedRowKeys.length > 0 && (
                        <Dropdown
                          overlay={(
                            <Menu onClick={this.handleMenuClick}>
                              <Menu.Item key="1">批量删除</Menu.Item>
                            </Menu>
                          )}
                          placement="bottomCenter"
                        >
                          <Button>更多操作<Icon type="down" /></Button>
                        </Dropdown>
                      )
                    }
                    <Button type="primary" onClick={this.showModal} style={{ float: 'right', marginTop: '-5px' }}>新建+</Button>
                  </div>
                )}
                type="info"
                showIcon
              />
              <br />
              <Table
                rowSelection={rowSelection}
                dataSource={data}
                columns={columns}
                rowKey="id"
                scroll={{ x: 1000 }}
                onChange={this.handleTableChange}
                loading={loading}
              />
            </Col>
          </Row>
          <Modal
            visible={visible}
            title="添加合同类别"
            onCancel={this.handleModalCancel}
            footer={[
              <Button key="back" onClick={this.handleModalCancel}>关闭</Button>,
              <Button key="submit" loading={loading} onClick={this.handleModalSubmit}>提交</Button>,
            ]}
          >
            <Form>
              <Row>
                <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} label="类别名称">
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请填写类别名称!' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
                </FormItem>
              </Row>
            </Form>
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
