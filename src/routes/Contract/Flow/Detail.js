import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form,
  Input, Button, Table, Tabs, Divider, Icon } from 'antd';
import Information from '../Information';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const { TabPane } = Tabs;
@connect(({ ccategory, loading }) => ({
  ccategory,
  loading: loading.models.rule,
}))
@Form.create()
export default class Detail extends PureComponent {
  state = {
    loading: false,
    GJson: 1,
    ItemArray: [],
  };
  // loading...
  componentWillMount() {
    this.setState({ loading: true });
    const Ia = [];
    Ia.push(
      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={8} >
          <h3>办理意见1：
            <strong>
              <Input style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }} />
            </strong>
          </h3>
        </Col>
      </Row>
    );
    this.setState({ ItemArray: Ia });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  // 转到详情
  toModalMessage = () => {
    location.href = '/#/contract/index/details/6';
  }
  // 表格排序查找
  handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  }
  render() {
    const { loading } = this.state;
    const addItemArray = (k) => {
      const ItemArrayVo = [];
      this.setState({
        ItemArray: [],
      });
      for (let i = 1; i <= this.state.GJson + k; i += 1) {
        ItemArrayVo.push(
          <Row gutter={24} style={{ marginBottom: '24px' }}>
            <Col span={8} >
              <h3>办理意见{i}：
                <strong>
                  <Input style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }} />
                </strong>
              </h3>
            </Col>
            <Divider>
              {this.state.GJson + k > 1 ? (
                <Icon
                  type="close-circle-o"
                  spin="true"
                  disabled={this.state.GJson + k === 1}
                  onClick={() => addItemArray(-1)}
                  style={{ fontSize: 16, color: '#F25D46' }}
                />
              ) : null}
            </Divider>
          </Row>
        );
      }
      this.setState({
        GJson: this.state.GJson + k,
        ItemArray: ItemArrayVo,
      });
    };
    const columns = [
      {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '提出人',
        dataIndex: 'sp',
      },
      {
        title: '提出时间',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '意见内容',
        dataIndex: 'content',
      },
      {
        title: '处理状态',
        dataIndex: 'status',
      }];
    const columns1 = [
      {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '办理人',
        dataIndex: 'sp',
      },
      {
        title: '办理时间',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '办理意见',
        dataIndex: 'content',
      },
      {
        title: '办理状态',
        dataIndex: 'status',
      }];
    // 表格数据
    const data = [
      {
        id: 1,
        name: '风控部意见',
        addtime: '2017-08-22',
        sp: '李想',
        content: '暂无',
        status: '完成',
      }, {
        id: 2,
        name: '操作部负责人',
        addtime: '2017-08-22',
        sp: '李雷',
        content: '请修改合同第一款',
        status: '退回',
      }, {
        id: 3,
        name: '风控部负责人',
        addtime: '2017-08-22',
        sp: '韩梅梅',
        content: '暂无',
        status: '代办',
      },
    ];
    const data1 = [
      {
        id: 1,
        name: '风控部意见',
        addtime: '2017-08-22',
        sp: '李想',
        content: '暂无',
        status: '完成',
      },
    ];
    return (
      <PageHeaderLayout title="节点办理">
        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="办理节点" key="1">
              <Row gutter={24} style={{ marginBottom: '24px' }}>
                <Col span={8} ><h3>经办人：<strong>李想（已办理）&nbsp;(李雷未办理)</strong></h3></Col>
              </Row>
              <Card title="办理意见" style={{ marginBottom: '24px' }}>
                {this.state.ItemArray}
                <Button onClick={() => addItemArray(1)}>增加货物描述</Button>
              </Card>
              <Row gutter={24} style={{ marginBottom: '24px' }}>
                <Col span={8} >
                  <Button>转交下一步</Button>
                  <Button style={{ marginLeft: '10px' }}>退回</Button>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="合同信息" key="2">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Information />
              </Card>
            </TabPane>
            <TabPane tab="合同正文" key="3">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6}><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>合同文本.docx</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="合同附件" key="4">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>长期协议.docx</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/pdf.jpg" /></div><strong>调查报告...</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word1.jpg" /></div><strong>总部决策.doc</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/excel.jpg" /></div><strong>市场行情...</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="审批单" key="5">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6}><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>审批单.docx</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="意见反馈" key="6">
              <Card title="意见反馈" bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={24}>
                    <Table
                      dataSource={data}
                      columns={columns}
                      loading={loading}
                      rowKey={record => record.id}
                    />
                  </Col>
                </Row>
              </Card>
              <Card title="办理日志" bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={24}>
                    <Table
                      dataSource={data1}
                      columns={columns1}
                      loading={loading}
                      rowKey={record => record.id}
                    />
                  </Col>
                </Row>
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
