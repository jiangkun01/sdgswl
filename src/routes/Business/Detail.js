import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
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
  BackTop,
  Divider,
} from 'antd';
import {
  ChartCard,
  yuan,
  Pie,
} from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Dashboard/Analysis.less';
import RGoods from '../Contract/RGoods';

const FormItem = Form.Item;
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Detail extends PureComponent {
  onClickOne = () => {
    this.props.dispatch(routerRedux.push('/contract/index/details/1'));
  }
  render() {
    const { loading } = this.props;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    const purchasePieData = [
      {
        x: '已支出',
        y: 560,
      },
      {
        x: '未付款',
        y: 440,
      },
    ];
    const receivedaymentsPieData = [
      {
        x: '已回款',
        y: 660,
      },
      {
        x: '未回款',
        y: 560,
      },
    ];
    // table
    const bType = ['采购', '质检合同', '物流', '仓储', '销售合同'];
    const bStatus = ['新建', '完成', '履行中', '终止'];
    const statusMap = ['default', 'success', 'processing', 'error', 'processing', 'processing'];
    const columns = [{
      title: '合同编号',
      dataIndex: 'agreementNo',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '合同名称',
      dataIndex: 'agreementName',
    }, {
      title: '合同状态',
      dataIndex: 'status',
      filters: [
        {
          text: bStatus[0],
          value: 0,
        },
        {
          text: bStatus[1],
          value: 1,
        },
        {
          text: bStatus[2],
          value: 2,
        },
        {
          text: bStatus[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={bStatus[val]} />;
      },
      sorter: (a, b) => a.status - b.status,
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
      sorter: (a, b) => a.type - b.type,
    }, {
      title: '合同创建时间',
      dataIndex: 'createDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      sorter: (a, b) => a.createDate - b.createDate,
    }, {
      title: '客户名称',
      dataIndex: 'bName',
    }, {
      title: '客户电话',
      dataIndex: 'bPhone',
    }];
    const data = [];
    for (let i = 5; i < 10; i += 1) {
      if (i === 5) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGMZH000${i + 1}`,
          agreementName: '铝锭采购合同',
          type: i % 5,
          bName: '上海六易贸易有限公司',
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 6,
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 6) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGMZH000${i + 1}`,
          agreementName: '铝锭质检合同',
          type: i % 5,
          bName: 'XX检测公司',
          bPhone: '400-12-123',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 6,
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 7) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGMZH000${i + 1}`,
          agreementName: '铝锭物流合同',
          type: i % 5,
          bName: '山东高速物流标准箱分公司',
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: 1,
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 8) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGMZH000${i + 1}`,
          agreementName: '铝锭仓储合同',
          type: i % 5,
          bName: '山东高速青岛物流发展有限公司',
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: 3,
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 9) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGMZH000${i + 1}`,
          agreementName: '铝锭销售合同',
          type: i % 5,
          bName: '新疆大陆桥集团有限公司',
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 6,
          gender: 'M',
          createDate: new Date(),
        });
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout title="铝锭业务0详情">
        <div className={styles.standardList}>
          <BackTop />
          <div style={{ padding: '30px' }}>
            <Row gutter={16} style={{ marginTop: '-30px' }}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="已支出采购金额"
                  action={
                    <Tooltip title="已支出采购金额">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="￥560 万"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #1890FF' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="截止当前已销售金额"
                  action={
                    <Tooltip title="截止当前已销售金额">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="￥760 万"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #13C2C2' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="截止当前已回款金额"
                  action={
                    <Tooltip title="截止当前已回款金额">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="￥660 万"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #1890FF' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="截止当前已实现利润"
                  action={
                    <Tooltip title="截止当前已实现利润">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="￥100 万"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #7EC1B2' }}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Card
                  className={styles.salesCard}
                  loading={loading}
                  bordered={false}
                  title="截止当前采购资金统计（万）"
                  bodyStyle={{ padding: 24 }}
                  style={{ minHeight: 300 }}
                >
                  <h4 style={{ marginTop: 8, marginBottom: 32 }}>采购额 ￥1000 （万）</h4>
                  <Pie
                    hasLegend
                    subTitle="采购金额"
                    total="￥1000（万）"
                    data={purchasePieData}
                    valueFormat={val => yuan(val)}
                    height={248}
                    lineWidth={5}
                  />
                </Card>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Card
                  className={styles.salesCard}
                  bordered={false}
                  title="截止当前回款资金统计（万）"
                  bodyStyle={{ padding: 24 }}
                  style={{ minHeight: 300 }}
                >
                  <h4 style={{ marginTop: 8, marginBottom: 32 }}>回款金额 ￥1200 （万）</h4>
                  <Pie
                    hasLegend
                    subTitle="回款金额"
                    total="￥1200（万）"
                    data={receivedaymentsPieData}
                    valueFormat={val => yuan(val)}
                    height={248}
                    lineWidth={5}
                  />
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
                  <Divider>合同信息</Divider>
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
                    <div style={{ overflow: 'hidden', marginTop: '2%' }}>
                      <span style={{ float: 'left', marginBottom: 24 }}>
                        <Button icon="plus" type="primary" style={{ marginRight: '4px' }} ><a href="/#/contract/create/info" style={{ color: 'white' }}>发起新合同</a></Button>
                      </span>
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
                    onRow={record => ({
                      onClick: () => {
                        this.onClickOne(record);
                      },
                    })}
                  />
                  <Divider>货物信息</Divider>
                  <RGoods />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
