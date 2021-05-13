const sche = {
  name:"dialog",
  schema:{
    title:"弹窗数据",
    type:"object",
    properties:{
      text:{
        type:"string",
        title:"text"
      },
      picUrl:{
        type:"img",
        title:"pcUrl"
      }
    }
  },
  default:
    {
      text: "确定不再看看吗？",
      picUrl:"https://www.hualigs.cn/image/609ceb7ba7649.jpg"
    },
  uiSchema:{
    properties:{}
  }
}

export default sche;