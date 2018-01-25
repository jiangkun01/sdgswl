import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps, Row, Col, Divider, Icon } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../../Forms/style.less';

const { Step } = Steps;

export default class Index extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    console.log(pathList[pathList.length - 1]);
    switch (pathList[pathList.length - 1]) {
      case 'info': return 0;
      case 'confirm': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Row>
            <Col span={7} offset={1}><h2><Icon type="folder" style={{ color: '#3AA1FF', fontSize: 20 }} />&nbsp;<strong>发起新合同</strong></h2></Col>
          </Row>
          <Divider />
          <Row>
            <Col span={7} offset={1}><h3>发起人：<strong>李雷</strong></h3></Col>
            <Col span={7} offset={1}><h3>发起日期：<strong>2017-01-01</strong></h3></Col>
            <Col span={7} offset={1}><h3>合同发起部门：<strong>标准箱公司业务部</strong></h3></Col>
          </Row>
          <Divider style={{ marginBottom: 34 }} />
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="合同基本信息" />
              <Step title="关联业务" />
              <Step title="已提交" />
            </Steps>
            <Switch>
              {
                getRoutes(match.path, routerData).map(item => (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ))
              }
              <Redirect exact from="/contract/create" to="/contract/create/info" />
              <Route render={NotFound} />
            </Switch>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
