// miniprogram/pages/userMg/addCar/addCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum:'',
    phone:'',
    _id:'',
    isEdit:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.date != undefined){
      let date = JSON.parse(options.date);
      this.setData({
        isEdit:true,
        _id:date._id,
        carNum:date.carNum,
        phone:date.phone
      })
    }
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
  blurEvnet1(e){
    let value = e.detail.value;
    this.data.carNum = value;
  },
  blurEvnet2(e){
    let value = e.detail.value;
    this.data.phone = value;
  },
  addEvent(){
    let phone = this.data.phone;
    let carNum = this.data.carNum;
    if(this.data.phone == '' || this.data.carNum==''){
      wx.showModal({
        title:'提示',
        content:'手机号和车牌号不能为空'
      })
    }else{
      if(!this.data.isEdit){
        wx.cloud.callFunction({
          name:'userCar',
          data:{
            action:'addUserCar',
            carNum:carNum,
            phone:phone
          }
        }).then(res=>{
          console.log()
          let _id = res.result.data._id;
          if(res.result.code == 0){
            var pages = getCurrentPages();
            var prevPage = pages[pages.length -2];
            var preData = prevPage.data;
            let data = {
              carNum:carNum,
              phone:phone,
              _id:_id
            }
            preData.carList.push(data)
            prevPage.setData({
              carList:preData.carList
            })
            wx.showToast({
              title: '添加成功',
            })
            setTimeout(()=>{wx.navigateBack({
              complete: (res) => {},
            })},1500)
          }
        })
      }else{
        wx.cloud.callFunction({
          name:'userCar',
          data:{
            action:'editUserCar',
            _id:this.data._id,
            phone:this.data.phone,
            carNum:this.data.carNum
          }
        }).then(res=>{
          console.log(res)
          let _id = res.result.data._id;
          if(res.result.code == 0){
            var pages = getCurrentPages();
            var prevPage = pages[pages.length -2];
            var preData = prevPage.data;
            let data = {
              carNum:carNum,
              phone:phone,
              _id:_id
            }
            preData.carList.push(data)
            prevPage.setData({
              carList:preData.carList
            })
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(()=>{wx.navigateBack({
              complete: (res) => {},
            })},1500)
          }
        })
      }
      
    }
  }
})