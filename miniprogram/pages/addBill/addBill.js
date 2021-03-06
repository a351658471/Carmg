// miniprogram/pages/addBill/addBill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowInput:false, // 服务金额input是否显示
    date:'',
    carPlate:'',
    phone:'',
    resData:{
      billDate:0,
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
     if(options.date !=undefined){
       let date = JSON.parse(options.date)
       this.setData({
         carPlate:date.carNum,
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
        // this.data.resData.billList[index].count = item.count
      }
    })
    this.setData({
      resData: this.data.resData
    }
    )
  },
  //规格改变
  unitChange(e){
    let index = e.detail.index;
    let value = e.detail.value;
    console.log(index)
    console.log(value)
    this.data.resData.billList.forEach((item,i)=>{
      if(i == index){
        this.data.resData.billList[index].unit = value;
        // this.data.resData.billList[index].count = item.count
      }
    })
    this.setData({
      resData: this.data.resData
    }
    )
  },
  carPlateBlur(e){
    this.setData({
      carPlate:e.detail.value
    })
  },
  phoneBlur(e){
    this.setData({
      phone:e.detail.value
    })
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
    let value = e.detail.value;
    let a = 'resData.serveDetail.serveContent'
    this.setData({
      [a]:value
    })
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
    //日期选择器
    bindDateChange: function(e) {
      let dateValue =new Date(e.detail.value).getTime();
      let a = "resData.billDate"
      this.setData({
        date: e.detail.value,
        [a]:dateValue
      })
    },
  //保存
  saveEvent(){
    let carPlate = this.data.carPlate;
    let phone = this.data.phone;
    let detail = JSON.stringify(this.data.resData)
    let total = this.totalPrice(this.data.resData)
    let billDate =this.data.resData.billDate
    console.log(detail)
    wx.cloud.callFunction({
      name:'bill',
      data:{
        action:'addBill',
        carNum:carPlate,
        phone:phone,
        detail:detail,
        total:total,
        billDate:billDate
      }
    }).then(res=>{
      if(res.result.code == 0){
        var pages = getCurrentPages();
        var prevPage = pages[pages.length -3];
        var preData = prevPage.data;
        let item = {
        carNum:carPlate,
        phone:phone,
        detail:detail,
        total:total,
        create_time:billDate,
        pay:0
        }
        preData.resData.push(item)
        prevPage.setData({
          resData:preData.resData
        })
        wx.showToast({
          title: '账单保存成功',
          icon:"none",
          duration:1000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta:2
          })
        }, 1000);
      }
    })
  },
  totalPrice (obj){
    var a = 0;
    for(var i=0;i < obj.billList.length;i++){
      a+= obj.billList[i].price*obj.billList[i].count
    }
    var total = a + obj.serveDetail.price;
    return total
  }
})