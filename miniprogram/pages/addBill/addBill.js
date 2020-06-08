// miniprogram/pages/addBill/addBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowInput:false, // 服务金额input是否显示
    totalPrice:0,
    resData:{
      billList:[
        {
          goodsName:'火花塞',
          unit:'个',
          price:500,
          count:2
        },
        {
          goodsName:'轴承',
          unit:'个',
          price:300,
          count:4
        }
      ],
      serveDetail:{
        price:0,
        serveContent:''
      }
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //删除s商品
  deleteGoods(e){
    let index =  e.detail.index;
    this.data.resData.billList.splice(index,1);
    this.setData({
      resData: this.data.resData
    })
  },
  //改变商品价格
  priceChange(e){
    let index = e.detail.index;
    let value = e.detail.value;
    this.data.resData.billList.forEach((item,i)=>{
      if(i == index){
        this.data.resData.billList[index].price = parseInt(value);
        this.data.resData.billList[index].count = item.count
      }
    })
    this.setData({
      resData: this.data.resData
    }
    )
  },
  nameBlur(e){
    let index = e.detail.index;
    let value = e.detail.value;
    this.data.resData.billList.forEach((item,i)=>{
      if(i == index){
        this.data.resData.billList[index].goodsName = value;
      }
    })
    this.setData({
      resData: this.data.resData
    }
    )
  },
  //数量减1
  reduction(e){
    if(e.detail.count == 1) return; 
    let index = e.detail.index;
    this.data.resData.billList.forEach((item,i)=>{
      if(i == index){
        this.data.resData.billList[index].count = item.count-1
      }
    })
    this.setData({
      resData: this.data.resData
    });
  },
  //数量加1
  addFun(e){
    
    let index = e.detail.index;
    this.data.resData.billList.forEach((item,i)=>{
      if(i == index){
        this.data.resData.billList[index].count = item.count+1
      }
    })
    
    this.setData({
      resData: this.data.resData
    });
  },
  //添加配件
  addGoods(e){
    console.log('1111')
    let dataMadel = {
      goodsName:'',
      unit:'个',
      price:0,
      count:1
    }
    this.data.resData.billList.push(dataMadel);
    this.setData({
      resData: this.data.resData
    })
  },
  bindTextAreaBlur(e){
    console.log(e);
  },
  //点击服务金额
  showInput(){
    this.setData({
      isShowInput:true
    })
  },
  //服务金额输入框失焦
  servePriceBlur(e){
    let servePrice =parseInt(e.detail.value)
    this.data.resData.serveDetail.price = servePrice;

    this.setData({
      isShowInput:false,
      resData:this.data.resData
    })
  },
  //保存
  saveEvent(){

  }
})