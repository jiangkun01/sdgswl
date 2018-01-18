import React, { PureComponent } from 'react';
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
  Tabs,
  Menu,
  message,
  Modal,
  Checkbox,
  Select,
} from 'antd';
import {
  ChartCard,
  Bar,
} from '../../components/Charts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../Dashboard/Analysis.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const rankingListData = [];
const { SubMenu } = Menu;
const { confirm } = Modal;
const { Option } = Select;
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `测试货种 ${i} 类型`,
    total: 323234,
  });
}
@Form.create()
export default class List extends PureComponent {
  state = {
    modalVisible: false,
  };
  handleMenuClick = (record, e) => {
    if (e.key === '2') {
      message.info('暂无法修改');
      // dispatch({
      //   type: 'userController/isVisible',
      //   isVisible: true,
      //   isPassswordRequired: false,
      //   user: record,
      //   title: '修改',
      // })
    } else if (e.key === '3') {
      confirm({
        title: '确认终止吗？',
        onOk() {
          message.error('有正在执行的履行计划，终止失败，请先终止履行计划');
        },
      });
    }
  }
  render() {
    const { loading } = this.props;
    const { modalVisible } = this.state;
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
    const bStatus = ['新建', '审批中', '审批通过', '完成', '履行中', '终止'];
    const statusMap = ['default', 'processing', 'success', 'success', 'processing', 'error'];
    const columns = [{
      title: '合同编号',
      dataIndex: 'agreementNo',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '合同名称',
      dataIndex: 'agreementName',
      sorter: (a, b) => a.agreementName - b.agreementName,
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
        {
          text: bStatus[4],
          value: 4,
        },
        {
          text: bStatus[5],
          value: 5,
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
      title: '合同金额',
      dataIndex: 'money',
      render: val => <span>{val}万元</span>,
      sorter: (a, b) => a.money - b.money,
    }, {
      title: '合同创建时间',
      dataIndex: 'createDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      sorter: (a, b) => a.createDate - b.createDate,
    }, {
      title: '货物单价',
      dataIndex: 'gUnitPrice',
      render: val => <span>{val}元/吨</span>,
      sorter: (a, b) => a.gUnitPrice - b.gUnitPrice,
    }, {
      title: '货物数量',
      dataIndex: 'gAmount',
      render: val => <span>{val}吨</span>,
      sorter: (a, b) => a.gAmount - b.gAmount,
    }, {
      title: '货物总价',
      dataIndex: 'gSumPrice',
      render: val => <span>{val}万元</span>,
      sorter: (a, b) => a.gSumPrice - b.gSumPrice,
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
      width: 120,
      render: record => (
        <Menu onClick={e => this.handleMenuClick(record, e)}>
          <SubMenu key={record.key} title={<span>更多</span>}>
            <Menu.Item key="1"><a href="/#/business/detail">详情</a></Menu.Item>
            <Menu.Item key="2">修改</Menu.Item>
            <Menu.Item key="3">终止</Menu.Item>
          </SubMenu>
        </Menu>
      ),
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
        bPhone: '2133456',
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        status: (i + 3) % 6,
        money: Math.ceil(Math.random() * 1000),
        createDate: new Date(),
        gAmount: Math.ceil(Math.random() * 100),
        gUnitPrice: Math.ceil(Math.random() * 1000),
        gSumPrice: Math.ceil(Math.random() * 1000),
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
                    <div style={{ overflow: 'hidden', marginTop: '2%' }}>
                      <span style={{ float: 'left', marginBottom: 24 }}>
                        <Button style={{ marginRight: '4px' }} type="primary">+新建</Button> <Checkbox>只显示我发起的合同</Checkbox>
                      </span>
                      <span style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} >重置</Button>
                        <a style={{ marginLeft: 8 }} >
                          展开 <Icon type="down" />
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
        <Modal
          title="新建业务"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务名称"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务类型"
          >
            <Select
              defaultValue="0"
              style={{ width: 200 }}
              onChange={this.handleChange}
            >
              <Option value="0">内贸</Option>
              <Option value="1">外贸</Option>
            </Select>
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
