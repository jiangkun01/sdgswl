import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Alert, Badge, Menu, Modal, Divider, message } from 'antd';
import styles from './index.less';

const { confirm } = Modal;
const { SubMenu } = Menu;
const statusMap = ['default', 'processing', 'success', 'error'];
@connect(({ rule }) => ({
  rule,
}))
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    visible: false,
    BussGoods: {},
    ItemArrayVoShow: [],
    confirmLoading: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  }
  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  handleMenuClick = (record, e) => {
    const ItemVoArray = [];
    if (e.key === '1') {
      // this.showModal();
      this.setState({
        BussGoods: record,
      });
      for (let i = 0; i < record.ItemArray.length; i += 1) {
        ItemVoArray.push(
          <div>
            <Divider>货物信息{i + 1}</Divider>
            <p>货物名称：{record.ItemArray[i].IName}</p>
            <p>货物规格：{record.ItemArray[i].gSku}</p>
          </div>
        );
      }
      this.setState({
        ItemArrayVoShow: ItemVoArray,
      });
      // dispatch({
      //   type: 'userController/isVisible',
      //   isVisible: true,
      //   isPassswordRequired: false,
      //   user: record,
      //   title: '修改',
      // })
    } else if (e.key === '2') {
      message.info('暂无法修改');
      // dispatch({
      //   type: 'userController/isVisible',
      //   isVisible: true,
      //   isPassswordRequired: false,
      //   user: record,
      //   title: '修改',
      // })
    } else if (e.key === '3') {
      const { dispatch } = this.props;
      const clean = this.cleanSelectedKeys;
      confirm({
        title: '确认删除吗？',
        onOk() {
          dispatch({
            type: 'rule/remove',
            payload: {
              no: record.no,
            },
            callback: clean,
          });
        },
      });
    }
  }
  render() {
    const { selectedRowKeys, visible, confirmLoading, BussGoods, ItemArrayVoShow } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const status = ['履行中', '已完成', '新建', '终止'];
    const bType = ['内贸', '外贸'];
    const columns = [
      {
        title: '业务编号',
        dataIndex: 'no',
        sorter: (a, b) => a.no - b.no,
      },
      {
        title: '业务名称',
        dataIndex: 'bName',
      },
      {
        title: '业务类型',
        dataIndex: 'BType',
        filters: [
          {
            text: bType[0],
            value: 0,
          },
          {
            text: bType[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={bType[val]} />;
        },
        sorter: (a, b) => a.BType - b.BType,
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
          {
            text: status[2],
            value: 2,
          },
          {
            text: status[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
        sorter: (a, b) => a.status - b.status,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorter: (a, b) => a.createdAt - b.createdAt,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        width: 120,
        fixed: 'right',
        render: record => (
          <Menu onClick={e => this.handleMenuClick(record, e)}>
            <SubMenu key={record.key} title={<span>更多</span>}>
              <Menu.Item key="1"><a href="/#/business/detail">详情</a></Menu.Item>
              <Menu.Item key="2">修改</Menu.Item>
              <Menu.Item key="3">删除</Menu.Item>
            </SubMenu>
          </Menu>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.no}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          scroll={{ x: 1366 }}
        />
        <Modal
          title="业务详情"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Divider>业务信息</Divider>
          <p>业务编号：{BussGoods.no}</p>
          <p>业务名称：{BussGoods.bName}</p>
          <p>业务创建人：张建国</p>
          <p>业务创建时间:{moment(BussGoods.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
          {ItemArrayVoShow}
        </Modal>
      </div>
    );
  }
}

export default StandardTable;
