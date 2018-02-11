import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result/index';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    const { dispatch } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/contract/create'));
    };
    const onShow = () => {
      dispatch(routerRedux.push('/contract/index/details/1'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>合同编号：</Col>
          <Col span={16}>2017SDHSLGGM0250</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>合同名称：</Col>
          <Col span={16}>铝锭采购合同</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>相对方：</Col>
          <Col span={16}>上海六易贸易有限公司</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>签订时间：</Col>
          <Col span={16}>2017.08.21</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>合同总金额：</Col>
          <Col span={16}><span className={styles.money}>320.66</span> 万元</Col>
        </Row>
      </div>
    );
    const actions = (
      <div>
        <Button type="primary" onClick={onFinish}>
          重新发起新合同
        </Button>
        <Button onClick={onShow}>
          查看合同信息
        </Button>
      </div>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description=""
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step3);
