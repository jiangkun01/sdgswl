import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, Table, DatePicker } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;

@connect(({ ccategory, loading }) => ({
  ccategory,
  loading: loading.models.rule,
}))
@Form.create()
export default class Document extends PureComponent {
  state = {
    loading: false,
    filteredInfo: null,
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
    location.href = '/#/contract/index/details/6';
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
    const { loading } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
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
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      },
      {
        title: '合同名称',
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
      { title: '合同文档数量', dataIndex: 'number', key: 'number' },
      { title: '添加时间', dataIndex: 'addtime', key: 'addtime' },
      { title: '修改时间', dataIndex: 'updatetime', key: 'updatetime' }];
    // 表格数据
    const data = [
      { id: 1, name: '铝锭销售合同', number: '4', addtime: '2017-08-22', updatetime: '暂无' },
      { id: 2, name: '铝锭代理销售合同', number: '4', addtime: '2017-08-26', updatetime: '暂无' },
      { id: 3, name: '铝锭代理采购合同', number: '4', addtime: '2017-08-28', updatetime: '暂无' },
    ];
    return (
      <PageHeaderLayout title="合同相关文档">
        <Card border="false">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={6}>
                <FormItem {...formItemLayout} label="合同名称">
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
              <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
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
