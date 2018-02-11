import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, InputNumber, DatePicker, Icon, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const FormItem = Form.Item;
@Form.create()
class Step1 extends React.PureComponent {
  state = {
    isDisabled: true,
    isSeller: 'none',
  };
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
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { form, dispatch } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const { isDisabled, isSeller } = this.state;
    const onValidateForm = () => {
      validateFields(() => {
        // if (!err) {
        dispatch(routerRedux.push('/contract/create/confirm'));
        // }
      });
    };
    return (
      <div>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <FormItem
            {...formItemLayout}
            label="合同编号"
            hasFeedback
          >
            {getFieldDecorator('no', { initialValue: '2017SDHSLGGM0250' })(
              <Input readOnly={isDisabled} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择合同类目"
            hasFeedback
          >
            {getFieldDecorator('mLink', {
              rules: [
                { required: true, message: '选择合同类目' },
              ],
            })(
              <Select placeholder="选择合同类目" onChange={this.changeMlink} >
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
              <InputNumber style={{ width: '100%' }} min={1} />
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
              <Select showSearch placeholder="请选择相对方">
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
              <InputNumber style={{ width: '100%' }} min={1} max={10000000} />
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
              <DatePicker style={{ width: '100%' }} />
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
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default connect(({ form }) => ({
  data: form.step,
}))(Step1);
