import React, { Component } from 'react';
import { Card, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

export default class list extends Component {
  render() {
    const column = [
      { title: '序号', key: 'num', dataIndex: 'num' },
      { title: '合同名称', key: 'name', dataIndex: 'name' },
      { title: '合同编号', key: 'id', dataIndex: 'id' },
      { title: '相对方', key: 'them', dataIndex: 'them' },
      { title: '签订时间', key: 'time', dataIndex: 'time' },
      { title: '合同总金额', key: 'account', dataIndex: 'account' },
      { title: '合同履行计划', key: 'plan', dataIndex: 'plan' },
      { title: '累计履约金额或情况', key: 'money', dataIndex: 'money' },
      {
        title: '合同履行情况',
        children: [{
          title: '本周履行计划',
          key: 'weekplan',
          dataIndex: 'weekplan',
        }, {
          title: '本周履约金额或情况',
          key: 'weekmoney',
          dataIndex: 'weekmoney',
        }, {
          title: '特殊事项及处理情况/风险分析及建议',
          key: 'suggestion',
          dataIndex: 'suggestion',
        }],
      },
      { title: '备注', key: 'note', dataIndex: 'note' },
    ];
    const data = [];
    const name = ['战略合作框架协议', '橡胶仓储合同', '橡胶仓储装卸合同', '焦炭采购合同', '氧化铝销售合同（长协）'];
    const id = ['2016SDHSLGGM0103', '2016SDHSLGGM0098', '2016SDHSLGGM0158', '2016SDHSLGGM0112', '2016SDHSLGGM0131'];
    const them = ['深圳市前海国储能源化工有限公司', '山东高速标准箱物流有限公司', '山东国储物流有限公司青岛分公司', '天津丽通能源发展有限公司', '青投国际贸易（上海）有限公司'];
    const time = ['2016.10.08', '2016.10.12', '2016.11.30', '2017.04.06', '2017.05.12'];
    const account = ['0.00', '0.9元/吨.天', '按吨数、存储天数计费', '2204000美元', '7460.02'];
    const plan = ['2021.10.07', '2017.12.31', '2017.11.22', '2017.08', '2017.09'];
    const money = ['0.00', '0.52', '12.81', '1243.94', '7460.02'];
    for (let i = 0; i < 4; i += 1) {
      data.push({
        key: i,
        num: i,
        name: name[i],
        id: id[i],
        them: them[i],
        time: time[i],
        account: account[i],
        plan: plan[i],
        money: money[i],
        weekplan: '无',
        weekmoney: '无',
        suggestion: '无',
        note: '履约中',
      });
    }
    return (
      <PageHeaderLayout title="贸易台账">
        <Card>
          <p style={{ fontSize: 16 }}>报送部门：国贸公司<span style={{ float: 'right', fontSize: 14, marginRight: 48 }}>填报周期：2017年08月21日-2017年08月25日&nbsp;&nbsp;&nbsp;&nbsp;单位：万元</span></p>
          <Table bordered dataSource={data} columns={column} />
        </Card>
      </PageHeaderLayout>
    );
  }
}
