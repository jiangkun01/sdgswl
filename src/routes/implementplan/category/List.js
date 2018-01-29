import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Input,
  DatePicker,
  Checkbox,
  Divider,
  Modal,
  message,
  Tabs,
  Select,
  InputNumber,
  Icon,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from '../List.less';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
@Form.create()
export default class List extends PureComponent {
  state = {
    modalVisible: false,
    payModalVisible: false,
    inputModalVisible: false,
    upModalVisible: false,
  };
  handleAdd = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success('添加成功');
        this.setState({
          modalVisible: false,
          payModalVisible: false,
        });
      }
    });
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
    this.props.form.resetFields();
  };
  hiddenModalVisible = (flag) => {
    this.setState({
      payModalVisible: !!flag,
    });
    this.props.form.resetFields();
  };
  hiddenSysModalVisible = (flag) => {
    this.setState({
      inputModalVisible: !!flag,
    });
    this.props.form.resetFields();
  };
  temDetail = (flag) => {
    this.setState({
      payModalVisible: !!flag,
    });
  };
  sysTemDetail = (flag) => {
    this.setState({
      inputModalVisible: !!flag,
    });
  };
  deteteOne =() => {
    confirm({
      title: '确认删除吗？',
      onOk() {
        message.error('暂无法删除');
      },
    });
  };
  updateOne =(flag) => {
    this.setState({
      upModalVisible: !!flag,
    });
  };
  render() {
    const { loading } = this.props;
    // table
    const columns = [{
      title: '类目编号',
      dataIndex: 'agreementNo',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '类目名称',
      dataIndex: 'agreementName',
    }, {
      title: '创建人',
      dataIndex: 'status',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      sorter: (a, b) => a.createDate - b.createDate,
    }, {
      title: '包含模板',
      dataIndex: 'tem',
      render: val => <a onClick={this.temDetail}>{val}</a>,
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      render: () => (
        <span>
          <a onClick={this.updateOne}>修改</a>
          <Divider type="vertical" />
          <a onClick={this.deteteOne}>删除</a>
        </span>
      ),
    }];
    const columnsVo = [{
      title: '类目编号',
      dataIndex: 'agreementNo',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '类目名称',
      dataIndex: 'agreementName',
    }, {
      title: '包含模板',
      dataIndex: 'tem',
      render: val => <a onClick={this.sysTemDetail}>{val}</a>,
    }];

    const no = Date.parse(new Date()).toString();
    const data1 = [
      {
        key: 1,
        no: 1,
        agreementNo: `${no}${1}`,
        agreementName: '货权转入',
        tem: '入库模板',
      },
    ];
    const data = [
      {
        key: 1,
        agreementNo: `${no}${1}`,
        agreementName: '支付',
        status: '李雷',
        gender: 'M',
        tem: '支付模板',
        createDate: new Date(),
      },
      // {
      //   key: 2,
      //   agreementNo: `${no}${2}`,
      //   agreementName: '收款',
      //   status: '李雷',
      //   gender: 'M',
      //   createDate: new Date(),
      // },
      // {
      //   key: 3,
      //   agreementNo: `${no}${3}`,
      //   agreementName: '物流',
      //   status: '李雷',
      //   gender: 'M',
      //   createDate: new Date(),
      // },
      // {
      //   key: 4,
      //   agreementNo: `${no}${4}`,
      //   agreementName: '仓储',
      //   status: '李雷',
      //   gender: 'M',
      //   createDate: new Date(),
      // },
      // {
      //   key: 5,
      //   agreementNo: `${no}${5}`,
      //   agreementName: '质检',
      //   status: '李雷',
      //   gender: 'M',
      //   createDate: new Date(),
      // },
      // {
      //   key: 6,
      //   agreementNo: `${no}${5}`,
      //   agreementName: '其他',
      //   status: '李雷',
      //   gender: 'M',
      //   createDate: new Date(),
      // },
    ];
    const { getFieldDecorator } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    return (
      <PageHeaderLayout title="类目列表">
        <div className={styles.standardList}>
          <div style={{ padding: '30px', marginTop: -30 }}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Tabs type="card">
                  <TabPane tab="自定义类目" key="1">
                    <Card
                      className={styles.salesCard}
                      loading={loading}
                      bordered={false}
                      bodyStyle={{ padding: 24 }}
                      style={{ marginTop: -24, minHeight: 509 }}
                    >
                      <div className={listStyles.tableListForm}>
                        <Form onSubmit={this.handleSearch} layout="inline">
                          <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                              <FormItem label="类目名称">
                                {getFieldDecorator('b_name')(
                                  <Input placeholder="请输入" />
                                )}
                              </FormItem >
                            </Col>
                            <Col md={8} sm={24}>
                              <FormItem label="添加者">
                                {getFieldDecorator('u_name')(
                                  <Input placeholder="请输入" />
                                )}
                              </FormItem>
                            </Col>
                            <Col md={8} sm={24}>
                              <FormItem label="添加时间">
                                {getFieldDecorator('no')(
                                  <RangePicker />
                                )}
                              </FormItem>
                            </Col>
                          </Row>
                          <div style={{ overflow: 'hidden', marginTop: '2%' }}>
                            <span style={{ float: 'left', marginBottom: 24 }}>
                              <Button icon="plus" type="primary" style={{ marginRight: '4px' }} onClick={this.handleModalVisible}>创建新的履行类目</Button>
                              <Checkbox>只显示我创建的类目</Checkbox>
                            </span>
                            <span style={{ float: 'right', marginBottom: 24 }}>
                              <Button type="primary" htmlType="submit">查询</Button>
                              <Button style={{ marginLeft: 8 }} >重置</Button>
                            </span>
                          </div>
                        </Form>
                      </div>
                      <Table
                        dataSource={data}
                        columns={columns}
                        rowKey={record => record.key}
                        scroll={{ x: 1366 }}
                      />
                    </Card>
                  </TabPane>
                  <TabPane tab="系统模板" key="2">
                    <Card
                      className={styles.salesCard}
                      loading={loading}
                      bordered={false}
                      bodyStyle={{ padding: 24 }}
                      style={{ marginTop: -24, minHeight: 509 }}
                    >
                      <div className={listStyles.tableListForm}>
                        <Form onSubmit={this.handleSearch} layout="inline">
                          <Row gutter={{ md: 24, lg: 24, xl: 48 }}>
                            <Col md={8} sm={24}>
                              <FormItem label="类目名称">
                                {getFieldDecorator('b_name')(
                                  <Input placeholder="请输入" />
                                )}
                              </FormItem >
                            </Col>
                            <Col md={8} sm={24}>
                              <span style={{ float: 'right', marginBottom: 24 }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
                              </span>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                      <Table
                        dataSource={data1}
                        columns={columnsVo}
                        rowKey={record => record.key}
                        scroll={{ x: 1366 }}
                      />
                    </Card>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          title="新增履行计划类目"
          visible={this.state.modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划类目"
          >
            {getFieldDecorator('mess', {
              rules: [
                { required: true, message: '请输入履行计划类目' },
              ],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划模板"
          >
            {getFieldDecorator('tem', {
            })(
              <Select style={{ width: '100%' }} mode="multiple" placeholder="请选择模板" >
                <Option value="LG">支付模板</Option>
                <Option value="green">质检模板</Option>
                <Option value="DP">入库模板</Option>
                <Option value="blue">出库模板</Option>
                <Option value="TT">物流模板</Option>
              </Select>
            )}
          </FormItem>
        </Modal>
        <Modal
          title="修改履行计划类目"
          visible={this.state.upModalVisible}
          onOk={() => this.updateOne()}
          onCancel={() => this.updateOne()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划类目"
          >
            {getFieldDecorator('mess1', { initialValue: '支付',
              rules: [
                { required: true, message: '请输入履行计划类目' },
              ],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="履行计划模板"
          >
            {getFieldDecorator('tem1', { initialValue: 'LG',
            })(
              <Select style={{ width: '100%' }} mode="multiple" defaultValue={['LG']} placeholder="请选择模板" >
                <Option value="LG">支付模板</Option>
                <Option value="green">质检模板</Option>
                <Option value="DP">入库模板</Option>
                <Option value="blue">出库模板</Option>
                <Option value="TT">物流模板</Option>
              </Select>
            )}
          </FormItem>
        </Modal>
        <Modal
          title="履行计划模板详情"
          visible={this.state.payModalVisible}
          onOk={() => this.hiddenModalVisible()}
          onCancel={() => this.hiddenModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="首款金额"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled /><span>万元</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="首款时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="尾款金额"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled /><span>万元</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="尾款时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="支付笔数"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="第一笔金额"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled /><span>万元</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="第一笔时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button disabled type="dashed" style={{ width: '75%', marginLeft: '5%' }}>
              <Icon type="plus" /> 增加分次明细
            </Button>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="发票开出时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="到达时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
        </Modal>
        <Modal
          title="履行计划模板详情"
          visible={this.state.inputModalVisible}
          onOk={() => this.hiddenSysModalVisible()}
          onCancel={() => this.hiddenSysModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="入库数量"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled min={1} max={10000000} />
            <span>/吨</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="单价"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled min={1} max={10000000} />
            <span>元/吨</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="总金额"
            hasFeedback
          >
            <InputNumber style={{ width: '100%' }} disabled min={1} max={10000000} />
            <span>万元</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="入库时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
