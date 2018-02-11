import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Select, InputNumber, Button, Upload, Icon, Input, DatePicker, Divider, Radio, Table, Checkbox } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
let uuid = 1;
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class create extends PureComponent {
  state = {
    isDisabled: true,
    isSeller: 'none',
    value: 2,
    isRelevance: 'block',
    isNoRelevance: 'none',
    isBu: 'none',
  };
  onChange = (e) => {
    if (e.target.value === 1) {
      this.setState({
        isRelevance: 'none',
        isNoRelevance: 'block',
      });
      this.add();
    } else {
      this.setState({
        isRelevance: 'block',
        isNoRelevance: 'none',
      });
      this.props.form.setFieldsValue({
        keys: [],
      });
    }
    this.setState({
      value: e.target.value,
    });
  }
  changeMlink = (value) => {
    if (value === '1') {
      this.setState({
        isSeller: 'block',
      });
    } else {
      this.setState({
        isSeller: 'none',
      });
    }
  };
  changeMlinkB = () => {
    this.setState({
      isBu: 'block',
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      // if (!err) {
      console.log(err);
      this.props.dispatch(routerRedux.push('/contract/details?dStatus=1'));
      // }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  删除货物描述
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  // 增加货物描述
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid += 1;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { isDisabled, isSeller } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const data = [{
      key: '1',
      name: '货物1',
      gSku: '测试数据',
      gPrice: '100',
      gAcount: '200',
    }, {
      key: '2',
      name: '货物2',
      gSku: '测试数据',
      gPrice: '100',
      gAcount: '1100',
    }, {
      key: '3',
      name: '货物2',
      gSku: '测试数据',
      gPrice: '100',
      gAcount: '100',
    }];
    const columns = [{
      title: '货物名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '货物规格',
      dataIndex: 'gSku',
      key: 'gSku',
    }, {
      title: '货物单价',
      dataIndex: 'gPrice',
      key: 'gPrice',
      render: text => (
        <FormItem
          {...formItemLayout}
        >
          {getFieldDecorator(text, {
            rules: [{
              required: true,
              message: '请输入货物单价',
            }],
          })(
            <InputNumber min={1} max={10000000} />
          )}
          <span className="ant-form-text">元/吨</span>
        </FormItem>
      ),
    }, {
      title: '货物数量',
      dataIndex: 'gAcount',
      key: 'gAcount',
      render: text => (
        <FormItem
          {...formItemLayout}
        >
          {getFieldDecorator(text, {
            rules: [{
              required: true,
              message: '请输入货物数量',
            }],
          })(
            <InputNumber min={1} max={10000000} />
          )}
          <span className="ant-form-text">/吨</span>
        </FormItem>
      ),
    }, {
      title: '选中',
      key: 'action',
      render: () => (
        <Checkbox />
      ),
    }];
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div key={`d[${k}]`}>
          <FormItem
            {...formItemLayout}
            label={`货物名称${index + 1}`}
            key={`names[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入货物名称',
              }],
            })(
              <Input placeholder="请输入货物名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`货物规格${index + 1}`}
            required={false}
            key={`sku[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`sku[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入货物规格',
              }],
            })(
              <Input placeholder="请输入货物规格" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`货物单价${index + 1}`}
            key={`gPrice[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`gPrice[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入货物单价',
              }],
            })(
              <InputNumber min={1} max={10000000} />
            )}
            <span className="ant-form-text"> 元/吨</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`货物数量${index + 1}`}
            key={`gAcount[${k}]`}
            hasFeedback
          >
            {getFieldDecorator(`gAcount[${k}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入货物数量',
              }],
            })(
              <InputNumber min={1} max={10000000} />
            )}
            <span className="ant-form-text">吨</span>
          </FormItem>
          <Divider>
            {keys.length > 1 ? (
              <Icon
                type="close-circle-o"
                spin="true"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
                style={{ fontSize: 16, color: '#F25D46' }}
              />
          ) : null}
          </Divider>
        </div>
      );
    });
    return (
      <PageHeaderLayout>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: -24, minHeight: 509, paddingTop: 10 }}
            >
              <Row>
                <Col span={7} offset={1}><h2><Icon type="folder" style={{ color: '#3AA1FF', fontSize: 20 }} />&nbsp;<strong>发起新合同</strong></h2></Col>
              </Row>
              <Divider />
              <Row>
                <Col span={7} offset={1}><h3>发起人：<strong>李雷</strong></h3></Col>
                <Col span={7} offset={1}><h3>发起日期：<strong>2017-01-01</strong></h3></Col>
                <Col span={7} offset={1}><h3>合同发起部门：<strong>标准箱公司业务部</strong></h3></Col>
              </Row>
              <Divider />
              <br />
              <Row>
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    {...formItemLayout}
                    label="合同编号"
                    hasFeedback
                  >
                    {getFieldDecorator('no', { initialValue: '2017SDHSLGGMZH0006' })(
                      <Input readOnly={isDisabled} />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="择贸易环节"
                    hasFeedback
                  >
                    {getFieldDecorator('mLink', {
                      rules: [
                        { required: true, message: '请选择贸易环节' },
                      ],
                    })(
                      <Select placeholder="请选择贸易环节" onChange={this.changeMlink} >
                        <Option value="0">采购</Option>
                        <Option value="1">销售</Option>
                        <Option value="2">仓储</Option>
                        <Option value="3">物流</Option>
                        <Option value="4">质检</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="预计实现收入"
                    hasFeedback
                    style={{ display: isSeller }}
                  >
                    {getFieldDecorator('sPrice', {
                      rules: [
                        { required: false, message: '请选择预计实现收入' },
                      ],
                    })(
                      <InputNumber min={1} />
                    )}
                    <span className="ant-form-text"> 万元</span>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="合同有效期"
                    hasFeedback
                  >
                    {getFieldDecorator('mTermOfValidity', {
                      rules: [
                        { required: true, message: '请选择合同有效期' },
                      ],
                    })(
                      <Select placeholder="请选择合同有效期">
                        <Option value="0">长期</Option>
                        <Option value="1">单次</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="其他分类"
                    hasFeedback
                  >
                    {getFieldDecorator('mOtherType')(
                      <Select placeholder="其他分类">
                        <Option value="0">长协</Option>
                        <Option value="1">框架</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="付款方式"
                    hasFeedback
                  >
                    {getFieldDecorator('payType', {
                      rules: [
                        { required: true, message: '请选择付款方式', type: 'array' },
                      ],
                    })(
                      <Select mode="multiple" placeholder="请选择付款方式" >
                        <Option value="LG">LG</Option>
                        <Option value="green">现汇</Option>
                        <Option value="DP">DP</Option>
                        <Option value="blue">信用证</Option>
                        <Option value="TT">TT</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="相对方"
                    hasFeedback
                  >
                    {getFieldDecorator('toEachOther', {
                      rules: [
                        { required: true, message: '请选择相对方' },
                      ],
                    })(
                      <Select showSearch placeholder="请选择相对方" onChange={this.changeMlinkB} >
                        <Option value="测试数据1">测试数据1</Option>
                        <Option value="测试数据2">测试数据2</Option>
                        <Option value="测试数据3">测试数据3</Option>
                        <Option value="测试数据4">测试数据4</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="相对方合同编号"
                    hasFeedback
                  >
                    {getFieldDecorator('toEachOtherNo')(
                      <Input />
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="合同总金额"
                    hasFeedback
                  >
                    {getFieldDecorator('priceAcount', {
                      rules: [
                        { required: true, message: '请选择合同总金额' },
                      ],
                    })(
                      <InputNumber min={1} max={10000000} />
                    )}
                    <span className="ant-form-text"> 万元</span>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="合同签订时间"
                    hasFeedback
                  >
                    {getFieldDecorator('cDate', {
                    rules: [
                      { required: true, message: '请选择核定签订日期' },
                    ],
                  })(
                    <DatePicker />
                  )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="合同原文"
                  >
                    <div className="dropbox">
                      {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                      })(
                        <Upload.Dragger name="files" action="/api/upload">
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">点击上传合同原文</p>
                          <p className="ant-upload-hint">支持单个或多个合同原文上传</p>
                        </Upload.Dragger>
                      )}
                    </div>
                  </FormItem>
                  <Divider dashed >关联业务信息</Divider>
                  <FormItem
                    {...formItemLayout}
                    label="选择关联的业务"
                  >
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value={1}>新建业务</Radio>
                      <Radio value={2}>关联已有业务</Radio>
                    </RadioGroup>
                  </FormItem>
                  <div style={{ display: this.state.isRelevance }} >
                    <FormItem
                      {...formItemLayout}
                      label="关联已有业务"
                      hasFeedback
                    >
                      {getFieldDecorator('relevance', {
                        rules: [
                          { required: true, message: '请选择关联业务' },
                        ],
                      })(
                        <Select showSearch placeholder="选择关联已有业务" onChange={this.changeMlinkB} >
                          <Option value="测试数据1">测试数据1</Option>
                          <Option value="测试数据2">测试数据2</Option>
                          <Option value="测试数据3">测试数据3</Option>
                          <Option value="测试数据4">测试数据4</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="选择业务中的货物"
                      hasFeedback
                      style={{ display: this.state.isBu }}
                    >
                      <Table {...formItemLayout} columns={columns} dataSource={data} />
                    </FormItem>
                  </div>
                  <div style={{ display: this.state.isNoRelevance }} >
                    <FormItem
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 15 }}
                      label="业务名称"
                    >
                      {getFieldDecorator('bName', {
                      rules: [
                        { required: true, message: '请输入业务名称' },
                      ],
                    })(
                      <Input placeholder="请输入" onChange={this.handleAddInput} />
                      )}
                    </FormItem>
                    <FormItem
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 15 }}
                      label="业务类型"
                    >
                      <Select
                        defaultValue="0"
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                      >
                        <Option value="0">内贸</Option>
                        <Option value="1">外贸</Option>
                      </Select>
                    </FormItem>
                    <Divider />
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                      <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> 增加货物描述
                      </Button>
                    </FormItem>
                  </div>
                  <FormItem
                    wrapperCol={{ span: 12, offset: 6 }}
                  >
                    <Button type="primary" htmlType="submit">发起新合同</Button>
                  </FormItem>
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
