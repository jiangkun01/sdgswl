import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
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
  Divider,
  message,
  Modal,
  Checkbox,
  DatePicker,
  Select,
  InputNumber,
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
const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `测试货种 ${i} 类型`,
    total: 323234,
  });
}
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class List extends PureComponent {
  state = {
    modalVisible: false,
    isInput: 'none',
    isOutput: 'none',
    isQuality: 'none',
    isPay: 'none',
    isInputRequired: false,
    isOutRequired: false,
    destroyOnClose: true,
  };
  // handleMenuClick = (record, e) => {
  //   if (e.key === '2') {
  //     message.info('暂无法修改');
  //     // dispatch({
  //     //   type: 'userController/isVisible',
  //     //   isVisible: true,
  //     //   isPassswordRequired: false,
  //     //   user: record,
  //     //   title: '修改',
  //     // })
  //   } else if (e.key === '3') {
  //     confirm({
  //       title: '确认终止吗？',
  //       onOk() {
  //         message.error('有正在执行的履行计划，终止失败，请先终止履行计划');
  //       },
  //     });
  //   }
  // };
  onClickOne = (e, record) => {
    if (e.target.localName !== 'a') {
      this.props.dispatch(routerRedux.push('/contract/index/details/1', record));
    }
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
    this.props.form.resetFields();
  };
  handleAdd = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success('添加成功');
        this.props.dispatch(routerRedux.push('/contract/index/details?dStatus=2'));
        this.setState({
          modalVisible: false,
        });
      }
    });
  }
  deteteOne =() => {
    confirm({
      title: '确认终止吗？',
      onOk() {
        message.error('合同暂无法删除');
      },
    });
  };
  updateOne =() => {
    message.error('合同暂无法修改');
  };
  changeCTemplat = (value) => {
    if (value === '0') {
      this.setState({
        isInput: 'block',
        isOutput: 'none',
        isQuality: 'none',
        isPay: 'none',
        isInputRequired: true,
        isOutRequired: false,
      });
    } else if (value === '1') {
      this.setState({
        isInput: 'none',
        isOutput: 'block',
        isQuality: 'none',
        isPay: 'none',
        isInputRequired: false,
        isOutRequired: true,
      });
    } else if (value === '2') {
      this.setState({
        isInput: 'none',
        isOutput: 'none',
        isQuality: 'none',
        isPay: 'block',
        isInputRequired: false,
        isOutRequired: true,
      });
    } else if (value === '3') {
      this.setState({
        isInput: 'none',
        isOutput: 'none',
        isQuality: 'block',
        isPay: 'none',
        isInputRequired: false,
        isOutRequired: true,
      });
    }
  };
  render() {
    const { loading } = this.props;
    const { modalVisible, isInput, isOutput, isInputRequired,
      isOutRequired, isQuality, isPay } = this.state;
    const salesData = [];
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
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
    const bStatus = ['新建', '完成', '履行中', '终止'];
    const statusMap = ['default', 'processing', 'success', 'success', 'processing', 'error'];
    const bStatusMap = ['default', 'success', 'processing', 'error'];
    const columns = [{
      title: '合同编号',
      dataIndex: 'agreementNo',
      width: 200,
      fixed: 'left',
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
      ],
      render(val) {
        return <Badge status={bStatusMap[val]} text={bStatus[val]} />;
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
      title: '操作',
      key: 'operation',
      width: 260,
      fixed: 'right',
      render: () => (
        <span>
          <a href="/#/contract/index/details/2">查看履行计划</a>
          <Divider type="vertical" />
          <a href="/#/contract/create/">修改</a>
          <Divider type="vertical" />
          <a onClick={this.deteteOne}>终止</a>
        </span>
      ),
    }];
    const data = [];
    for (let i = 5; i < 10; i += 1) {
      if (i === 5) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGM000${i + 1}`,
          agreementName: '铝锭采购合同',
          type: 0,
          bName: `测试数据${i + 1}`,
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 4,
          money: 320.66,
          createDate: new Date(),
          gAmount: 222,
          gUnitPrice: 14450,
          gSumPrice: 320.66,
        });
      } else if (i === 6) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGM000${i + 1}`,
          agreementName: '铝锭质检合同',
          type: 1,
          bName: `测试数据${i + 1}`,
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 4,
          money: 0.66,
          createDate: new Date(),
          gAmount: 0.01,
          gUnitPrice: 0.66,
          gSumPrice: 0.66,
        });
      } else if (i === 7) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGM000${i + 1}`,
          agreementName: '铝锭物流合同',
          type: i % 5,
          bName: `测试数据${i + 1}`,
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 4,
          money: 1.11,
          createDate: new Date(),
          gAmount: 222,
          gUnitPrice: 50,
          gSumPrice: 11100,
        });
      } else if (i === 8) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGM000${i + 1}`,
          agreementName: '铝锭仓储合同',
          type: i % 5,
          bName: `测试数据${i + 1}`,
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 4,
          money: 0.111,
          createDate: new Date(),
          gAmount: 222,
          gUnitPrice: 50,
          gSumPrice: 11100,
        });
      } else if (i === 9) {
        data.push({
          key: i,
          no: i + 1,
          agreementNo: `2017SDHSLGGM000${i + 1}`,
          agreementName: '铝锭销售合同',
          type: i % 5,
          bName: `测试数据${i + 1}`,
          bPhone: '2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: (i + 3) % 4,
          money: 341.00,
          createDate: new Date(),
          gAmount: 222,
          gUnitPrice: 14550,
          gSumPrice: 11100,
        });
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout title="合同列表">
        <div className={styles.standardList}>
          <div style={{ padding: '30px', marginTop: '-30px' }}>
            <Row gutter={16}>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="当月完成合同"
                  action={
                    <Tooltip title="当月完成合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="111（份）"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #1890FF' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="当月执行合同"
                  action={
                    <Tooltip title="当月执行合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="11（份）"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #13C2C2' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="当月违约合同"
                  action={
                    <Tooltip title="当月执行合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="5（份）"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #E9686B' }}
                />
              </Col>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  title="当月终止合同"
                  action={
                    <Tooltip title="当月终止合同">
                      <Icon type="info-circle-o" />
                    </Tooltip>
                  }
                  total="6（份）"
                  footer=""
                  contentHeight={46}
                  style={{ borderTop: '4px solid #CB0A12' }}
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
                        <Button icon="plus" type="primary" style={{ marginRight: '4px' }} ><a href="/#/contract/create" style={{ color: 'white' }}> 发起新合同</a></Button>
                        <Checkbox>只显示我发起的合同</Checkbox>
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
                    onRow={record => ({
                      onClick: (e) => {
                        this.onClickOne(e, record);
                      },
                    })}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          title="新增履行计划条目"
          visible={modalVisible}
          onOk={this.handleAdd}
          destroyOnClose={this.state.destroyOnClose}
          onCancel={() => this.handleModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划条目"
          >
            {getFieldDecorator('mess', {
              rules: [
                { required: true, message: '请输入履行计划内容' },
              ],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划内容"
          >
            {getFieldDecorator('textA', {
              rules: [
                { required: true, message: '请输入履行计划内容' },
              ],
            })(
              <TextArea placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="预计完成时间"
          >
            {getFieldDecorator('wilDate', {
              rules: [
                { required: true, message: '请输入预计完成时间' },
              ],
            })(
              <DatePicker style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="执行者"
          >
            {getFieldDecorator('flowO', {
              rules: [
                { required: true, message: '请输入执行者' },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="前置条件"
          >
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={24}><Checkbox value="A">货物入库</Checkbox></Col>
                <Col span={24}><Checkbox value="B"> 支付80%货款</Checkbox></Col>
                <Col span={24}><Checkbox value="C">收到上游发票</Checkbox></Col>
                <Col span={24}><Checkbox value="D">支付20%货款</Checkbox></Col>
              </Row>
            </Checkbox.Group>,
          </FormItem>
          <Divider />
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划模板"
          >
            {getFieldDecorator('cTemplat', {
              rules: [
                { required: true, message: '请选择履行计划模板' },
              ],
            })(
              <Select style={{ width: 295 }} showSearch placeholder="请选择履行计划模板" onChange={this.changeCTemplat}>
                <Option value="0">货物入库</Option>
                <Option value="1">货物出库</Option>
                <Option value="2">支付模板</Option>
                <Option value="3">质检模板</Option>
              </Select>
            )}
          </FormItem>
          <strong>履行计划模板预览</strong>
          <div style={{ display: isInput }}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="入库数量"
              hasFeedback
            >
              {getFieldDecorator('inputSum', {
                rules: [
                  { required: isInputRequired, message: '请输入入库数量' },
                ],
              })(
                <InputNumber style={{ width: 295 }} min={1} max={10000000} />
              )}
              <span>/吨</span>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="入库时间"
              hasFeedback
            >
              {getFieldDecorator('inputDate', {
                rules: [
                  { required: isInputRequired, message: '请输入入库时间' },
                ],
              })(
                <DatePicker style={{ width: 295 }} />
              )}
            </FormItem>
          </div>
          <div style={{ display: isQuality }}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="货物取样时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="到达第三方"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="质检时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="质检报告时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
          </div>
          <div style={{ display: isOutput }}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="出库数量"
              hasFeedback
            >
              {getFieldDecorator('outSum', {
                rules: [
                  { required: isOutRequired, message: '请输入出库数量' },
                ],
              })(
                <InputNumber style={{ width: 295 }} min={1} max={10000000} />
              )}
              <span>/吨</span>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="出库时间"
              hasFeedback
            >
              {getFieldDecorator('outDate', {
                rules: [
                  { required: isOutRequired, message: '请输入出库时间' },
                ],
              })(
                <DatePicker style={{ width: 295 }} />
              )}
            </FormItem>
          </div>
          <div style={{ display: isPay }}>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="首款金额"
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} /><span>万元</span>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="首款时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="尾款金额"
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} /><span>万元</span>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="尾款时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="支付笔数"
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="第一笔金额"
              hasFeedback
            >
              <InputNumber style={{ width: '100%' }} /><span>万元</span>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="第一笔时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" style={{ width: '75%', marginLeft: '5%' }}>
                <Icon type="plus" /> 增加分次明细
              </Button>
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="发票开出时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="到达时间"
              hasFeedback
            >
              <DatePicker style={{ width: '100%' }} />
            </FormItem>
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
