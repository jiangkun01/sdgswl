import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Card, Form, Input, Icon, DatePicker } from 'antd';

const FormItem = Form.Item;

export default class Plan extends PureComponent {
  render() {
    const columns = [{
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '前置条件',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '履行计划名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '预计完成时间',
      dataIndex: 'expectedtime',
      key: 'expectedtime',
    }, {
      title: '实际完成时间',
      dataIndex: 'actualtime',
      key: 'actualtime',
    }, {
      title: '更新日期',
      dataIndex: 'updatetime',
      key: 'updatetime',
    }, {
      title: '执行者',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '创建时间',
      dataIndex: 'createtime',
      key: 'createtime',
    }, {
      title: '操作',
      render: () => (
        <span>
          <a href="#">变更计划</a>
        </span>
      ),
    }];
    const status = ['完成', '执行中', '未开始'];
    const username = ['李雷', '里斯', '王无', '吴桐'];
    const name = ['长期煤炭运输合同', '短期运输合同', '长期焦炭运输合同', '长期运输合同', '短期杂货运输合同', '长期内贸运输合同', '短期内贸运输合同', '长期外贸运输合同', '短期外贸运输合同', '中小型运输合同', '大型运输合同'];
    const dataSource = [];
    for (let i = 1; i < 7; i += 1) {
      const sta = Math.round((Math.random() * 2) + 0);
      const date = Math.round((Math.random() * 11) + 1);
      dataSource.push({
        id: i,
        status: status[sta],
        note: '',
        name: name[Math.round((Math.random() * 10) + 0)],
        expectedtime: date < 10 ? `2017-0${date}-0${date}` : `2017-${date}-${date}`,
        actualtime: sta === 0 ? (date < 10 ? `2017-0${date}-0${date}` : `2017-${date}-${date}`) : '',
        updatetime: sta === 0 ? (date < 10 ? `2017-0${date}-0${date}` : `2017-${date}-${date}`) : '',
        username: username[Math.round((Math.random() * 3) + 0)],
        createtime: date < 10 ? `2017-0${date}-0${date}` : `2017-${date}-${date}`,
      });
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <Row>
          <Col span={24}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button><Icon type="left" />变更计划</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button>终止合同</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button> 完成计划<Icon type="right" /></Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Card>
              <p>履行计划条目更新</p>
              <Row>
                <Col span={10}>
                  <Card tabList={[{ key: 'article', tab: '合同约定' }]}>
                    <h3>采购数量：<strong>200吨</strong></h3>
                    <br />
                    <h3>交货日期：<strong>2017-01-01</strong></h3>
                  </Card>
                </Col>
                <Col span={12} offset={1}>
                  <Card tabList={[{ key: 'article', tab: '货物入库' }]}>
                    <FormItem {...formItemLayout} label="入库数量" >
                      <Input placeholder="请输入" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="入库日期" >
                      <DatePicker />
                    </FormItem>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}
