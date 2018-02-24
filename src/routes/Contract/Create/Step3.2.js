import mermaid from 'mermaid';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Modal, Tabs, Divider, message } from 'antd';

class setFlow extends React.Component {
  state = {
    modalVisible: false,
  }
  componentDidMount() {
    const searchD = this.props.location.search;
    const params = new window.URLSearchParams(searchD);
    const theme = params.get('theme') || 'default';
    mermaid.initialize({ theme });
    mermaid.init(undefined, this.container);
  }
  render() {
    const { dispatch } = this.props;
    window.callbackD = function () {
      showModal();
    };
    const onPrev = () => {
      dispatch(routerRedux.push('/contract/create/selectflowname'));
    };
    const onOk = () => {
      dispatch(routerRedux.push('/contract/create/result'));
    };
    const showModal = () => {
      this.setState({
        modalVisible: true,
      });
    };
    const hideModalCancel = () => {
      this.setState({
        modalVisible: false,
      });
    };
    const hideModalOk = () => {
      this.setState({
        modalVisible: false,
      });
      message.success('保存成功');
    };
    const defaultCode = `graph TD;
    A((开始))-->B[业务部经办人]
    subgraph 权属单位
    B-->C[业务部负责人]
    C-->D[风控部意见]
    D-->F[财务部意见]
    F-->G[操作部意见]
    G-->H[业务分管领导审签]
    H-->I[风控分管领导意见]
    I-->J[财务总监审签]
    J-->K[风控部复审]
    K-->L[总经理审签]
    L-->M[执行董事审签]
    end;
    M-->N((结束))
    M-->O[运营中心审签]
    subgraph 机关部室
    O---|<->|P[权属单位业务代表意见修订]
    O-->Q[法务部审签]
    Q---|<->|P1[权属单位业务代表意见修订]
    Q-->R[财务审计部审签]
    R---|<->|P2[权属单位业务代表意见修订]
    subgraph 三方会签
    R-->O1[运营中心审签]
    R-->Q1[法务部审签]
    R-->R1[财务审计部审签]
    end
    O1-->S[分管领导意见]
    Q1-->S
    R1-->S
    S---|<->|P3[权属单位业务代表意见修订]
    S-->T[总会计师意见]
    T---|<->|P4[权属单位业务代表意见修订]
    T-->U[总经理意见]
    U---|<->|P5[权属单位业务代表意见修订]
    U-->V[执行董事意见]
    V---|<->|P6[权属单位业务代表意见修订]
    end;
    V-->N;
    click B,C callbackD;
`;
    return (
      <div style={{ overflowX: 'auto' }}>
        <div
          ref={(div) => { this.container = div; }}
        >
          {defaultCode}
        </div>
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <Button onClick={onPrev} style={{ marginRight: 8 }}>
            上一步
          </Button>
          <Button onClick={() => { message.success('设置完成'); }} style={{ marginRight: 8 }}>
            完成设置
          </Button>
          <Button onClick={() => { message.success('已还原到默认设置'); }} style={{ marginRight: 8 }}>
            还原默认设置
          </Button>
          <Button onClick={onOk} style={{ marginRight: 8 }}>
            提交
          </Button>
        </div>
        <Modal
          title="节点设置: 经办人"
          okText="保存"
          cancelText="取消"
          onOk={hideModalOk}
          onCancel={hideModalCancel}
          visible={this.state.modalVisible}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="组织架构" key="1">
              <strong>山东高速物流集团</strong>
              <div style={{ marginTop: '24px' }}>
                <Button icon="plus" size="large" >公司领导</Button>
                <Button icon="plus" size="large">综合办公室</Button>
                <Button icon="plus" size="large">安全技术部</Button>
                <Button icon="plus" size="large">人事政工部</Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="常用联系人" key="2">
              <div>
                <strong>联系人
                </strong>
              </div>
              <div style={{ marginTop: '24px' }}>
                <Button icon="plus" size="large">李雷</Button>
                <Button icon="plus" size="large">张建国</Button>
                <Button icon="plus" size="large">张爱丽</Button>
                <Button icon="plus" size="large">韩梅梅</Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="自定义" key="3">
              <div>
                <Button icon="plus" size="large" >财务部 李峰</Button>
              </div>
            </Tabs.TabPane>
          </Tabs>
          <Divider />
          <div>
            <div style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }}>
              <Button icon="minus" size="large" >公司领导</Button>
            </div>
            <div style={{ marginTop: '24px' }}>
              <Button onClick={() => message.success('添加到自定义成功！')}>添加到自定义</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(setFlow);
