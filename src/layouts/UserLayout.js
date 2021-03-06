import React from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import { getRoutes } from '../utils/utils';

// const links = [{
//   key: 'help',
//   title: '帮助',
//   href: '',
// }, {
//   key: 'privacy',
//   title: '隐私',
//   href: '',
// }, {
//   key: 'terms',
//   title: '条款',
//   href: '',
// }];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 山东高速信息工程</div>;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '业务类合同管理';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 山东高速物流集团`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    const logopng = 'logo.png';
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logopng} />
                <span className={styles.title}>山东高速物流集团</span>
              </Link>
            </div>
          </div>
          <Switch>
            {getRoutes(match.path, routerData).map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              )
            )}
            <Redirect exact from="/user" to="/user/login" />
          </Switch>
          <GlobalFooter className={styles.footer} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
