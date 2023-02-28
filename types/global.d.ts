/* eslint-disable no-unused-vars */
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq';
    NODE_ENV: 'development' | 'production';
    BUILD_ENV: 'test'|'pre'|'prod';
    [key: string]: any;
  }
};

declare const wx: {
  // ald-stat types
  aldVisit: (goods: { id: string|number; name: string; category: string }) => void;
  aldPayOrder: (price: string|number, details: Array<{ name: string; amout: string|number; category: string; id: string|number; }>) => void;
  aldstat: {
    sendEvent: (key: string, value: Record<string, string>) => void;
    sendUser: (userInfo: Record<string, any>) => void;
  }
};

interface SlimProps {
  class?: any
  style?: any
}

/** 转换 react 的类型到 vue */
type RemoveReactAttribute = 'className' | 'style' | 'key' | 'ref' | 'dangerouslySetInnerHTML'
type TransformReact2VueType<T> = Omit<T, RemoveReactAttribute> & SlimProps

declare module '@tarojs/components' {
  export * from '@tarojs/components/types/index.vue3';
}

// fix hideLoading noConflict type pr:https://github.com/NervJS/taro/pull/13282
declare namespace Taro.hideLoading {
  interface Option {
    noConflict: boolean
  }
}