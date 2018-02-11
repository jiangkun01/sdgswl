import moment from 'moment';
// mock data
const visitData = [];
const visitData1 = [];
const beginDay = new Date().getTime();

const fakeY = [700, 512, 40800, 237560, 55001, 55061, 105001, 85001, 105001, 201234, 100023, 55555];
const fakeY1 = [7, 5, 4, 2, 4, 7, 20, 6, 5, 9, 6, 10];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: `2017年${i + 1}月`,
    y: fakeY[i],
  });
}
for (let i = 0; i < fakeY1.length; i += 1) {
  visitData1.push({
    x: `2017年${i + 1}月`,
    y: fakeY1[i],
  });
}
const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [
  { name: '采购', '一月 ': 18, '二月 ': 28, '三月 ': 39, '四月 ': 81, '五月 ': 47, '六月 ': 20, '七月 ': 24, '八月 ': 35, '九月 ': 41, '十月 ': 70, '十一月 ': 55, '十二月 ': 68 },
  { name: '销售', '一月 ': 20, '二月 ': 33, '三月 ': 44, '四月 ': 99, '五月 ': 52, '六月 ': 35, '七月 ': 37, '八月 ': 42, '九月 ': 45, '十月 ': 80, '十一月 ': 65, '十二月 ': 78 },
];
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '氧化铝',
    y: 4544,
  },
  {
    x: '焦炭',
    y: 3321,
  },
  {
    x: '胶粉',
    y: 3113,
  },
  {
    x: '乙二酸',
    y: 2341,
  },
  {
    x: '铝锭',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];
const salesTypeData1 = [
  {
    x: '氧化铝',
    y: 12,
  },
  {
    x: '焦炭',
    y: 10,
  },
  {
    x: '胶粉',
    y: 8,
  },
  {
    x: '乙二酸',
    y: 9,
  },
  {
    x: '铝锭',
    y: 10,
  },
  {
    x: '其他',
    y: 10,
  },
];
const salesTypeDataOnline = [
  {
    x: '氧化铝',
    y: 244,
  },
  {
    x: '焦炭',
    y: 321,
  },
  {
    x: '胶粉',
    y: 311,
  },
  {
    x: '乙二酸',
    y: 41,
  },
  {
    x: '铝锭',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];
const salesTypeDataOnline1 = [
  {
    x: '氧化铝',
    y: 5,
  },
  {
    x: '焦炭',
    y: 5,
  },
  {
    x: '胶粉',
    y: 5,
  },
  {
    x: '乙二酸',
    y: 4,
  },
  {
    x: '铝锭',
    y: 3,
  },
  {
    x: '其他',
    y: 9,
  },
];
const salesTypeDataOffline = [
  {
    x: '氧化铝',
    y: 99,
  },
  {
    x: '焦炭',
    y: 188,
  },
  {
    x: '胶粉',
    y: 344,
  },
  {
    x: '乙二酸',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];
const salesTypeDataOffline1 = [
  {
    x: '氧化铝',
    y: 7,
  },
  {
    x: '焦炭',
    y: 5,
  },
  {
    x: '胶粉',
    y: 3,
  },
  {
    x: '乙二酸',
    y: 5,
  },
  {
    x: '其他',
    y: 18,
  },
];
const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `门店${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

//
const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

export const getFakeChartData = {
  visitData,
  visitData1,
  salesTypeData1,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  salesTypeDataOnline1,
  salesTypeDataOffline1,
  radarData,
};

export default {
  getFakeChartData,
};
