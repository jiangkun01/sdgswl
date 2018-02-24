
import React from 'react';
import { connect } from 'dva';

class conductNode extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>1</div>
    );
  }
}
export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(conductNode);
