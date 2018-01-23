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
  Select,
  Tabs,
  Modal,
  DatePicker,
  InputNumber,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from '../List.less';

const { TabPane } = Tabs;
const { Option } = Select;
const FormItem = Form.Item;
@Form.create()
export default class BasicList extends PureComponent {
  state = {
    modalVisible: false,
    formLable: '',
    formLable1: '',
  };
  handleModalVisible = (flag) => {
    console.log(flag);
    if (flag === 0) {
      this.setState({
        modalVisible: true,
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
  hiddenModalVisible = () => {
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { loading } = this.props;
    // table
    const bType = ['货物入库', '货物出库', '物流', '仓储', '质检'];
    const bTypeVo = ['货权转入', '货权转出', '物流', '仓储', '质检'];
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
      render: (text, record) => (
        <a>
          <span onClick={() => this.handleModalVisible(record.type1)}>详情</span>
        </a>),
    }];
    const data = [];
    for (let i = 0; i < 20; i += 1) {
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
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <div style={{ padding: '30px', marginTop: -30 }}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Tabs type="card">
                  <TabPane tab="系统履行计划模板" key="1">
                    <Card
                      className={styles.salesCard}
                      loading={loading}
                      bordered={false}
                      bodyStyle={{ padding: 24 }}
                      style={{ marginTop: -18, minHeight: 509 }}
                    >
                      <Form className={listStyles.tableListForm} layout="inline">
                        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                          <Col md={6} sm={24}>
                            <FormItem label="模板编号">
                              {getFieldDecorator('no')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={6} sm={24}>
                            <FormItem label="模板名称">
                              {getFieldDecorator('name')(
                                <Input placeholder="请输入" />
                              )}
                            </FormItem>
                          </Col>
                          <Col md={6} sm={24}>
                            <FormItem label="履行计划类目">
                              {getFieldDecorator('type')(
                                <Select
                                  showSearch
                                  style={{ width: 200 }}
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
                          </Col>
                          <Col md={6} sm={24}>
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
                  <TabPane tab="用户自定义履行计划模板" key="2">
                    Content of Tab Pane 2
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
            <InputNumber disabled min={1} max={10000000} />
            <span>/吨</span>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={this.state.formLable1}
            hasFeedback
          >
            <DatePicker disabled />
          </FormItem>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
