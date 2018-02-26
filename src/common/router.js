import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => namespace === model)
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/index': {
      component: dynamicWrapper(app, ['chart', 'rule'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/contract/category': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Category')),
    },
    '/contract/document': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Document')),
    },
    '/contract/flow/index': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Flow/Index')),
    },
    '/contract/flow/index/list': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Flow/List')),
    },
    '/contract/flow/index/detail/:no': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Flow/Detail')),
    },
    '/contract/create': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Create/index')),
    },
    '/contract/index': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Index')),
    },
    '/contract/index/list': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/List')),
    },
    '/contract/index/details/:dStatus': {
      component: dynamicWrapper(app, [], () => import('../routes/Contract/Details')),
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/contract/create/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Contract/Create/Step1')),
    },
    '/contract/create/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Contract/Create/Step2')),
    },
    '/contract/create/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Contract/Create/Step4')),
    },
    '/contract/create/selectflowname': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Contract/Create/Step3.1')),
    },
    '/contract/create/setflow': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Contract/Create/Step3.2')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/business': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Business/Index')),
    },
    '/business/list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/Business/List')),
    },
    '/business/detail': {
      component: dynamicWrapper(app, [], () => import('../routes/Business/Detail')),
    },
    '/Business/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/BasicList')),
    },
    '/Business/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/Business/Articles')),
    },
    '/implementplan/category/list': {
      component: dynamicWrapper(app, [], () => import('../routes/implementplan/category/List')),
    },
    '/implementplan/templat/list': {
      component: dynamicWrapper(app, [], () => import('../routes/implementplan/templat/List')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());
  const routerData = {};
  Object.keys(routerConfig).forEach((item) => {
    const menuItem = menuData[item.replace(/^\//, '')] || {};
    routerData[item] = {
      ...routerConfig[item],
      name: routerConfig[item].name || menuItem.name,
      authority: routerConfig[item].authority || menuItem.authority,
    };
  });
  return routerData;
};
