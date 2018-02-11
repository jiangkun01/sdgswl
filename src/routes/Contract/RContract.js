import React, { PureComponent } from 'react';
import { Table, Badge } from 'antd';

const statusMap = ['default', 'processing', 'error', 'success'];

export default class RContract extends PureComponent {
  reset = () => {
    location.reload();
  }
  render() {
    const status = ['未履行', '履行中', '已终止', '已完成'];
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
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
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
    }];
    const dataSource = [
      { id: 1, number: '2017SDHSLGGM0256', name: '铝锭采购合同', type: '采购合同', status: 1, signtime: '2017-08-22', amount: '287.4万元', goodstype: '集装箱货物', goodsamount: '287.4万元', goodsprice: '10万元' },
      { id: 2, number: '2017SDHSLGGM0257', name: '铝锭代理销售合同', type: '销售合同', status: 0, signtime: '2017-08-26', amount: '36.6万元', goodstype: '集装箱货物', goodsamount: '36.6万元', goodsprice: '11万元' },
      { id: 3, number: '2017SDHSLGGM0258', name: '铝锭代理采购合同', type: '采购合同', status: 2, signtime: '2017-08-28', amount: '56.4万元', goodstype: '集装箱货物', goodsamount: '56.4万元', goodsprice: '10万元' },
    ];
    return (
      <div>
        <Table
          onRow={() => ({
          onClick: () => {
            this.reset();
          },
        })}
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          scroll={{ x: 1366 }}
        />
      </div>
    );
  }
}
