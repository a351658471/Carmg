// pages/addBill/components/billList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    billList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //删除s商品
  deleteGoods(e){
    let index = e.currentTarget.dataset.index;
    this.triggerEvent('deleteGoods',{index:index})
  },
  //改变商品价格
  priceChange(e){
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    this.triggerEvent('priceChange',{index:index,value:value})
  },
  //改变规格
  unitChange(e){
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    this.triggerEvent('unitChange',{index:index,value:value})
  }
  ,
  //数量减1
  reduction(e){
    if(e.currentTarget.dataset.count == 1) return; 
    let index = e.currentTarget.dataset.index;
    this.triggerEvent('reduction',{index:index})
  },
  //数量加1
  addFun(e){
    let index = e.currentTarget.dataset.index;
    this.triggerEvent('addFun',{index:index})
  },
  //配件名称
  nameBlur(e){
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    this.triggerEvent('nameBlur',{index:index,value:value})
  },
  //添加配件
  addGoods(){
    this.triggerEvent('addGoods')
  }
  },
})
