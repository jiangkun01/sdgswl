import React, { PureComponent } from 'react';
import { Row, Col, Button, Table, Modal, Form, Input, Icon, DatePicker } from 'antd';

const FormItem = Form.Item;

export default class Modify extends PureComponent {
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  modalHandleOk = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const columns = [{
      title: '变更日期',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '变更类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '变更内容摘要',
      dataIndex: 'note',
      key: 'note',
    }, {
      title: '变更原因',
      dataIndex: 'reason',
      key: 'reason',
    }, {
      title: '相关变更文件',
      dataIndex: 'filename',
      key: 'filename',
      render: (text, render) => (
        <span>
          <Icon type="book" /><a href="#">{ render.filename }</a>
        </span>
      ),
    }];
    const type = ['长期合同', '短期合同', '单货物合同', '内贸合同', '外贸合同', '单次合同'];
    const note = ['合同期限延长为长期', '合同期限缩短为短期', '合同运输货物改为仅仅是煤炭', '合同贸易类型改为内贸', '合同贸易类型改为外贸', '合同执行次数改为单词'];
    const reason = ['合同双方同意长期合作', '合同双方同意放弃长期合作', '合同一方被限制运输货物类型', '合同一方转为国内发展', '合同一方转为国外发展', '合同双方同意本次运输执行完成后，取消合同'];
    const filename = ['长期煤炭运输合同', '短期运输合同', '长期焦炭运输合同', '长期运输合同', '短期杂货运输合同', '长期内贸运输合同'];
    const dataSource = [];
    for (let i = 1; i < 7; i += 1) {
      dataSource.push({
        time: i < 10 ? `2017-0${i}-0${i}` : `2017-${i}-${i}`,
        type: type[i - 1],
        note: note[i - 1],
        reason: reason[i - 1],
        filename: filename[i - 1],
      });
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <Row>
          <Col span={22} style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={this.showModal}>新增+</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={22} offset={1}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
        <Modal title="合同相对方详情" visible={this.state.visible} onOk={this.modalHandleOk} onCancel={this.modalHandleOk}>
          <Row>
            <Col md={24} sm={24}>
              <FormItem {...formItemLayout} label="变更日期" >
                <DatePicker />
              </FormItem>
              <FormItem {...formItemLayout} label="变更类型" >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem {...formItemLayout} label="变更内容摘要" >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem {...formItemLayout} label="变更原因" >
                <Input placeholder="请输入" />
              </FormItem>
              <FormItem {...formItemLayout} label="相关变更文件" >
                <Input placeholder="请输入" />
              </FormItem>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
