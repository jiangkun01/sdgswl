import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio, Divider, Select,
  Table, InputNumber, Checkbox, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
let uuid = 1;
@Form.create()
class Step2 extends React.PureComponent {
  state = {
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
  };
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
  };
  changeMlinkB = () => {
    this.setState({
      isBu: 'block',
    });
  };
  render() {
    const { dispatch, submitting } = this.props;
    const { getFieldDecorator, getFieldValue, validateFields } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    const data1 = [{
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
    const onPrev = () => {
      dispatch(routerRedux.push('/contract/step-form'));
    };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields(() => {
        dispatch(routerRedux.push('/contract/step-form/result'));
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
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
            label="选择货物"
            hasFeedback
            style={{ display: this.state.isBu }}
          ><Table scroll={{ x: 700 }} style={{ width: 700 }} columns={columns} dataSource={data1} />
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
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button onClick={onPrev} style={{ marginRight: 8 }}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step2);
