import React, { Component } from 'react';
import { Row, Col, Tooltip, Card, Tabs, Table, Icon } from 'antd';
import { ChartCard } from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class list extends Component {
  state = {
    tabsKey: '1',
  }
  todoClick = (val) => {
    this.setState({ tabsKey: val });
  }
  tabsChange = (val) => {
    this.setState({ tabsKey: val });
  }
  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 6,
      style: { marginBottom: 24 },
    };
    const columns = [
      { title: '编号', dataIndex: 'id', key: 'id' },
      {
        title: this.state.tabsKey === '1' ? '任务名称' : this.state.tabsKey === '2' ? '履行计划名称' : this.state.tabsKey === '3' ? '合同名称' : '流程名称',
        dataIndex: 'name',
        key: 'name',
      },
      { title: '最晚处理时间', dataIndex: 'time', key: 'time' },
      {
        title: '',
        key: 'message',
        render: () => (
          <span>
            <a href="#">详情</a>
          </span>
        ),
      },
    ];
    const data = [
      { key: '1', id: '1', name: '名称1', time: '2018-02-28' },
    ];
    return (
      <PageHeaderLayout title="待办事项">
        <Row gutter={16}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待处理事项"
              action={
                <Tooltip title="待处理事项">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #1890FF' }}
              onClick={() => this.todoClick('1')}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待处理履行计划"
              action={
                <Tooltip title="待处理履行计划">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #13C2C2' }}
              onClick={() => this.todoClick('2')}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待处理合同"
              action={
                <Tooltip title="待处理合同">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #E9686B' }}
              onClick={() => this.todoClick('3')}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待审批流程"
              action={
                <Tooltip title="待审批流程">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #E9686B' }}
              onClick={() => this.todoClick('4')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <Tabs activeKey={this.state.tabsKey} onChange={this.tabsChange}>
                <Tabs.TabPane tab="待处理事项" key="1">
                  <Table columns={columns} dataSource={data} rowKey={record => record.key} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待处理履行计划" key="2">
                  <Table columns={columns} dataSource={data} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待处理合同" key="3">
                  <Table columns={columns} dataSource={data} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待审批流程" key="4">
                  <Table columns={columns} dataSource={data} />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
