import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Chart, Axis, Geom, Legend, Tooltip } from 'bizcharts';
import { View } from '@antv/data-set';
import {
  Row,
  Col,
  Card,
  Tabs,
  Radio,
  Icon,
  DatePicker,
  Table,
  Badge,
} from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  Field,
  Pie,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
rankingListData.push({
  title: '氧化铝',
  total: 1423234,
});
rankingListData.push({
  title: '氧锭',
  total: 523234,
});
rankingListData.push({
  title: '乙二酸',
  total: 423234,
});
rankingListData.push({
  title: '焦炭',
  total: 323234,
});
const statusMap = ['default', 'processing', 'success', 'error'];

@connect(({ chart, rule, loading }) => ({
  chart,
  rule,
  loading: loading.effects['chart/fetch'],
  loading1: loading.effects['rule/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    rangePickerValue: getTimeDistance('year'),
    salesType1: 'all',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
    this.props.dispatch({
      type: 'rule/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }
  onClickOne = () => {
    this.props.dispatch(routerRedux.push('/business/detail'));
  }
  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  };
  handleChangeSalesType1 = (e) => {
    this.setState({
      salesType1: e.target.value,
    });
  };
  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }
  render() {
    const { rangePickerValue, salesType, salesType1 } = this.state;
    const { chart, loading, rule, loading1 } = this.props;
    const {
      visitData,
      visitData1,
      salesData,
      salesTypeData,
      salesTypeData1,
      salesTypeDataOnline,
      salesTypeDataOnline1,
      salesTypeDataOffline,
      salesTypeDataOffline1,
    } = chart;
    const { data } = rule;
    console.log(data.list);
    const status = ['新建', '已完成', '履行中', '终止'];
    const bType = ['内贸', '外贸'];
    const columns = [
      {
        title: '业务编号',
        dataIndex: 'no',
        width: 200,
        fixed: 'left',
        sorter: (a, b) => a.no - b.no,
      },
      {
        title: '业务名称',
        dataIndex: 'bName',
      },
      {
        title: '业务类型',
        dataIndex: 'BType',
        filters: [
          {
            text: bType[0],
            value: 0,
          },
          {
            text: bType[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={bType[val]} />;
        },
        sorter: (a, b) => a.BType - b.BType,
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorter: (a, b) => a.createdAt - b.createdAt,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '业务描述',
        dataIndex: 'title',
        key: 'title',
      },
    ];
    const salesPieData1 =
      salesType1 === 'all'
        ? salesTypeData1
        : salesType1 === 'online' ? salesTypeDataOnline1 : salesTypeDataOffline1;
    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 4,
      style: { marginBottom: 24 },
    };
    const trendsData = new View().source(salesData);
    trendsData.transform({
      type: 'fold',
      fields: ['一月 ', '二月 ', '三月 ', '四月 ', '五月 ', '六月 ', '七月 ', '八月 ', '九月 ', '十月 ', '十一月 ', '十二月 '], // 展开字段集
      key: 'month', // key字段
      value: 'members', // value字段
    });
    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017-12-30贸易类业务利润"
              action={
                <span title="贸易类业务利润">
                  <Icon type="red-envelope" />
                </span>
              }
              total="￥26 千万"
              footer={<Field label="月利润额：" value={`￥${numeral(12423).format('0,0')} 万`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                月同比<span className={styles.trendText}>￥12 万</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017年贸易类合同总额"
              action={
                <span title="2017年贸易类合同总额">
                  <Icon type="line-chart" />
                </span>
              }
              total="￥1，636亿"
              footer={<Field label="最佳月份" value={`￥${numeral(23756).format('0,0')} 万`} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017年完成合同累计（份）"
              action={
                <span title="2017年完成合同累计（份">
                  <Icon type="bar-chart" />
                </span>
              }
              total={numeral(120).format('0,0')}
              footer={<Field label="单月完成最大合同数" value="20" />}
              contentHeight={46}
            >
              <MiniBar data={visitData1} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017年12月合同逾期"
              action={
                <span title="2017年12月合同逾期">
                  <Icon type="frown-o" />
                </span>
              }
              total={8}
              footer={<Field label="周逾期合同：" value={`${numeral(1).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>1</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017年12月违约合同"
              action={
                <span title="2017年12月违约合同">
                  <Icon type="frown-o" />
                </span>
              }
              total={11}
              footer={<Field label="周违约合同：" value={`${numeral(2).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="down" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>1</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017年12月超支合同"
              action={
                <span title="2017年12月超支合同">
                  <Icon type="frown-o" />
                </span>
              }
              total={13}
              footer={<Field label="周超支合同：" value={`${numeral(3).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="down" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>3</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="2017年采购（销售）额(万元)" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
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
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>货种利润排名（万元）</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24} >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="当月采购额货种占比（万）"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType1} onChange={this.handleChangeSalesType1}>
                      <Radio.Button value="all">全部类型</Radio.Button>
                      <Radio.Button value="online">内贸</Radio.Button>
                      <Radio.Button value="offline">外贸</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>采购额</h4>
              <Pie
                hasLegend
                subTitle="采购额"
                total={`${yuan(salesPieData1.reduce((pre, now) => now.y + pre, 0))} 万元`}
                data={salesPieData1}
                valueFormat={val1 => val1}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="当月销售额类别占比（万）"
              bodyStyle={{ padding: 24 }}
              extra={
                <div className={styles.salesCardExtra}>
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">全部类型</Radio.Button>
                      <Radio.Button value="online">内贸</Radio.Button>
                      <Radio.Button value="offline">外贸</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
              <Pie
                hasLegend
                subTitle="销售额"
                total={`${yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))} 万元`}
                data={salesPieData}
                valueFormat={val => yuan(val)}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: '20px' }}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card title="关注业务">
              <Table
                loading={loading1}
                dataSource={data.list}
                columns={columns}
                onRow={record => ({
                  onClick: () => {
                    this.onClickOne(record);
                  },
                })}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
