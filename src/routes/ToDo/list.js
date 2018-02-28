import React, { Component } from 'react';
import { Row, Col, Tooltip, Card, Tabs, Icon } from 'antd';
import { ChartCard } from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './list.less';
import Message from './Message';
import Task from './Task';
import CarryPlan from './CarryPlan';
import ApprovalPlan from './ApprovalPlan';
import Contract from './Contract';
import Process from './Process';

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
      xl: 4,
      style: { marginBottom: 24 },
    };
    return (
      <PageHeaderLayout title="待办事项">
        <Row gutter={16}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待回复消息"
              action={
                <Tooltip title="待回复消息">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #FF6347' }}
              onClick={() => this.todoClick('1')}
            />
          </Col>
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
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #009ACD' }}
              onClick={() => this.todoClick('2')}
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
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #7B68EE' }}
              onClick={() => this.todoClick('3')}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="待审批履行计划"
              action={
                <Tooltip title="待审批履行计划">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="2（条）"
              footer=""
              contentHeight={46}
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #1890FF' }}
              onClick={() => this.todoClick('4')}
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
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #13C2C2' }}
              onClick={() => this.todoClick('5')}
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
              className={styles.chartCardhover}
              style={{ borderTop: '4px solid #8B1A1A' }}
              onClick={() => this.todoClick('6')}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <Tabs activeKey={this.state.tabsKey} onChange={this.tabsChange}>
                <Tabs.TabPane tab="待回复信息" key="1">
                  <Message />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待处理事项" key="2">
                  <Task />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待处理履行计划" key="3">
                  <CarryPlan />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待审批履行计划" key="4">
                  <ApprovalPlan />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待处理合同" key="5">
                  <Contract />
                </Tabs.TabPane>
                <Tabs.TabPane tab="待审批流程" key="6">
                  <Process />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
