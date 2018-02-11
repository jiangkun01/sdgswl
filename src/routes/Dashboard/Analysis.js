import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Radio,
  DatePicker,
  Tooltip,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  Field,
  Bar,
  Pie,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `测试货种 ${i} 类型`,
    total: 323234,
  });
}

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
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
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
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
    const { chart, loading } = this.props;
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
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
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
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <div>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="2017-12-30贸易类业务利润"
              action={
                <Tooltip title="2017-12-30贸易类业务利润">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="￥126560 万"
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
                <Tooltip title="2017年贸易类合同总额">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="￥1636000 万"
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
                <Tooltip title="2017年完成合同累计">
                  <Icon type="info-circle-o" />
                </Tooltip>
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
              title="2017年12月履行中的合同统计"
              action={
                <Tooltip title="2017-12月合同履行中统计">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={126}
              footer={<Field label="周履行合同：" value={`${numeral(13).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>1</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="2017年采购额(万)" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="采购额趋势" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>货种采购排名</h4>
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
              <TabPane tab="2017年销售额（万）" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="销售额趋势" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>货种销售排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 && styles.active}>{i + 1}</span>
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

        <Row gutter={24}>
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
      </div>
    );
  }
}
