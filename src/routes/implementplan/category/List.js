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
  Badge,
  DatePicker,
  Checkbox,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../Dashboard/Analysis.less';
import listStyles from './List.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
@Form.create()
export default class BasicList extends PureComponent {
  render() {
    const { loading } = this.props;
    // table
    const bType = ['采购', '质检合同', '物流', '仓储', '销售合同'];
    const bStatus = ['新建', '审批中', '审批通过', '完成', '履行中', '终止'];
    const statusMap = ['default', 'processing', 'success', 'success', 'processing', 'error'];
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
        status: (i + 3) % 6,
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
                          <Button icon="plus" type="primary" style={{ marginRight: '4px' }} ><a href="/#/contract/create" style={{ color: 'white' }}> 发起新合同</a></Button>
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
      </PageHeaderLayout>
    );
  }
}
