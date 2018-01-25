import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from '../Exception/404';
import { getRoutes } from '../../utils/utils';

export default class Index extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    console.log(pathList[pathList.length - 1]);
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <div>
        <Switch>
          {
            getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ))
          }
          <Redirect exact from="/contract/index" to="/contract/index/list" />
          <Route render={NotFound} />
        </Switch>
      </div>
    );
  }
}
