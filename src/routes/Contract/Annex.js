import React, { PureComponent } from 'react';
import { Row, Col, Form, Upload, Message, Button, Table, Modal, Select, Icon } from 'antd';

const FormItem = Form.Item;

@Form.create()
export default class Annex extends PureComponent {
  state = {
    id: '0',
    type: '合同文本',
    modalVisible: false,
    modalStatus: '',
    dataSource: [
      { id: 1, name: '铝锭采购合同', type: '合同文本', uploaduser: '李雷', uploadtime: '2017-08-21', updateuser: '暂无', updatetime: '暂无' },
      { id: 2, name: '合同变更函', type: '变更确认函', uploaduser: '李雷', uploadtime: '2017-08-23', updateuser: '暂无', updatetime: '暂无' },
      { id: 3, name: '合同财务审批单', type: '审批单', uploaduser: '李雷', uploadtime: '2017-08-26', updateuser: '暂无', updatetime: '暂无' },
      { id: 4, name: '合同补充协议', type: '补充协议', uploaduser: '李雷', uploadtime: '2017-08-28', updateuser: '暂无', updatetime: '暂无' },
    ],
  }
  // 添加modal
  showModalAdd = () => {
    this.setState({
      type: '合同文本',
      modalVisible: true,
      modalStatus: '添加文档',
    });
  }
  // 修改modal
  showModalUpdate = (record) => {
    this.setState({
      id: record.id,
      type: record.type,
      modalVisible: true,
      modalStatus: '修改文档',
    });
  }
  // form表单提交
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { modalStatus } = this.state;
        this.modalHandleOk();
        this.props.form.resetFields();
        if (modalStatus.indexOf('添加') >= 0) {
          this.uploadFile(values);
        } else if (modalStatus.indexOf('修改') >= 0) {
          this.updateFile(values);
        }
        Message.success('提交成功！');
      }
    });
  }
  // 添加文件操作
  uploadFile = (values) => {
    const { dataSource } = this.state;
    const name = values.upload[0].name.toString();
    dataSource.push({
      id: Number(dataSource[dataSource.length - 1].id) + 1,
      name: name.substr(0, name.lastIndexOf('.')),
      type: values.type,
      uploaduser: '李雷',
      uploadtime: `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`}-${new Date().getDate()}`,
      updatetime: '暂无',
      updateuser: '暂无',
    });
  }
  // 修改文件操作
  updateFile = (values) => {
    const { id, dataSource } = this.state;
    const name = values.upload != null ? values.upload[0].name.toString() : null;
    for (let i = 0; i < dataSource.length; i += 1) {
      if (dataSource[i].id === id) {
        const tempName = dataSource[i].name;
        dataSource[i].name = name != null ? name.substr(0, name.lastIndexOf('.')) : tempName;
        dataSource[i].type = values.type;
        dataSource[i].updateuser = '李雷';
        dataSource[i].updatetime = `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`}-${new Date().getDate()}`;
      }
    }
  }
  // 文件上传
  normModalFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  // 将所有文件归档
  archiveFile = () => {
    Message.success('归档成功');
  }
  // 隐藏弹出框
  modalHandleOk = () => {
    this.setState({
      modalVisible: false,
    });
    this.props.form.resetFields();
  }
  render() {
    const { type, modalVisible, modalStatus, dataSource } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      { title: '编号', dataIndex: 'id', key: 'id' },
      { title: '文件名称', dataIndex: 'name', key: 'name' },
      { title: '所属类型', dataIndex: 'type', key: 'type' },
      { title: '上传人', dataIndex: 'uploaduser', key: 'uploaduser' },
      { title: '上传时间', dataIndex: 'uploadtime', key: 'uploadtime' },
      { title: '修改人', dataIndex: 'updateuser', key: 'updateuser' },
      { title: '修改时间', dataIndex: 'updatetime', key: 'updatetime' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 65,
        render: (text, record) => (
          <span>
            <a onClick={() => this.showModalUpdate(record)}>修改</a>
          </span>
        ),
      }];
    return (
      <div>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24}>
            <Table dataSource={dataSource} columns={columns} rowKey="id" scroll={{ x: 1000 }} />
          </Col>
        </Row>
        <br />
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.showModalAdd}>添加新文件</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={this.archiveFile}>全部归档</Button>
          </Col>
        </Row>
        <Form onSubmit={this.handleFormSubmit}>
          <Modal
            visible={modalVisible}
            title={modalStatus}
            onCancel={this.modalHandleOk}
            footer={[
              <Button key="back" onClick={this.modalHandleOk}>关闭</Button>,
              <Button key="submit" type="primary" onClick={this.handleFormSubmit}>提交</Button>,
            ]}
          >
            <Row>
              <Col span={22}>
                <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="选择文件类型">
                  {getFieldDecorator('type', {
                    initialValue: type,
                    rules: [{ required: true, message: '请选择类型!' }],
                  })(
                    <Select style={{ width: '100%' }}>
                      <Select.Option value="合同文本">合同文本</Select.Option>
                      <Select.Option value="补充协议">补充协议</Select.Option>
                      <Select.Option value="变更确认函">变更确认函</Select.Option>
                      <Select.Option value="审批单">审批单</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={22}>
                {
                  modalStatus.indexOf('修改') >= 0 ? (
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="选择文件">
                      {getFieldDecorator('upload', { valuePropName: 'fileList',
                        getValueFromEvent: this.normModalFile,
                      })(
                        <Upload.Dragger action="">
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
                        </Upload.Dragger >
                      )}
                    </FormItem>
                  ) : (
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="选择文件">
                      {getFieldDecorator('upload', { valuePropName: 'fileList',
                        getValueFromEvent: this.normModalFile,
                        rules: [{ required: true, message: '请选择文件!' }],
                      })(
                        <Upload.Dragger action="">
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                          </p>
                          <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
                          <p className="ant-upload-hint">支持单个或批量上载</p>
                        </Upload.Dragger >
                      )}
                    </FormItem>
                  )
                }
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

