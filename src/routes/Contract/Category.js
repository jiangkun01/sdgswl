import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Table, Dropdown, Menu, Icon, notification } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item; // ssh
@Form.create()
export default class Category extends Component {
  operation = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );
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
      key: 'id',
    }, {
      title: '类别名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '添加时间',
      dataIndex: 'addtime',
      key: 'addtime',
    }, {
      title: '修改时间',
      dataIndex: 'updatetime',
      key: 'updatetime',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span>
          <Dropdown overlay={menu}>
            <Button>
              更多操作 <Icon type="down" />
            </Button>
          </Dropdown>
        </span>
      ),
    }];

    const data = [{
      id: '1',
      name: '1',
      addtime: '2017-01-01',
      updatetime: '2017-01-02',
    }, {
      id: '1',
      name: '1',
      addtime: '2017-01-01',
      updatetime: '2017-01-02',
    }, {
      id: '1',
      name: '1',
      addtime: '2017-01-01',
      updatetime: '2017-01-02',
    }, {
      id: '1',
      name: '1',
      addtime: '2017-01-01',
      updatetime: '2017-01-02',
    }];
    return (
      <PageHeaderLayout title="业务列表">
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
            <Col span={22} style={{ textAlign: 'right' }}>
              <Button type="primary">新建+</Button>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} dataSource={data} />
      </PageHeaderLayout>
    );
  }
}
