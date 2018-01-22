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
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from '../List.less';

const FormItem = Form.Item;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
@Form.create()
export default class BasicList extends PureComponent {
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
      title: '确认终止吗？',
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
          <Divider type="vertical" />
          <a onClick={this.updateOne}>修改</a>
          <Divider type="vertical" />
          <a onClick={this.deteteOne}>删除</a>
        </span>
      ),
    }];
    const data = [];
    for (let i = 0; i < 20; i += 1) {
      const no = Date.parse(new Date()).toString();
      data.push({
        key: i,
        no: i + 1,
        agreementNo: `${no}${i + 1}`,
        agreementName: `货权转入${i + 1}`,
        type: i % 5,
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
          <div style={{ padding: '30px' }}>
            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
            label="履行计划条目"
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
