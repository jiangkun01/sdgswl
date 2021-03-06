const menuData = [{
  name: '首页',
  icon: 'dashboard',
  path: 'dashboard/index',
  // children: [{
  //   name: '关键数据展示',
  //   path: 'analysis',
  // }],
}, {
  name: '业务管理',
  icon: 'table',
  path: 'business',
  // children: [{
  //   name: '业务列表',
  //   path: 'list',
  // }],
}, {
  name: '合同管理',
  icon: 'form',
  path: 'contract',
  children: [{
    name: '合同基本信息管理',
    path: 'index',
  // /*  path: 'basic-form',*/
  }, {
    name: '发起新合同',
    path: 'create',
  }, {
    name: '合同类目列表',
    path: 'category',
  }, {
    name: '合同相关文档列表',
    // authority: 'admin',
    // path: 'advanced-form',
    path: 'document',
  }, {
    name: '合同审批流程列表',
    // authority: 'admin',
    // path: 'advanced-form',
    path: 'flow/index',
  }],
}, {
  name: '履行计划配置管理',
  icon: 'profile',
  path: 'implementplan',
  children: [{
    name: '履行计划类目列表',
    path: 'category/list',
  }, {
    name: '履行计划模板列表',
    path: 'templat/list',
    // authority: 'admin',
  }],
}, {
  name: '待办事项',
  icon: 'paper-clip',
  path: 'todo/list',
}, {
  name: '贸易台账',
  icon: 'table',
  path: 'account/list',
}];
/* , {
  name: '客户管理',
  icon: 'team',
  path: 'exception',
  children: [{
    name: '客户管理列表',
    path: '11',
  }],
}, {
  name: '台账管理',
  icon: 'book',
  path: 'standing_book ',
  children: [{
    name: '公共台账列表',
    path: '10',
  }, {
    name: '本单位台账列表',
    path: '11',
  }],
}, {
  name: '周报管理',
  icon: 'book',
  path: 'message ',
  children: [{
    name: '公共周报列表',
    path: '12',
  }, {
    name: '本单位周报列表',
    path: '13',
  }],
}, {
  name: '系统管理',
  icon: 'database',
  path: 'sys ',
  children: [{
    name: '系统参数列表',
    path: '14',
  }],
} */

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
