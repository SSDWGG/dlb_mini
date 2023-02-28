import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Iconfont from '@/components/iconfont';

/**
 * 只将【基础组件】注册到全局 Button,Cell,ConfigProvider,Icon,OverLay,Popup,
 * https://nutui.jd.com/#/zh-cn/component/button
 */
import {
  Icon,
  Cell,
  CellGroup,
  Button,
  ConfigProvider,
  OverLay,
  Popup,
} from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';
import { useSystemInfoStore } from '@/stores/systemInfo';

if (process.env.NODE_ENV === 'production')
  console.log('小程序打包信息', process.env.buildInfo); // eslint-disable-line no-console

/**
 * 初始化 app 做的事情。如果代码逻辑过于冗长，可以拆分出去
 * **/
const initApp = (options: Taro.getLaunchOptionsSync.LaunchOptions) => {
  const systemInfoStore = useSystemInfoStore();
  // 获取系统信息
  systemInfoStore.getSystemInfo();
  console.log('initApp时的参数',options);
  

};

const App = createApp(
  {
    onShow: initApp,

  }
     // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
);

App.use(createPinia());
[
  Icon,
  Cell,
  CellGroup,
  Button,
  ConfigProvider,
  OverLay,
  Popup,
  Iconfont,
].forEach((Component) => App.use(Component));

export default App;
