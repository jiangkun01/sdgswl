import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class RContract extends PureComponent {
  reset = () => {
    location.reload();
  }
  render() {
    const columns = [{
      title: '合同编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '合同名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '合同类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '合同执行状态',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: '签订时间',
      dataIndex: 'signtime',
      key: 'signtime',
    }, {
      title: '合同金额',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '货物类型',
      dataIndex: 'goodstype',
      key: 'goodstype',
    }, {
      title: '货物总价',
      dataIndex: 'goodsamount',
      key: 'goodsamount',
    }, {
      title: '货物单价',
      dataIndex: 'goodsprice',
      key: 'goodsprice',
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 65,
      render: () => (
        <span>
          <a onClick={this.reset}>详情</a>
        </span>
      ),
    }];
    const id = ['201701012345', '201702022564', '201703032456', '201704041234', '201705057878', '201706064567', '201707074523', '201708085612', '201709094587', '201710104586', '201711115589'];
    const name = ['长期煤炭运输合同', '短期运输合同', '长期焦炭运输合同', '长期运输合同', '短期杂货运输合同', '长期内贸运输合同', '短期内贸运输合同', '长期外贸运输合同', '短期外贸运输合同', '中小型运输合同', '大型运输合同'];
    const dataSource = [];
    for (let i = 1; i < 12; i += 1) {
      dataSource.push({
        id: id[i - 1],
        name: name[i - 1],
        type: i % 2 === 0 ? '货物合同' : '时间合同',
        status: '执行中',
        signtime: i < 10 ? `2017-0${i}-0${i}` : `2017-${i}-${i}`,
        amount: `${i * 36}万元`,
        goodstype: i % 2 === 0 ? '散货' : '集装箱货物',
        goodsamount: `${i * 32}万元`,
        goodsprice: `${i * 6}万元`,
      });
    }
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1366 }} bordered />
      </div>
    );
  }
}
