// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'addBill':
      return billManage(event);
  }
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}

 async function billManage(event){
   let nowTime = new Date().getTime();
   let data={
     create_time:nowTime,
     carNum:event.carNum,
     phone:event.phone,
     detail:event.detail,
     total:event.total,
     isPay:false,
   }
   return await db.collection('bill').add({
      data:data
    }).then(res=>{
      console.log(res)
    })
 }