// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'addBill':
      return addBill(event);
    case 'queryBill':
      return queryBill(event);
    case 'getTotal':
      return getTotal(event);
  }
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

 async function addBill(event){
   let data={
     create_time:event.billDate,
     carNum:event.carNum,
     phone:event.phone,
     detail:event.detail,
     total:event.total,
     payOff:false,
     pay:0,
   } 
   return await db.collection('bill').add({
      data:data
    }).then(res=>{
      return{
        code:0,
        data:res
      }
    })
 }

 async function queryBill(event){
   let type = event.type;
   let page = event.page;
   let pageCount = event.pageCount;
   let idx = page -1;
   let ispay = type == 0?false:true
    return db.collection('bill').where({
      payOff:ispay
    }).skip(idx*pageCount).limit(pageCount).get().then(res=>{
      return res
    })
 }

 async function getTotal(event){
  return await db.collection('bill').where({
     payOff:false,
   }).get().then(res=>{
    let total =0
     if(res.data.length==0){
       return {
         total:total,
         code:0
       }
     }else{
       res.data.forEach(item=>{
        total += item.total - item.pay;
       });
       return {
         total:total,
         code:0
       }
     }
   })
 }