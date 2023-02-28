import { IAlbumListItem } from '@/apis/album/model';
import Taro , { SelectorQuery, NodesRef, createSelectorQuery } from '@tarojs/taro';


/* 
* 简单随机 id 生成
* 微信小程序没有提供 macip 或 设备id 唯一标识，小程序环境内无法使用 crypto.getRandomValues 很多库无法直接使用
* 客户端随机生成 id 总是有可能重复，这里不做特别的id 生成处理，如果生成订单类id 建议 len 设置足够长
*/
export const uuid = (len = 32): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const value: string[] = [];
  const radix = chars.length;
  let i = 0;

  for (i = 0; i < len; i++) {
    value[i] = chars[0 | Math.random() * radix];
  }
  return value.join('');
};

export type IQueryResult = 
  NodesRef.BoundingClientRectCallbackResult |
  NodesRef.ScrollOffsetCallbackResult |
  NodesRef.ContextCallbackResult;

/***
 * 递归查询 query.exec 直到有结果或超时报错（一般第二次有返回结果）
 * @param {SelectorQuery} query
 * @param {Number} interval
 * @param {Number} timeout
 * **/
export const execSelectQuery = (selectQuery: SelectorQuery, interval = 100, timeout = 5000): Promise<IQueryResult | IQueryResult[]> => {
  const _startTime = Date.now();
  return new Promise((resolve, reject) => {
    const func = () => {
      selectQuery.exec(res => {
        const result = res[0];
        if (Date.now() - _startTime > timeout) {
          reject(new Error('query time out'));
        } else if (
          result === null ||
          (Array.isArray(result) && result.length === 0)
        ) {
          setTimeout(func, interval);
        } else {
          resolve(result);
        }
      });
    };
    func();
  });
};

/***
 * 通过 selector 查询单个节点信息
 * **/
export const querySelector = (
  selector: string,
  fields: NodesRef.Fields
): Promise<IQueryResult> =>
  execSelectQuery(
    createSelectorQuery()
      .select(selector)
      .fields(fields)
  ) as Promise<IQueryResult>;

/***
 * 通过 selector 查询多个节点信息
 * **/
export const querySelectorAll = (
  selector: string,
  fields: NodesRef.Fields
): Promise<IQueryResult[]> =>
  execSelectQuery(
    createSelectorQuery()
      .selectAll(selector)
      .fields(fields)
  ) as Promise<IQueryResult[]>;

/***
 * 简单尺寸转化：
 * @param {String|Number} size
 * @return {String|0}
 * **/
export const getSizeToPx = (size: number | string): string | 0 => {
  if (String(size).startsWith('0')) return 0;
  if (typeof size === 'number' || /^\d+$/.test(size)) {
    return `${size}px`;
  }
  return size;
};

/***
 * 在 url 尾部添加参数
 * @param {String} url
 * @param {Object} params
 * **/
export const appendQueryParams = (
  url = '',
  params: Record<string, string | number> = {}
): string => {
  const queryParamsString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  if (!queryParamsString) return url;
  if (url.includes('?')) {
    if (url.endsWith('&') || url.endsWith('?')) return url + queryParamsString;
    return `${url}&${queryParamsString}`;
  }
  return `${url}?${queryParamsString}`;
};

// 判断路径中是否包含协议头
export const hasProtocol = (url: string) => url.match(/^https?/);

// 获取oss视频的预览图片
export const getOSSVideoImg = (fullURL: string) =>
  `${fullURL}?x-oss-process=video/snapshot,t_30,f_jpg,m_fast,ar_auto`;

export const flatAlbumList = (list: IAlbumListItem[]) => list.flatMap(listItem => listItem.list.map(detailItem => ({
    ...listItem,
    ...detailItem
  })));

// 指定字符长度，超出展示...或者超长截取
export const changeLongStr = (str: string, len = 15,ellipsis = true) =>
{
  if(!str)return ''; 
  const arrStr =  Array.from(str);
 return  arrStr.length>len?`${arrStr.slice(0,len).join('')}${ellipsis?'...':''}`:str;
};

// 截取返回指定长度字符
export const formatterLen = (str:string,len=6)=>str.length > len ? str.substring(0, len) : str;


// 获取前端上传oss的静态文件图片
export const getSystemImg = (imgAdress: string) =>
  `https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/${imgAdress}`;


  // 复制到剪贴板
export const copyStr = (str:string) => {
  Taro.setClipboardData({
    data: str,
    success: () => {
      Taro.showToast({
        title: '复制成功'
      });
    }
  });
};


