import React from 'react';
import { connect } from 'dva';
import { Button, Card, List, message } from 'antd';
import { routerRedux } from 'dva/router';

class selectFlowName extends React.PureComponent {
  componentDidMount() {

  }
  render() {
    const { dispatch } = this.props;
    const onValidateForm = () => {
      dispatch(routerRedux.push('/contract/create/setflow'));
    };
    const data = [
      {
        title: '贸易类合同审批流程',
      },
    ];
    const onPrev = () => {
      dispatch(routerRedux.push('/contract/create/confirm'));
    };
    return (
      <Card title="发起合同审批">
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card
                title={item.title}
                extra={
                  <Button type="primary" onClick={onValidateForm} >
                    选择
                  </Button>
                }
              >
                审批流程
              </Card>
            </List.Item>
          )}
        />
        <Button onClick={onPrev} style={{ marginRight: 8 }}>
          上一步
        </Button>
        <Button type="primary" onClick={() => { message.success('暂存成功'); }}>
          暂存
        </Button>
      </Card>

    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(selectFlowName);
