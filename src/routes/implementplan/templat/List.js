import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Input,
  Badge,
  Icon,
  Select,
  Tabs,
  Modal,
  DatePicker,
  InputNumber,
  Checkbox,
  Divider,
  Radio,
  message,
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from '../List.less';

const { TabPane } = Tabs;
const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
let uuid = 1;
@Form.create()
export default class List extends PureComponent {
  state = {
    modalVisible: false,
    payModalVisible: false,
    qualityModalVisible: false,
    modelCreateVisible: false,
    other: false,
    formLable: '',
    formLable1: '',
    isInputNumber: 'none',
  };
  onChange = (e) => {
    console.log('radio checked', e.target.value);
  };
  handleModalVisible = (flag) => {
    if (flag === 7) {
      this.setState({
        payModalVisible: !!flag,
      });
    } else if (flag === 8) {
      this.setState({
        qualityModalVisible: !!flag,
      });
    } else if (flag === 6) {
      this.setState({
        other: !!flag,
      });
    } else if ((flag % 2) === 0) {
      this.setState({
        modalVisible: !!flag,
        formLable: '入库数量',
        formLable1: '入库时间',
      });
    } else {
      this.setState({
        modalVisible: !!flag,
        formLable: '出库数量',
        formLable1: '出库时间',
      });
    }
  };
  handleAdd = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success('添加成功');
        this.setState({
          modelCreateVisible: false,
        });
        this.props.form.setFieldsValue({
          keys: [],
        });
      }
    });
  };
  updateOne =(value) => {
    message.error('暂无法修改');
    console.log(value);
  };
  deleteOne =() => {
    confirm({
      title: '确认删除吗？',
      onOk() {
        message.error('合同暂无法删除');
      },
    });
  };
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid += 1;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  handleModalCreateVisible = (flag) => {
    // this.props.form.setFieldsValue({
    //   keys: [], b_name: '', b_type: '',
    // });
    this.props.form.resetFields();
    this.setState({
      modelCreateVisible: !!flag,
    });
    this.add();
  };
  hiddenModalCreateVisible = (flag) => {
    this.setState({
      modelCreateVisible: !!flag,
    });
  };
  hiddenModalVisible = () => {
    this.setState({
      modalVisible: false,
      payModalVisible: false,
      qualityModalVisible: false,
      other: false,
    });
  };
  render() {
    const { loading } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { isInputNumber } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    // table
    const bType = ['入库计划', '货物出库', '物流', '仓储', '质检', '其他'];
    const bTypeVo = ['货权转入', '货权转出', '物流', '支付', '质检', '其他'];
    const statusMap = ['default', 'processing', 'success', 'success', 'processing', 'error'];
    const columns = [{
      title: '模板编号',
      dataIndex: 'agreementNo',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '模板名称',
      dataIndex: 'type',
      render(val) {
        return <Badge status={statusMap[val]} text={bType[val]} />;
      },
    }, {
      title: '模板类目',
      dataIndex: 'type1',
      render(val) {
        return <Badge status={statusMap[val]} text={bTypeVo[val]} />;
      },
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      // render: (text, record) => (
      //   <span>
      //     <a href="#">Action 一 {record.type1}</a>
      //   </span>
      // ),
      render: () => (
        <a>
          <span onClick={() => this.handleModalVisible(2)}>详情</span>
        </a>),
    }];
    const columnsVo = [{
      title: '模板编号',
      dataIndex: 'agreementNo',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a.agreementNo - b.agreementNo,
    }, {
      title: '模板名称',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '模板类目',
      dataIndex: 'type1',
      filters: [
        {
          text: bTypeVo[1],
          value: 1,
        },
        {
          text: bTypeVo[2],
          value: 2,
        },
        {
          text: bTypeVo[3],
          value: 3,
        },
        {
          text: bTypeVo[4],
          value: 4,
        },
        {
          text: bTypeVo[5],
          value: 5,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={bTypeVo[val]} />;
      },
    }, {
      title: '创建人',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a, b) => a.createDate - b.createDate,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 200,
      // render: (text, record) => (
      //   <span>
      //     <a href="#">Action 一 {record.type1}</a>
      //   </span>
      // ),
      render: (text, record) => (
        <a>
          <span onClick={() => this.handleModalVisible(record.key)}>详情</span>
          <Divider type="vertical" />
          <span onClick={() => this.updateOne(record.agreementNo)}>修改</span>
          <Divider type="vertical" />
          <span onClick={() => this.deleteOne(record.agreementNo)}>删除</span>
        </a>),
    }];
    const data = [];
    for (let i = 0; i < 1; i += 1) {
      const no = Date.parse(new Date()).toString();
      data.push({
        key: i,
        no: i + 1,
        agreementNo: `${no}${i + 1}`,
        agreementName: `货权转入${i + 1}`,
        type: i % 2,
        type1: i % 2,
        bName: `货权转入${i + 1}`,
        bPhone: '测试数据 2133456',
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      });
    }
    const dataVo = [];
    for (let i = 5; i < 9; i += 1) {
      const no = Date.parse(new Date()).toString();
      if (i === 7) {
        dataVo.push({
          key: i,
          no: i + 1,
          agreementNo: `${no}${i + 1}`,
          agreementName: `货权转入${i + 1}`,
          type: '支付计划',
          type1: 3,
          bName: `货权转入${i + 1}`,
          bPhone: '测试数据 2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: '李雷',
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 8) {
        dataVo.push({
          key: i,
          no: i + 1,
          agreementNo: `${no}${i + 1}`,
          agreementName: `货权转入${i + 1}`,
          type: '质检计划',
          type1: 4,
          bName: `货权转入${i + 1}`,
          bPhone: '测试数据 2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: '李雷',
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 5) {
        dataVo.push({
          key: i,
          no: i + 1,
          agreementNo: `${no}${i + 1}`,
          agreementName: `货权转入${i + 1}`,
          type: '出库计划',
          type1: 1,
          bName: `货权转入${i + 1}`,
          bPhone: '测试数据 2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: '李雷',
          gender: 'M',
          createDate: new Date(),
        });
      } else if (i === 6) {
        dataVo.push({
          key: i,
          no: i + 1,
          agreementNo: `${no}${i + 1}`,
          agreementName: `货权转入${i + 1}`,
          type: '无截止时间完成',
          type1: 5,
          bName: `货权转入${i + 1}`,
          bPhone: '测试数据 2133456',
          companyAddress: 'Lake Street 42',
          companyName: 'SoftLake Co',
          status: '李雷',
          gender: 'M',
          createDate: new Date(),
        });
      }
    }
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={`d[${k}]`}>
          <FormItem
            {...formItemLayout}
            label={`条目描述${index + 1}`}
            required={false}
            key={`rule[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`rule[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入描述',
              }],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`输入框类型${index + 1}`}
            required={false}
            key={`inputType[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`inputType[${k}]`, { initialValue: 1 })(
              <RadioGroup OnChange={this.onChange}>
                <Radio value={1}>文字输入框</Radio>
                <Radio value={2}>数字输入框</Radio>
                <Radio value={3}>文本输入框</Radio>
                <Radio value={4}>完成按钮</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`数字框单位${index + 1}`}
            required={false}
            key={`unit[${k}]`}
            hasFeedback
            type={{ display: isInputNumber }}
          >
            {getFieldDecorator(`unit[${k}]`)(
              <div>
                <Input placeholder="数子框单位" /><Checkbox />
              </div>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`截止时间条目${index + 1}`}
            required={false}
            key={`r[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`r[${k}]`)(
              <Checkbox >选择</Checkbox>
            )}
          </FormItem>
          <Divider>
            {keys.length > 1 ? (
              <Icon
                type="close-circle-o"
                spin="true"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
                style={{ fontSize: 16, color: '#F25D46' }}
              />
            ) : null}
          </Divider>
        </div>
      );
    });
    return (
      <PageHeaderLayout title="模板列表">
        <div className={styles.standardList}>
          <div style={{ padding: '30px', marginTop: -30 }}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Tabs type="card">
                  <TabPane tab="自定义模板" key="2">
                    <Card
                      className={styles.salesCard}
                      loading={loading}
                      bordered={false}
                      bodyStyle={{ padding: 24 }}
                      style={{ marginTop: -18, minHeight: 509 }}
                    >
                      <Form className={listStyles.tableListForm} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                          <Col md={8} sm={24}>
                            <FormItem label="模板编号">
                              {getFieldDecorator('no')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={8} sm={24}>
                            <FormItem label="模板名称">
                              {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={8} sm={24}>
                            <FormItem label="创建时间">
                              <RangePicker />
                            </FormItem>
                          </Col>
                        </Row>
                        <Row gutter={24}>
                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <div style={{ overflow: 'hidden' }}>
                              <span style={{ float: 'left', marginBottom: 24 }}>
                                <Button icon="plus" type="primary" style={{ marginRight: '4px' }} onClick={this.handleModalCreateVisible}>创建新的模板</Button>
                                <Checkbox>只显示我创建的</Checkbox>
                              </span>
                              <span style={{ float: 'right', marginBottom: 24 }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Table
                        dataSource={dataVo}
                        columns={columnsVo}
                        rowKey={record => record.key}
                        scroll={{ x: 1366 }}
                      />
                    </Card>
                  </TabPane>
                  <TabPane tab="系统模板" key="1">
                    <Card
                      className={styles.salesCard}
                      loading={loading}
                      bordered={false}
                      bodyStyle={{ padding: 24 }}
                      style={{ marginTop: -18, minHeight: 509 }}
                    >
                      <Form className={listStyles.tableListForm} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                          <Col md={8} sm={24}>
                            <FormItem label="模板编号">
                              {getFieldDecorator('no')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={8} sm={24}>
                            <FormItem label="模板名称">
                              {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={8} sm={24}>
                            <div style={{ overflow: 'hidden', marginTop: '2%' }}>
                              <span style={{ float: 'right', marginBottom: 24 }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Table
                        dataSource={data}
                        columns={columns}
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
          title="履行计划模板详情"
          visible={this.state.modalVisible}
          onOk={this.hiddenModalVisible}
          onCancel={() => this.handleModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={this.state.formLable}
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
            label={this.state.formLable1}
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
        </Modal>
        <Modal
          title="履行计划模板详情"
          visible={this.state.payModalVisible}
          onOk={this.hiddenModalVisible}
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
          visible={this.state.qualityModalVisible}
          onOk={this.hiddenModalVisible}
          onCancel={() => this.hiddenModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="货物取样时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="到达第三方"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="质检时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="质检报告时间"
            hasFeedback
          >
            <DatePicker style={{ width: '100%' }} disabled />
          </FormItem>
        </Modal>
        <Modal
          title="履行计划模板详情"
          visible={this.state.other}
          onOk={this.hiddenModalVisible}
          onCancel={() => this.hiddenModalVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="是否完成"
            hasFeedback
          >
            <Button style={{ width: '100%', display: 'block' }} disabled type="primary">是</Button>
            <Button style={{ width: '100%', display: 'block', marginTop: '20px' }} disabled type="primary">否</Button>
          </FormItem>
        </Modal>
        <Modal
          title="创建履行计划模板"
          visible={this.state.modelCreateVisible}
          onOk={this.handleAdd}
          onCancel={() => this.hiddenModalCreateVisible()}
          style={{ width: 1200 }}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="模板名称"
            hasFeedback
          >
            {getFieldDecorator('b_name', { validateTrigger: ['onChange', 'onBlur'],
              rules: [
                { required: true, message: '请输入履行计划模板名称' },
              ],
            })(
              <Input style={{ width: '100%' }} placeholder="请输入" />
            )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="类目选择"
            hasFeedback
          >
            {getFieldDecorator('b_type', { validateTrigger: ['onChange', 'onBlur'],
              rules: [
                { required: true, message: '请输入履行计划类目' },
              ],
            })(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="选择履行计划类目"
                optionFilterProp="children"
              >
                <Option value="input">货权转入</Option>
                <Option value="output">货权转出</Option>
                <Option value="pay">支付</Option>
                <Option value="收款">收款</Option>
                <Option value="其他">其他</Option>
              </Select>
            )}
          </FormItem>
          <Divider>自定义条目</Divider>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus" /> 增加条目
            </Button>
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
