import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Alert, Badge, Modal, Divider,
  message, Form, Select, Input, Button } from 'antd';
import styles from './index.less';

const { confirm } = Modal;
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const statusMap = ['default', 'processing', 'success', 'error'];
@connect(({ rule }) => ({
  rule,
}))
class StandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
    visible: false,
    confirmLoading: false,
    GJson: 1,
    ItemArray: [],
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
  deteteOne =() => {
    confirm({
      title: '确认删除吗？',
      onOk() {
        message.error('业务暂无法删除');
      },
    });
  };
  updateOne =() => {
    this.setState({
      visible: true,
    });
  };
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
      ItemArray: [],
      GJson: 1,
    });
    message.success('修改成功');
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      ItemArray: [],
      GJson: 1,
    });
  }
  addItemArray =() => {
    const ItemArrayVo = [];
    this.setState({
      GJson: this.state.GJson + 1,
      ItemArray: [],
    });
    for (let i = 1; i <= this.state.GJson; i += 1) {
      ItemArrayVo.push(
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={`货物名称${i}`}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label={`货物规格${i}`}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <Divider />
        </div>
      );
    }
    this.setState({
      ItemArray: ItemArrayVo,
    });
  }
  // handleMenuClick = (record, e) => {
  //   const ItemVoArray = [];
  //   if (e.key === '1') {
  //     // this.showModal();
  //     this.setState({
  //       BussGoods: record,
  //     });
  //     for (let i = 0; i < record.ItemArray.length; i += 1) {
  //       ItemVoArray.push(
  //         <div>
  //           <Divider>货物信息{i + 1}</Divider>
  //           <p>货物名称：{record.ItemArray[i].IName}</p>
  //           <p>货物规格：{record.ItemArray[i].gSku}</p>
  //         </div>
  //       );
  //     }
  //     this.setState({
  //       ItemArrayVoShow: ItemVoArray,
  //     });
  //     // dispatch({
  //     //   type: 'userController/isVisible',
  //     //   isVisible: true,
  //     //   isPassswordRequired: false,
  //     //   user: record,
  //     //   title: '修改',
  //     // })
  //   } else if (e.key === '2') {
  //     message.info('暂无法修改');
  //     // dispatch({
  //     //   type: 'userController/isVisible',
  //     //   isVisible: true,
  //     //   isPassswordRequired: false,
  //     //   user: record,
  //     //   title: '修改',
  //     // })
  //   } else if (e.key === '3') {
  //     const { dispatch } = this.props;
  //     const clean = this.cleanSelectedKeys;
  //     confirm({
  //       title: '确认删除吗？',
  //       onOk() {
  //         dispatch({
  //           type: 'rule/remove',
  //           payload: {
  //             no: record.no,
  //           },
  //           callback: clean,
  //         });
  //       },
  //     });
  //   }
  // };
  render() {
    const { selectedRowKeys, visible, confirmLoading } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const status = ['新建', '已完成', '履行中', '终止'];
    const bType = ['内贸', '外贸'];
    const columns = [
      {
        title: '业务编号',
        dataIndex: 'no',
        width: 200,
        fixed: 'left',
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
        title: '业务描述',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '操作',
        width: 200,
        fixed: 'right',
        render: () => (
          <span>
            <a href="/#/business/detail">详情</a>
            <Divider type="vertical" />
            <a onClick={this.updateOne}>修改</a>
            <Divider type="vertical" />
            <a onClick={this.deteteOne}>删除</a>
          </span>
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
          scroll={{ x: 1500 }}
        />
        <Modal
          title="修改业务"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务名称"
          >
            <Input placeholder="请输入" defaultValue="铝锭业务" />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务类型"
          >
            <Select
              defaultValue="0"
              style={{ width: '100%' }}
              onChange={this.handleChange}
            >
              <Option value="0">内贸</Option>
              <Option value="1">外贸</Option>
            </Select>
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务描述"
          >
            <TextArea placeholder="请输入" defaultValue="这是一笔铝铝锭业务，紧急时间紧迫" />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="货物名称"
          >
            <Input placeholder="请输入" defaultValue="铝锭" />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="货物规格"
          >
            <Input placeholder="请输入" defaultValue="A00" />
          </FormItem>
          <Divider />
          {this.state.ItemArray}
          <Button onClick={this.addItemArray}>增加货物描述</Button>
        </Modal>
      </div>
    );
  }
}

export default StandardTable;
