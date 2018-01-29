import React, { PureComponent } from 'react';
import { Row, Col, Card, Tooltip, Tabs, Icon } from 'antd';
import { ChartCard } from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Information from './Information';
import Plan from './Plan';
import RContract from './RContract';
import RGoods from './RGoods';
import Modify from './Modify';
import Annex from './Annex';

export default class Details extends PureComponent {
  state = {
    tabsKey: '1',
  }
  componentWillMount() {
    this.tabsCallback(this.props.match.params.dStatus);
  }
  tabsCallback = (key) => {
    this.setState({ tabsKey: key });
  }
  render() {
    const { tabsKey } = this.state;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    return (
      <PageHeaderLayout title="详情页">
        <Row gutter={16}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="合同销售总额"
              action={
                <Tooltip title="合同销售总额">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="321.66（万元）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #1890FF' }}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="已回款金额"
              action={
                <Tooltip title="已回款金额">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="0（万元）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #13C2C2' }}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="已付款金额"
              action={
                <Tooltip title="已付款金额">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="0（万元）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #E9686B' }}
            />
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              title="预计实现收入"
              action={
                <Tooltip title="预计实现收入">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="32（万元）"
              footer=""
              contentHeight={46}
              style={{ borderTop: '4px solid #CB0A12' }}
            />
          </Col>
        </Row>
        <Card border="false">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col {...topColResponsiveProps} xl={{ span: 4 }}>
              <h3>发起人：<strong>李雷</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 5 }}>
              <h3>发起日期：<strong>2017-08-21</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 8 }}>
              <h3>合同发起部门：<strong>山东高速物流公司管控部</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 5 }}>
              <h3>合同状态：<strong>履约中</strong></h3>
            </Col>
          </Row>
        </Card>
        <br />
        <Card border="false">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col span={22} offset={1}>
              <Tabs defaultActiveKey={tabsKey} type="card" onChange={this.tabsCallback}>
                <Tabs.TabPane tab="合同基本信息" key="1">
                  <Information />
                </Tabs.TabPane>
                <Tabs.TabPane tab="履行计划" key="2">
                  <Plan />
                </Tabs.TabPane>
                <Tabs.TabPane tab="关联合同" key="3">
                  <RContract />
                </Tabs.TabPane>
                <Tabs.TabPane tab="关联货物" key="4">
                  <RGoods />
                </Tabs.TabPane>
                <Tabs.TabPane tab="合同变更信息" key="5">
                  <Modify />
                </Tabs.TabPane>
                <Tabs.TabPane tab="合同附件" key="6">
                  <Annex />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
