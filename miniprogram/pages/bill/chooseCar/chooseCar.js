// miniprogram/pages/userMg/userMg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
    page: 1,
    pageCount: 10,
    canLoadMore:true
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
  onReachBottom(){
    if(!this.data.canLoadMore)return
    this.data.page +=1
    this.getData()
  },
  valueChange(e){
    let value = e.detail.value;
    this.data.page = 1,
    clearTimeout(this.data.timeId);
    this.data.timeId = setTimeout(() => {
      this.getData(value)
    }, 500);
  },
  getData(e) {
    let searchValue = e == null?'':e
    wx.cloud.callFunction({
      name: "userCar",
      data: {
        action: 'queryUserCar',
        page: this.data.page,
        pageCount: this.data.pageCount,
        searchValue:searchValue
      }
    }).then(res => {
      
      if (Array.isArray(res.result.data) && res.result.data.length != 0) {
        if(this.data.page == 1 && this.data.carList.length !=0){
          let length = this.data.carList.length
          this.data.carList.splice(0,length)
        } 
        this.data.canLoadMore = res.result.data.length < this.data.pageCount? false:true
        res.result.data.forEach(item => {
          this.data.carList.push(item)
        })
        this.setData({
          carList: this.data.carList
        })
      }
    })
  },
  chooseHandle(e) {
    let index = e.currentTarget.dataset.index;
    let _id = e.currentTarget.dataset.id;
    let carNum = this.data.carList[index].carNum;
    let phone = this.data.carList[index].phone;
    let date = {
      _id,
      carNum,
      phone
    }
    wx.navigateTo({
      url: '../../addBill/addBill?date=' + JSON.stringify(date),
    })
  },
})