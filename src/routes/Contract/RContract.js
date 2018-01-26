import React, { PureComponent } from 'react';
import { Table } from 'antd';

export default class RContract extends PureComponent {
  reset = () => {
    location.reload();
  }
  render() {
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '合同编号',
      dataIndex: 'number',
      key: 'number',
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
    const dataSource = [{
      id: '1',
      number: '2017SDHSLGGM0256',
      name: '铝锭采购合同',
      type: '采购合同',
      status: '履行中',
      signtime: '2017-08-22',
      amount: '287.4万元',
      goodstype: '集装箱货物',
      goodsamount: '287.4万元',
      goodsprice: '10万元',
    }];
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1366 }} />
      </div>
    );
  }
}
