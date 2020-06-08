// miniprogram/pages/myPage/myPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: '/assets/mypage/mypage-head.png',
    userInfo:null,
    mgList:[
      {
        img:'../../assets/mypage/mypage-total.png',
        serveName:'数据统计',
        msg:0,
      },
      {
        img:'../../assets/mypage/mypage-backlist.png',
        serveName:'账单管理',
        msg:1,
      },
      {
        img:'../../assets/mypage/mypage-personal.png',
        serveName:'商家信息',
        msg:2,
      },
      {
        img:'../../assets/mypage/mypage-car.png',
        serveName:'车辆管理',
        msg:3,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        if(!res.authSetting["scope.userInfo"])return;
        wx.getUserInfo({
          success: (res) => {
            console.log(res.userInfo)
          },
        })
      },
    })
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
  onGetUserInfo(e){
    console.log(e);
    this.setData({
      userInfo : e.detail.userInfo
    })
  },
  //服务项处理
  serveHandle(e){
    let msg = e.currentTarget.dataset.msg;
    switch(msg){
      case 1 :
        return wx.navigateTo({
          url: '../bill/bill',
        });
        case 3 :
          return wx.navigateTo({
            url: '../userMg/userMg',
          });
    }
  }
  
})