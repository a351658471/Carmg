// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'addUserCar':
      return addUserCar(event);
    case 'queryUserCar':
      return queryUserCar(event);
    case 'removeUserCar':
      return removeUserCar(event);
    case 'editUserCar':
      return editUserCar(event);
  }
}

//添加车辆
async function addUserCar(event){
  if(event.carNum == '' || event.phone == '') return {code:-1,msg:'车牌号和手机号不能为空'};
  return db.collection('usercar').add({
    data:{
      carNum : event.carNum,
      phone:event.phone
    }
  }).then(res=>{
    return {
      code:0,
      data:res
    }
  })
}

//查询车辆
async function queryUserCar(event){
  let page = event.page;
  let pageCount =  event.pageCount;
  let i = page -1;
  let searchValue ='';
  event.searchValue == ''?null:searchValue = event.searchValue;
  if(searchValue !=''){
    return db.collection('usercar').where(_.or([
      {
        phone:db.RegExp({
          regexp:'.*' +searchValue,
          options:'i'
        })
      },
      {
        carNum:db.RegExp({
          regexp:'.*' + searchValue,
          options:'i'
        })
      }
    ])).skip(i*pageCount).limit(pageCount).get().then(res=>{
      return res
    })
  }
  return db.collection('usercar').skip(i*pageCount).limit(pageCount).get().then(res=>{
    return res
  })
}

//修改车辆
async function editUserCar(event){
  let carNum = event.carNum;
  let phone = event.phone;
  let id = event._id;
  if(carNum == '' || phone==''|| id=='') return {code:1,msg:'传参不能为空'};
  return db.collection('usercar').doc(id).update({
    data:{
      carNum:carNum,
      phone : phone
    }
  }).then(res=>{
    return{
      code:0,
      data:res
    }
  })
}

//删除车辆
async function removeUserCar(event){
  let _id = event._id;
  return db.collection('usercar').doc(_id).remove().then(res=>{
    return {
      code:0,
      data:res
    }
  })
}

