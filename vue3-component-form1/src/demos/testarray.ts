
const sche = {
  name:"lunbo",
  schema:{
    type:"array",
    title:"轮播数据",
    items:{
      type:"object",
      properties:{
        linkUrl:{
          type:"string",
          title:"linkUrl"
        },
        picUrl:{
          type:"img",
          title:"pcUrl"
        }
      }
    }
  },
  default:[
    {
      linkUrl:"http://y.qq.com/w/album.html?albummid=0044K2vN1sT5mE",
      picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001YCZlY3aBifi.jpg"
    },
    {
      linkUrl:"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2197820&g_f=shoujijiaodian",
      picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000004ckGfg3zaho0.jpg"
    },
    {
      linkUrl:"http://y.qq.com/w/album.html?albummid=001tftZs2RX1Qz",
      picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M00000236sfA406cmk.jpg"
    },
    {
      linkUrl:"https://y.qq.com/msa/218/0_4085.html",
      picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000001s0BXx3Zxcwb.jpg"
    },
    {
      linkUrl:"https://y.qq.com/m/digitalbum/gold/index.html?_video=true&id=2195876&g_f=shoujijiaodian",
      picUrl:"http://y.gtimg.cn/music/photo_new/T003R720x288M000002cwng4353HKz.jpg"
    }
  ],
  uiSchema:{
    properties:{}
  }
}

export default sche;