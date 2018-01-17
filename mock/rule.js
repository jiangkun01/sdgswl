import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
const ItemVo = [];
for (let i = 0; i < 2; i += 1) {
  ItemVo.push({
    IName: `氧化铝 ${i}`,
    gSku: `纯度${i}`,
  });
}
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: 0,
    href: 'https://ant.design',
    avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
    no: Math.floor(Math.random() * 10000000),
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    bName: `氧化铝业务 ${i}`,
    ItemArray: ItemVo,
    BType: Math.floor(Math.random() * 2),
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

export function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.BType) {
    const BType = params.BType.split(',');
    let filterDataSource = [];
    BType.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.BType, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }
  if (params.b_name) {
    dataSource = dataSource.filter(data => data.bName.indexOf(params.b_name) > -1);
  }
  if (params.i_name) {
    dataSource = dataSource.filter(data => data.IName.indexOf(params.i_name) > -1);
  }
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }
  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, bName, IName, gSku, BType, ItemArray } = body;
  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        no: Math.floor(Math.random() * 10000000),
        bName,
        IName,
        gSku,
        BType,
        ItemArray,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        callNo: Math.floor(Math.random() * 1000),
        status: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getRule,
  postRule,
};
