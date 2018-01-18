import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Icon,
  Card,
  Table,
  Tooltip,
  Form,
  Button,
  Input,
  Badge,
  Tabs,
} from 'antd';
import {
  ChartCard,
  Bar,
} from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Dashboard/Analysis.less';
import { getTimeDistance } from '../../utils/utils';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `测试货种 ${i} 类型`,
    total: 323234,
  });
}
@Form.create()
export default class List extends PureComponent {
  state = {
    rangePickerValue: getTimeDistance('year'),
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
    const { loading } = this.props;
    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 100) + 10,
      });
    }
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    // table
    const bType = ['采购', '质检合同', '物流', '仓储', '销售合同'];
    const statusMap = ['default', 'processing', 'success', 'success', 'processing'];
    const columns = [{
      title: '序号',
      dataIndex: 'no',
      sorter: (a, b) => a.no - b.no,
    }, {
      title: '合同编号',
      dataIndex: 'agreementNo',
    }, {
      title: '合同名称',
      dataIndex: 'agreementName',
    }, {
      title: '合同类型',
      dataIndex: 'type',
      filters: [
        {
          text: bType[0],
          value: 0,
        },
        {
          text: bType[1],
          value: 1,
        },
        {
          text: bType[2],
          value: 2,
        },
        {
          text: bType[3],
          value: 3,
        },
        {
          text: bType[4],
          value: 4,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={bType[val]} />;
      },
    }, {
      title: '客户名称',
      dataIndex: 'bName',
    }, {
      title: '客户电话',
      dataIndex: 'bPhone',
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="#">详情</a>,
    }];
    const data = [];
    for (let i = 5; i < 20; i += 1) {
      data.push({
        key: i,
        no: i + 1,
        agreementNo: `2017SDHSLGGMZH000${i + 1}`,
        agreementName: `测试合同数据${i + 1}`,
        type: i % 5,
        bName: `测试数据${i + 1}`,
        bPhone: '测试数据 2133456',
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      });
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <div style={{ padding: '30px' }}>
            <Row gutter={16}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="当月完成合同"
                  action={
                    <Tooltip title="当月完成合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="111（份）"
                  footer=""
                  contentHeight={46}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="当月执行合同"
                  action={
                    <Tooltip title="当月执行合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="11（份）"
                  footer=""
                  contentHeight={46}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="当月违约合同"
                  action={
                    <Tooltip title="当月执行合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="5（份）"
                  footer=""
                  contentHeight={46}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title="当月终止合同"
                  action={
                    <Tooltip title="当月终止合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="6（份）"
                  footer=""
                  contentHeight={46}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
                  <div className={styles.salesCard}>
                    <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                      <TabPane tab="2017年新签合同统计（份）" key="sales">
                        <Row>
                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <div className={styles.salesBar}>
                              <Bar height={295} title="合同签订统计" data={salesData} />
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                    </Tabs>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Card
                  className={styles.salesCard}
                  loading={loading}
                  bordered={false}
                  bodyStyle={{ padding: 24 }}
                  style={{ marginTop: 24, minHeight: 509 }}
                >
                  <Form onSubmit={this.handleSearch} layout="inline">
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                      <Col md={8} sm={24}>
                        <FormItem label="合同编号">
                          {getFieldDecorator('b_name')(
                            <Input placeholder="请输入" />
                          )}
                        </FormItem>
                      </Col>
                      <Col md={8} sm={24}>
                        <FormItem label="合同名称">
                          {getFieldDecorator('b_name')(
                            <Input placeholder="请输入" />
                          )}
                        </FormItem>
                      </Col>
                      <Col md={8} sm={24}>
                        <FormItem label="客户名称">
                          {getFieldDecorator('no')(
                            <Input style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <div style={{ overflow: 'hidden' }}>
                      <span style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} >重置</Button>
                        <a style={{ marginLeft: 8 }} >
                          收起 <Icon type="up" />
                        </a>
                      </span>
                    </div>
                  </Form>
                  <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={record => record.key}
                    scroll={{ x: 1366 }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
