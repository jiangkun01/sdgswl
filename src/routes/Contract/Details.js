import React, { PureComponent } from 'react';
import { Row, Col, Card, Tabs, Form, Input, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
@Form.create()

export default class Details extends PureComponent {
  tabsCallback = (key) => {
    alert(key);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 5 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };
    return (
      <PageHeaderLayout title="合同详情">
        <Card border={false}>
          <Row>
            <Col span={5} offset={1}><h3>发起人：<strong>李雷</strong></h3></Col>
            <Col span={5} offset={1}><h3>发起日期：<strong>2017-01-01</strong></h3></Col>
            <Col span={5} offset={1}><h3>合同发起部门：<strong>山东高速物流公司管控部</strong></h3></Col>
            <Col span={5} offset={1}><h3>合同状态：<strong>已执行</strong></h3></Col>
          </Row>
          <br />
          <Row>
            <Col span={5} offset={1}><h3>合同销售总额：<strong>122.4 万元</strong></h3></Col>
            <Col span={5} offset={1}><h3>已回款金额：<strong>22 万元</strong></h3></Col>
            <Col span={5} offset={1}><h3>已付款金额：<strong>22 万元</strong></h3></Col>
            <Col span={5} offset={1}><h3>预计实现收入：<strong>32 万元</strong></h3></Col>
          </Row>
          <br />
          <Tabs type="card" onChange={this.tabsCallback}>
            <Tabs.TabPane tab="合同基本信息" key="1">
              <Form onSubmit={this.handleSubmit}>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <FormItem {...formItemLayout} label="类别名称">
                      {getFieldDecorator('b_name')(
                        <Input placeholder="请输入" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem>
                      <Button type="primary" htmlType="submit">查询</Button>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="履行计划" key="2">
              123
            </Tabs.TabPane>
            <Tabs.TabPane tab="关联合同" key="3">
              123
            </Tabs.TabPane>
            <Tabs.TabPane tab="关联货物" key="4">
              123
            </Tabs.TabPane>
            <Tabs.TabPane tab="合同变更信息" key="5">
              123
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
