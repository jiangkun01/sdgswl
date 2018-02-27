import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, DatePicker } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ ccategory, loading }) => ({
  ccategory,
  loading: loading.models.rule,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    loading: false,
    sortedInfo: null,
  };
  // loading...
  componentWillMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  // 转到详情
  toModalMessage = () => {
    location.href = '/#/contract/flow/index/detail/1234';
  }
  // 表格排序查找
  handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      sortedInfo: sorter,
    });
  }
  render() {
    const { loading } = this.state;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    // FormItem控件间隔
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    };
    // 表格列头
    const columns = [
      {
        title: '流程编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: '流程名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '发起人',
        dataIndex: 'sp',
      },
      { title: '发起时间', dataIndex: 'addtime', key: 'addtime' },
      {
        title: '当前处理节点',
        dataIndex: 'currentNode',
      },
      {
        title: '当前处理人',
        dataIndex: 'dp',
      },
    ];
    // 表格数据
    const data = [
      { id: 1234, name: '铝锭贸易类合同审批流程', currentNode: '业务部负责人', dp: '李想', addtime: '2017-08-22', sp: '李雷', updatetime: '暂无' },
    ];
    return (
      <PageHeaderLayout title="审批列表">
        <Card border="false">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6}>
                <FormItem {...formItemLayout} label="流程名称">
                  <Input placeholder="请输入" />
                </FormItem>
              </Col>
              <Col md={6}>
                <FormItem {...formItemLayout} label="发起时间">
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
              <Table
                dataSource={data}
                columns={columns}
                rowKey={record => record.id}
                scroll={{ x: 1000 }}
                onChange={this.handleTableChange}
                loading={loading}
                onRow={record => ({
                  onClick: () => {
                    this.toModalMessage(record);
                  },
                })}
              />
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
