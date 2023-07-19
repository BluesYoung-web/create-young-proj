/*
 * @Author: zhangyang
 * @Date: 2023-07-18 14:29:41
 * @LastEditTime: 2023-07-18 14:48:53
 * @Description: 地图相关(基于腾讯地图)
 */
import { getMapApiKey } from '@/config';

export type TxLocationSearchRes = {
  address: string;
  title: string;
  _distance: number;
  id: string;
  location: {
    lat: number
    lng: number
  };
};

export type TxLocationSearch = {
  /**
   * 分页信息
   */
  page_size: number;
  page_index: number;
  /**
   * 搜索关键字
   */
  keyword: string;

  /**
   * 经纬度
   */
  latitude: number;
  longitude: number;
};

/**
 * 地点搜索
 */
export const searchLoaction = (args: TxLocationSearch) => {
  const { page_size, page_index, keyword, latitude, longitude } = args;

  return new Promise<TxLocationSearchRes[]>((resolve, reject): void => {
    uni.request({
      url: `https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(${latitude},${longitude},1000)${keyword ? `&keyword=${keyword}` : ''}&page_size=${page_size}&page_index=${page_index}&key=${getMapApiKey()}`,
      success: (res) => {
        resolve((res.data as unknown as { data: TxLocationSearchRes[] }).data);
      },
      fail: (err) => {
        console.log(err);
        reject();
      },
      complete: (err) => {
        console.log(err);
        reject();
      },
    })
  })

};

export type GeoCoderRes = {
  province_code: string;
  city_code: string;
  city: string;
  province: string;
  location: {
    lat: number;
    lng: number;
  };
};

/**
 * 逆地址解析（坐标位置描述）
 */
export const geocoderLocation = (latitude: number, longitude: number) => {
  return new Promise<GeoCoderRes>((resolve, reject): void => {
    uni.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${getMapApiKey()}&get_poi=1`,
      success: (res) => {
        const ad_info = (res.data as any).result.ad_info;
        resolve({
          ...ad_info,
          province_code: ad_info.adcode.slice(0, 2),
          city_code: ad_info.adcode.slice(0, 4),
        });
      },
      fail: (err) => {
        console.log(err);
        reject();
      },
      complete: (err) => {
        console.log(err);
        reject();
      },
    });
  });
};
