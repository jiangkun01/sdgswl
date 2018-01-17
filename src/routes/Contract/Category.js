import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Table, Menu, Dropdown, Alert, Modal, message, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item; // ssssh
const { SubMenu } = Menu;
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
  };
  operationChange = (record, e) => {
    if (e.key === '1') {
      this.showModal();
    } else if (e.key === '2') {
      confirm({
        title: '确认删除吗？',
        onOk() {
          message.success('删除成功！');
        },
      });
    }
  }
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys });
  }
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
      message.success('提交成功！');
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleMenuClick = (e) => {
    if (e.key === '2') {
      confirm({
        title: '确认删除吗？',
        onOk() {
          message.success('删除成功！');
        },
      });
    }
    this.handleRowSelectChange([], []);
  }
  render() {
    const { selectedRowKeys, visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    const columns = [{
      title: '类别编号',
      dataIndex: 'id',
    }, {
      title: '类别名称',
      dataIndex: 'name',
    }, {
      title: '添加时间',
      dataIndex: 'addtime',
    }, {
      title: '修改时间',
      dataIndex: 'updatetime',
    }, {
      title: '操作',
      render: record => (
        <Menu onClick={e => this.operationChange(record, e)}>
          <SubMenu key="0" title={<span>更多</span>}>
            <Menu.Item key="1">修改</Menu.Item>
            <Menu.Item key="2">删除</Menu.Item>
          </SubMenu>
        </Menu>
      ),
    }];
    const data = [];
    const dataName = ['采购合同', '物流合同', '仓储合同', '销售合同', '长期协议合同', '单次合同', '框架合同合同'];
    for (let i = 1; i < 8; i += 1) {
      data.push({
        id: `${i}`,
        name: dataName[i - 1],
        addtime: '2017-01-01',
        updatetime: '2017-01-02',
      });
    }
    return (
      <PageHeaderLayout title="合同类目列表">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={10} offset={1}>
              <FormItem {...formItemLayout} label="类别名称">
                {getFieldDecorator('b_name')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button type="primary" htmlType="submit">查询</Button>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              <Button type="primary" onClick={this.showModal}>新建+</Button>&nbsp;&nbsp;&nbsp;&nbsp;
              {
                selectedRowKeys.length > 0 && (
                  <Dropdown
                    overlay={(
                      <Menu onClick={this.handleMenuClick}>
                        <Menu.Item key="2">批量删除</Menu.Item>
                      </Menu>
                    )}
                    placement="bottomCenter"
                  >
                    <Button>更多操作<Icon type="down" /></Button>
                  </Dropdown>
                )
              }
            </Col>
          </Row>
        </Form>
        <br />
        <Row>
          <Col span={22} offset={1}>
            <Alert
              message={(
                <div>
                  已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                  <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
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
              loading={loading}
            />
          </Col>
        </Row>
        <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>提交</Button>,
          ]}
        >
          <Form>
            <Row>
              <FormItem {...formItemLayout} label="类别名称">
                {getFieldDecorator('b_name')(
                  <Input placeholder="请输入" />
                )}
              </FormItem>
            </Row>
          </Form>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
