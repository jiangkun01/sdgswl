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
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from '../List.less';

const FormItem = Form.Item;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
@Form.create()
export default class List extends PureComponent {
  state = {
    modalVisible: false,
  };
  handleAdd = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success('添加成功');
        this.setState({
          modalVisible: false,
        });
      }
    });
  }
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  deteteOne =() => {
    confirm({
      title: '确认删除吗？',
      onOk() {
        message.error('合同暂无法删除');
      },
    });
  };
  updateOne =() => {
    message.error('合同暂无法修改');
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
    }];

    const no = Date.parse(new Date()).toString();
    const data1 = [
      {
        key: 1,
        no: 1,
        agreementNo: `${no}${1}`,
        agreementName: '货权转入',
      },
      {
        key: 2,
        no: 2,
        agreementNo: `${no}${1}`,
        agreementName: '货权转出',
      },
    ];
    const data = [
      {
        key: 1,
        agreementNo: `${no}${1}`,
        agreementName: '支付',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
      {
        key: 2,
        agreementNo: `${no}${2}`,
        agreementName: '收款',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
      {
        key: 3,
        agreementNo: `${no}${3}`,
        agreementName: '物流',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
      {
        key: 4,
        agreementNo: `${no}${4}`,
        agreementName: '仓储',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
      {
        key: 5,
        agreementNo: `${no}${5}`,
        agreementName: '质检',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
      {
        key: 5,
        agreementNo: `${no}${5}`,
        agreementName: '其他',
        status: '李雷',
        gender: 'M',
        createDate: new Date(),
      },
    ];
    const { getFieldDecorator } = this.props.form;
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
        </Modal>
      </PageHeaderLayout>
    );
  }
}
