export function getLocation() {
  return new Promise((resolve, reject) => {
    // #ifdef APP
    uni.getLocation({
      type: 'gcj02', // 必须设置为gcj02
      geocode: true, // 是否解析地址信息，仅App支持
      isHighAccuracy: true, // 开启高精度
      success: (res) => {
        resolve({
          ...res.address,
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail: (err) => {
        console.log(err)
        reject(new Error('获取地理位置信息失败'))
      }
    })
    // #endif
    
    // #ifndef APP
    uni.getLocation({
      type: 'wgs84',
      isHighAccuracy: true, // 开启高精度定位
      success: ({ longitude, latitude }) => {
        uni.request({
          method: 'GET',
          url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
          data: {
            key: '刚复制的key',
            location: `${longitude},${latitude}`,
            output: 'JSON'
          },
          success: ({ data }) => {
            const { addressComponent, formatted_address } = data.regeocode
            const [longitude, latitude] = addressComponent.streetNumber.location.split(',')
            resolve({
              longitude,
              latitude,
              province: addressComponent.province,
              city: addressComponent.city,
              district: addressComponent.district,
              street: addressComponent.township,
              address: formatted_address
            })
          },
          fail: (error) => {
            console.log(error)
            reject(new Error('获取地理位置信息失败'))
          }
        })
      }
    })
    // #endif
  })
}
