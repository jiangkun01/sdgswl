import React, { PureComponent } from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Information from './Information';
import Plan from './Plan';
import RContract from './RContract';
import RGoods from './RGoods';
import Modify from './Modify';
import Annex from './Annex';

@connect(({ status, loading }) => ({
  status,
  loading: loading.models.rule,
}))
export default class Details extends PureComponent {
  state = {
    tabsKey: '1',
  }
  componentWillMount() {
    const dDatas = this.props.location.search.substr(1).split('&');
    let tK = '1';
    for (let i = 0; i < dDatas.length; i += 1) {
      tK = dDatas[i].indexOf('dStatus') >= 0 ? dDatas[i].substr(dDatas[i].indexOf('=') + 1) : '1';
    }
    this.tabsCallback(tK);
  }
  tabsCallback = (key) => {
    this.setState({ tabsKey: key });
  }
  render() {
    const { tabsKey } = this.state;
    return (
      <PageHeaderLayout title="详情页">
        <Card border="false">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col span={4} offset={1}><h3>发起人：<strong>李雷</strong></h3></Col>
            <Col span={5}><h3>发起日期：<strong>2017-01-01</strong></h3></Col>
            <Col span={7}><h3>合同发起部门：<strong>山东高速物流公司管控部</strong></h3></Col>
            <Col span={5}><h3>合同状态：<strong>已执行</strong></h3></Col>
          </Row>
          {
            tabsKey === '1' && (
              <br />
            )
          }
          {
            tabsKey === '1' && (
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col span={5} offset={1}><h3>合同销售总额：<strong>122.4 万元</strong></h3></Col>
                <Col span={5}><h3>已回款金额：<strong>22 万元</strong></h3></Col>
                <Col span={5}><h3>已付款金额：<strong>22 万元</strong></h3></Col>
                <Col span={5}><h3>预计实现收入：<strong>32 万元</strong></h3></Col>
              </Row>
            )
          }
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
