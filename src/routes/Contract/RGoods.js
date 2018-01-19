import React, { PureComponent } from 'react';
import { Row, Col, Card, Table } from 'antd';
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
    const piechart = [
      { x: '煤炭', y: 1766 },
      { x: '焦炭', y: 1836 },
      { x: '铁矿', y: 1510 },
      { x: '铜矿', y: 1488 },
      { x: '铝框', y: 1075 },
      { x: '其他', y: 1161 },
    ];
    const columns = [{
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
      title: '销售合同编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '销售合同名称',
      dataIndex: 'name',
      key: 'name',
    }];
    const name = ['长期煤炭运输合同', '短期运输合同', '长期焦炭运输合同', '长期运输合同', '短期杂货运输合同', '长期内贸运输合同', '短期内贸运输合同', '长期外贸运输合同', '短期外贸运输合同', '中小型运输合同', '大型运输合同'];
    const dataSource = [];
    for (let i = 1; i < 12; i += 1) {
      dataSource.push({
        time: i < 10 ? `2017-0${i}-0${i}` : `2017-${i}-${i}`,
        number: `${Math.round((Math.random() * 30) + 30)}吨`,
        price: `${Math.round((Math.random() * 15) + 15)}万元`,
        id: i < 10 ? `20170${i}0${i}${Math.round((Math.random() * 8999) + 1000)}` : `2017${i}${i}${Math.round((Math.random() * 8999) + 1000)}`,
        name: name[Math.round((Math.random() * 10) + 0)],
      });
    }
    return (
      <div>
        <Row>
          <Col span={6}><h3>货物编号：<strong>SDGSWLKH232</strong></h3></Col>
          <Col span={6}><h3>货物名称：<strong>浓缩果汁500吨</strong></h3></Col>
          <Col span={4}><h3>货物总重：<strong>500吨</strong></h3></Col>
          <Col span={4}><h3>货物均价：<strong>6万/吨</strong></h3></Col>
          <Col span={4}><h3>当前货物总库存：<strong>6万</strong></h3></Col>
        </Row>
        <br />
        <Row>
          <Col span={8}>
            <Card>
              <Bar height={250} title="出库情况" data={exchart} />
            </Card>
          </Col>
          <Col span={8} offset={1}>
            <Card>
              <Bar height={250} title="入库情况" data={imchart} />
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <Card>
              <Bar height={250} title="库存情况" data={piechart} />
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Card style={{ width: '100%' }} tabList={[{ key: '1', tab: '出库记录' }, { key: '2', tab: '入库记录' }]} onTabChange={(key) => { this.onTabChange(key); }}>
              <Table dataSource={dataSource} columns={columns} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
