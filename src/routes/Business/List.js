import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Select, Divider } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const { Option } = Select;
const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    bType: 0,
    GJson: 1,
    ItemArray: [],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  }
  handleChange= (value) => {
    this.setState({
      bType: value,
    });
  };
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }
  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = () => {
    this.setState({
      modalVisible: false,
      ItemArray: [],
      GJson: 1,
    });
  }
  showModalVisible =() => {
    this.setState({
      modalVisible: true,
      ItemArray: [],
      GJson: 1,
    });
    this.addItemArray();
  };
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
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
  handleAdd = () => {
    console.log(

    );
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        ItemArray: this.state.AddItemArray,
        bName: this.state.addInputValue,
        IName: this.state.addIName,
        gSku: this.state.addGSku,
        BType: this.state.bType,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
      addGSku: '',
      addIName: '',
      addInputValue: '',
      bType: 0,
      ItemArray: [],
      GJson: 1,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="业务名称">
              {getFieldDecorator('b_name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务编号">
              {getFieldDecorator('no')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="货种名称">
              {getFieldDecorator('i_name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ float: 'left', marginBottom: 24 }}>
              <Button icon="plus" type="primary" onClick={() => this.showModalVisible(true)}>
                新建
              </Button>
            </span>
            <span style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </div>
        </Row>
      </Form>
    );
  }
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="业务名称">
              {getFieldDecorator('b_name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务编号">
              {getFieldDecorator('no')(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="货种名称">
              {getFieldDecorator('i_name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="业务添加起始时间">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入添加起始时间" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="业务添加结束时间">
              {getFieldDecorator('enddate')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入添加结束时间" />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'left', marginBottom: 24 }}>
            <Button icon="plus" type="primary" onClick={() => this.showModalVisible(true)}>
              新建
            </Button>
          </span>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible, addInputValue, ItemArray } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">批量删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderLayout title="列表页">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新建业务"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="业务名称"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={addInputValue} />
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
          <Divider />
          {ItemArray}
          <Button onClick={this.addItemArray}>增加货物描述</Button>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
