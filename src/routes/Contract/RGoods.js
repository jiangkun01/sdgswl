import React, { PureComponent } from 'react';
import { Row, Col, Card, Table, Select } from 'antd';
import { Bar } from '../../components/Charts';

export default class RContract extends PureComponent {
  state = {
    tabsKey: '1',
  }
  onTabChange = (key) => {
    this.setState({ tabsKey: key });
  }
  render() {
    const { tabsKey } = this.state;
    const exchart = [
      { x: '1月', y: 1785 },
      { x: '2月', y: 1054 },
      { x: '3月', y: 1586 },
      { x: '4月', y: 1430 },
      { x: '5月', y: 1983 },
      { x: '6月', y: 1016 },
      { x: '7月', y: 1580 },
      { x: '8月', y: 1077 },
      { x: '9月', y: 1751 },
      { x: '10月', y: 1216 },
      { x: '11月', y: 1291 },
      { x: '12月', y: 1344 },
    ];
    const imchart = [
      { x: '1月', y: 1284 },
      { x: '2月', y: 1184 },
      { x: '3月', y: 1182 },
      { x: '4月', y: 1297 },
      { x: '5月', y: 1462 },
      { x: '6月', y: 1116 },
      { x: '7月', y: 1166 },
      { x: '8月', y: 1170 },
      { x: '9月', y: 1359 },
      { x: '10月', y: 1007 },
      { x: '11月', y: 1603 },
      { x: '12月', y: 1990 },
    ];
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: `${tabsKey === '1' ? '出库' : '入库'}日期`,
      dataIndex: 'time',
      key: 'time',
    }, {
      title: `${tabsKey === '1' ? '出库' : '入库'}数量`,
      dataIndex: 'number',
      key: 'number',
    }, {
      title: `${tabsKey === '1' ? '出库' : '入库'}单价`,
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '仓库名称',
      dataIndex: 'wname',
      key: 'wname',
    }];
    const dataSourceInput = [{
      id: 1,
      time: '2017-08-22',
      number: '20吨',
      price: '10万元',
      wname: '散货仓库',
    }];
    const dataSourceOut = [{
      id: 1,
      time: '2017-08-23',
      number: '5吨',
      price: '11.5万元',
      wname: '散货仓库',
    }, {
      id: 2,
      time: '2017-08-26',
      number: '10吨',
      price: '11.5万元',
      wname: '散货仓库',
    }];
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    return (
      <div>
        <Row>
          <Card>
            <Col {...topColResponsiveProps} xl={{ span: 6 }}>
              <h3>货物编号：<strong>SDGSWLKH232</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 6 }}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <h3>
                  货物名称：
                  <Select defaultValue="1" style={{ width: '60%' }}>
                    <Select.Option value="1">铝锭</Select.Option>
                  </Select>
                </h3>
              </Row>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 4 }}>
              <h3>货物总重：<strong>20吨</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 4 }}>
              <h3>货物均价：<strong>10万/吨</strong></h3>
            </Col>
            <Col {...topColResponsiveProps} xl={{ span: 4 }}>
              <h3>当前货物总库存：<strong>5吨</strong></h3>
            </Col>
          </Card>
        </Row>
        <br />
        <Row>
          <Col span={11}>
            <Card>
              <Bar height={250} color="#0F6CBF" title="出库情况" data={exchart} />
            </Card>
          </Col>
          <Col span={11} offset={2}>
            <Card>
              <Bar height={250} title="入库情况" data={imchart} />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Card style={{ width: '100%' }} tabList={[{ key: '1', tab: '出库记录' }, { key: '2', tab: '入库记录' }]} onTabChange={(key) => { this.onTabChange(key); }}>
              {tabsKey === '1' ? (
                <Table dataSource={dataSourceOut} columns={columns} scroll={{ x: 1000 }} rowKey="id" />
              ) : (
                <Table dataSource={dataSourceInput} columns={columns} scroll={{ x: 1000 }} rowKey="id" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
