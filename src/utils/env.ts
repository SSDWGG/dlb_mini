import projectConfig from '@root/project.config.json';

type BUILD_ENV = typeof process.env.BUILD_ENV;
interface IEnvConfig {
  baseApi: string; // 后端接口地址
  webHost: string; // webview 地址
  cdnHost: string; // cdn 图片上传地址，图片展示拼接地址
}
interface IMessageTemplate {
  appid: string; // 云小叮
  memberExpired: string; // 会员到期提醒模版id
  withdrawDeposit: string; // 提现提醒模版id
}

// eslint-disable-next-line no-unused-vars
export const allConfigs: { [k in BUILD_ENV]: IEnvConfig } = {
  test: {
    baseApi: 'http://60.191.116.75:23795', 
    webHost: 'http://192.168.4.173',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  pre: {
    baseApi: 'https://pre-m-api.91yunebao.com',
    webHost: 'https://h5-pre.91yunebao.com',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
  prod: {
    baseApi: 'https://m-api.91yunebao.com',
    webHost: 'https://h5.91yunebao.com',
    cdnHost: 'https://panshi-on.meipingmi.com.cn',
  },
};

// 订阅消息模版，根据 appid 配置
const subscribeMessageTemplates: IMessageTemplate[] = [
  {
    appid: 'wxf501c0d330388c22', // 云小叮
    memberExpired: 'd5_jy9Rc0KHoYZdK8dJ91u76lxdNKcpgS0oxEjB--5Y', // 会员到期提醒模版id
    withdrawDeposit: '03N3cKTZ_3GF7B_i9E8gOL2-54khMClgGcxWC49G3Vs', // 提现提醒模版id
  },
  {
    appid: 'wx671509ede7e1307d', // 云小叮开发版
    memberExpired: 'G3_f1Mx__k_D_95pqlHgGNabX-qv1STwZvLGBcZnB-g', // 会员到期提醒模版id
    withdrawDeposit: 'RDgpTvsllkTm5TJefwzBk1oc4-4eV3fNyEahnj09zQk', // 提现提醒模版id
  },
];

export const config =
  allConfigs[process.env.BUILD_ENV] ||
  (process.env.NODE_ENV === 'development' ? allConfigs.test : allConfigs.prod);

export const baseApi = config.baseApi;
export const webHost = config.webHost;
export const cdnHost = config.cdnHost;

export const messageTemplate: IMessageTemplate = subscribeMessageTemplates.find(v => v.appid === projectConfig.appid) || subscribeMessageTemplates[0];
