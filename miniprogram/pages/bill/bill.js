// miniprogram/pages/bill/bill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    pageCount:6,
    tabList: ['未还清', '已还清'],
    tabCurrent: 0,
    statusCount:[],
    resData:[],
    enter:false,
    timeout:-1,
    canLoadMore:true,
    billTotal:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    this.getTotal()
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
  onReachBottom(){
    if(!this.data.canLoadMore)return
    this.data.page +=1
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  
  getData(){
    this.data.enter = true;
    wx.cloud.callFunction({
      name:'bill',
      data:{
        action:'queryBill',
        type:this.data.tabCurrent,
        page:this.data.page,
        pageCount:this.data.pageCount
      }
    }).then(res=>{
      let length = this.data.resData.length
      this.data.canLoadMore = res.result.data.length == this.data.pageCount? true:false;
      if(this.data.page == 1) {
        length== 0?null:this.data.resData.splice(0,length)
      }
      res.result.data.forEach(item=>{
        this.data.resData.push(item)
      })
      this.setData({
        resData:this.data.resData
      })
    })
  },
  tabClick(e){
    let current = e.detail.tabCurrent;
    if(current == this.data.tabCurrent)return;
    this.data.tabCurrent = current;
    this.data.page =1;
    clearTimeout(this.data.timeout)
    this.data.timeout = setTimeout(()=>{this.getData()}
      ,100)
  },
  getTotal(){
    wx.cloud.callFunction({
      name:'bill',
      data:{
        action:"getTotal",
      }
    }).then(res=>{
      if(res.result.code == 0){
        this.setData({
          billTotal:res.result.total
        })
      }
    })
  },
  addBill(e){
    wx.navigateTo({
      url: './chooseCar/chooseCar',
    })
  }
})