import React, { PureComponent } from 'react';
import { Row, Col, Card, Table, Select } from 'antd';
import { View } from '@antv/data-set';
import { Chart, Axis, Geom, Legend, Tooltip } from 'bizcharts';
import styles from './index.less';

export default class RContract extends PureComponent {
  state = {
    tabsKey: '1',
  }
  onTabChange = (key) => {
    this.setState({ tabsKey: key });
  }
  render() {
    const { tabsKey } = this.state;
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
      title: '库存',
      dataIndex: 'aount',
    }, {
      title: '仓库名称',
      dataIndex: 'wname',
      key: 'wname',
    }];
    const dataSourceInput = [{
      id: 1,
      time: '2017-08-22',
      number: '28吨',
      aount: '28吨',
      price: '10万元',
      wname: '散货仓库',
    }];
    const dataSourceOut = [{
      id: 1,
      time: '2017-08-23',
      number: '5吨',
      aount: '23吨',
      price: '11.5万元',
      wname: '散货仓库',
    }, {
      id: 2,
      time: '2017-08-26',
      number: '23吨',
      aount: '0吨',
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
    const salesData = [
      { name: '采购', '一月 ': 18, '二月 ': 28, '三月 ': 39, '四月 ': 81, '五月 ': 47, '六月 ': 20, '七月 ': 24, '八月 ': 35, '九月 ': 41, '十月 ': 70, '十一月 ': 55, '十二月 ': 68 },
      { name: '销售', '一月 ': 20, '二月 ': 33, '三月 ': 44, '四月 ': 99, '五月 ': 52, '六月 ': 35, '七月 ': 37, '八月 ': 42, '九月 ': 45, '十月 ': 80, '十一月 ': 65, '十二月 ': 78 },
    ];
    const trendsData = new View().source(salesData);
    trendsData.transform({
      type: 'fold',
      fields: ['一月 ', '二月 ', '三月 ', '四月 ', '五月 ', '六月 ', '七月 ', '八月 ', '九月 ', '十月 ', '十一月 ', '十二月 '], // 展开字段集
      key: 'month', // key字段
      value: 'members', // value字段
    });
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
          <Col span={24}>
            <Card title="采购/销售（吨）">
              <Chart height={250} data={trendsData} forceFit>
                <Axis name="month" />
                <Axis name="members" />
                <Legend />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom
                  type="interval"
                  position="month*members"
                  color="name"
                  adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
                />
              </Chart>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Card style={{ width: '100%' }} tabList={[{ key: '1', tab: '出库记录' }, { key: '2', tab: '入库记录' }]} onTabChange={(key) => { this.onTabChange(key); }}>
              {tabsKey === '1' ? (
                <Table className={styles.defaultCursor} dataSource={dataSourceOut} columns={columns} scroll={{ x: 1000 }} rowKey="id" />
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
