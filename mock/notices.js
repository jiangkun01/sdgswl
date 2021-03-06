export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2018-01-10',
      type: '通知',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2018-01-10',
      type: '通知',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到高速集团一份新的通知',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000004',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '收到集团新的文件',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000005',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '收到王超的请假条',
      datetime: '2017-08-07',
      type: '通知',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '****合同氧化铝入库提醒',
      description: '截止这个时间 需要入库，请联系上游客户',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000007',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '****合同收款提醒',
      description: '截止这个时间 需要入库，请联系上游客户',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000008',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '****业务质检提醒',
      description: '****业务原定后天完成质量检测',
      datetime: '2017-08-07',
      type: '消息',
    },
    {
      id: '000000009',
      title: '会议任务',
      description: '今天下午两点****客户会议',
      extra: '未开始',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '****三方会谈',
      description: '因为质量检测报告三方没确定需要会谈',
      extra: '马上到期',
      status: 'urgent',
      type: '待办',
    },
    {
      id: '000000011',
      title: '信息安全考试',
      description: '指派你参见信息安全考试',
      extra: '正在进行',
      status: 'doing',
      type: '待办',
    },
  ]);
};
export default {
  getNotices,
};
