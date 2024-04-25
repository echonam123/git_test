// 封装ajax
function myAjax(option) {
  const xhr = new XMLHttpRequest()
  const defaultUrlHeader = 'http://1.12.220.218:8585/cat'
  // 如果是get并且有数据
  if (option.type == 'GET' && option.data) {
    option.url = defaultUrlHeader + option.url + '?' + option.data
  }
  else {
    option.url = defaultUrlHeader + option.url
  }
  xhr.open(option.type, option.url, true)
  // 设置请求头
  if (option.headers) {
    for (let key in option.headers) {
      xhr.setRequestHeader(key, option.headers[key])
    }
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        option.callback(xhr.responseText)
      }
      else {
        option.error()
      }
    }
  }
  // 判断不同请求类型
  if (option.data instanceof FormData) {
    xhr.send(option.type == 'POST' ? option.data : null)
  }
  else {
    xhr.send(option.type == 'POST' ? JSON.stringify(option.data) : null)
  }
}

// 定义所有模块信息
const forgetModule = document.querySelector('.forget-module')
const indexModule = document.querySelector('.index-module')
const userModule = document.querySelector('.user-module')
const editModule = document.querySelector('.edit-module')
const creationModule = document.querySelector('.creation-module')
// 导航栏
const nav = document.querySelector('nav')

// 点击logo跳转到主页
const logoHome = document.querySelectorAll('.logo')
logoHome[0].addEventListener('click', function () {
  forgetModule.style.display = 'none'
  userModule.style.display = 'none'
  editModule.style.display = 'none'
  indexModule.style.display = 'block'
  creationModule.style.display = 'none'
})
logoHome[1].addEventListener('click', function () {
  creationModule.style.display = 'none'
  indexModule.style.display = 'block'
  nav.style.display = 'block'
})

// 导航栏搜索，获得焦点事件
// menu后两个小li消失，搜索框边框颜色
const menu = document.querySelector('.menu')
const menuLi = menu.querySelectorAll('ul li')
const search = document.querySelector('.search-service div')
const searchInput = document.querySelector('.search-service div input')
searchInput.addEventListener('focus', function () {
  for (let i = menuLi.length - 2; i <= menuLi.length - 1; i++) {
    menuLi[i].style.display = 'none'
  }
  search.style.border = '1px solid var(--orange-color)'
})

searchInput.addEventListener('blur', function () {
  for (let i = menuLi.length - 2; i <= menuLi.length - 1; i++) {
    menuLi[i].style.display = 'block'
  }
  search.style.border = '1px solid var(--gray-color3)'
})

// 点击导航栏的账号

const account = document.querySelectorAll('.small-account')
const login_wrapper = document.querySelector('.login-wrapper')
const closeBtn = document.querySelector('.login-box .close')
const historyBtn = document.querySelector('.history-btn')
const userMenuLi = document.querySelectorAll('.user-service li')

// 头像
const navAvatar = document.querySelectorAll('.nav-avatar')
const userAvatar = document.querySelector('.account-avatar img')
const editAvatar = document.querySelector('.personal-avatar-img')
//如果账号没登陆，弹出注册登录框
function pop_login() {
  login_wrapper.style.display = 'block'
  closeBtn.addEventListener('click', function () {
    login_wrapper.style.display = 'none'
  })
}


// 信息定义
let avatarInfo = null
let fansInfo = 0
let followsInfo = 0
let myName = 'default'
const followNum = document.querySelectorAll('.follow-num2')
const fansNum = document.querySelectorAll('.follow-num1')
// 历史模块
const historyServive = document.querySelector('.history')
function visitorHistoryShow() {
  this.querySelector('.visitor-box').style.display = 'block'
}
function visitorHistoryhid() {
  this.querySelector('.visitor-box').style.display = 'none'
}
function userHistoryShow() {
  this.querySelector('.my-history-box').style.display = 'block'
}
function userHistoryhid() {
  this.querySelector('.my-history-box').style.display = 'none'
}
// 判断是否登录
function show() {
  this.querySelector('.nav-avatar').style.transform = 'translateY(20px) scale(1.3)'
  this.querySelector('.small-account-box').style.display = 'block'
}
function hid() {
  this.querySelector('.nav-avatar').style.transform = 'translateY(0) scale(1)'
  this.querySelector('.small-account-box').style.display = 'none'
}
if (localStorage.getItem('token') == undefined) {
  for (let i = 0; i < navAvatar.length; i++) {
    navAvatar[i].innerHTML = '登录'
  }
  for (let i = 0; i < account.length; i++) {
    account[i].addEventListener('click', pop_login)
    account[i].removeEventListener('mouseenter', show)
    account[i].removeEventListener('mouseleave', hid)
  }
  historyBtn.addEventListener('click', pop_login)
  for (let i = 0; i < userMenuLi.length; i++) {
    userMenuLi[i].addEventListener('click', pop_login)
  }
  historyServive.addEventListener('mouseenter', visitorHistoryShow)
  historyServive.addEventListener('mouseleave', visitorHistoryhid)
  historyServive.removeEventListener('mouseenter', userHistoryShow)
  historyServive.removeEventListener('mouseleave', userHistoryhid)
}
else {
  // 浏览历史模块
  historyServive.removeEventListener('mouseenter', visitorHistoryShow)
  historyServive.removeEventListener('mouseleave', visitorHistoryhid)
  historyServive.addEventListener('mouseenter', userHistoryShow)
  historyServive.addEventListener('mouseleave', userHistoryhid)
  // 点击头像进个人主页
  // console.log(navAvatar.length);
  navAvatar[0].addEventListener('click', function () {
    forgetModule.style.display = 'none'
    userModule.style.display = 'block'
    editModule.style.display = 'none'
    indexModule.style.display = 'none'
    creationModule.style.display = 'none'
  })
  navAvatar[1].addEventListener('click', function () {
    nav.style.display = 'block'
    userModule.style.display = 'block'
    creationModule.style.display = 'none'
  })

  // 获取本人信息

  // let intro = null
  function renderMyInfo() {
    myAjax({
      type: 'GET',
      url: '/user/me',
      headers: {
        'token': localStorage.getItem('token')
      },
      callback: function (responseText) {
        responseText = JSON.parse(responseText)
        if (responseText.code >= 200 && responseText.code < 300) {
          avatarInfo = responseText.data.avatar
          fansInfo = responseText.data.fans
          followsInfo = responseText.data.follows
          myName = responseText.data.username
          // console.log(typeof String(responseText.data.id));
          // console.log(String(responseText.data.id));
          localStorage.setItem('userId', String(responseText.data.id))
          // 首先是渲染account的头像
          for (let i = 0; i < navAvatar.length; i++) {
            navAvatar[i].innerHTML = ''
          }
          if (avatarInfo == null) {
            for (let i = 0; i < navAvatar.length; i++) {
              navAvatar[i].style.background = 'url(./images/avatar/default.jpg) no-repeat center center'
              navAvatar[i].style.backgroundSize = '40px 40px'
            }
            userAvatar.src = './images/avatar/default.jpg'
            editAvatar.style.background = 'url(./images/avatar/default.jpg) no-repeat center center'
            editAvatar.style.backgroundSize = '92px 92px'
          }
          else {
            for (let i = 0; i < navAvatar.length; i++) {
              navAvatar[i].style.background = `url(${avatarInfo}) no-repeat center center`
              navAvatar[i].style.backgroundSize = '40px 40px'
            }
            userAvatar.src = avatarInfo
            editAvatar.style.background = `url(${avatarInfo}) no-repeat center center`
            editAvatar.style.backgroundSize = '92px 92px'
          }
          // 修改粉丝和关注数字
          if (fansInfo == 0) {
            for (let i = 0; i < fansNum.length; i++) {
              fansNum[i].innerHTML = '--'
            }
          }
          else {
            for (let i = 0; i < fansNum.length; i++) {
              fansNum[i].innerHTML = String(fansInfo)
            }
          }
          if (followsInfo == 0) {
            for (let i = 0; i < followNum.length; i++) {
              followNum[i].innerHTML = '--'
            }
          }
          else {
            for (let i = 0; i < followNum.length; i++) {
              followNum[i].innerHTML = String(followsInfo)
            }
          }
          // 渲染名字
          const nameBox = document.querySelectorAll('.name')
          for (let i = 0; i < nameBox.length; i++) {
            nameBox[i].innerHTML = myName
          }
          // intro = responseText.data.intro
          // console.log(responseText.data.intro)
        }
        else {
          console.log("Ruquest Failed1")
          console.log(responseText)
        }
      },
      error: function () {
        console.log("Ruquest Failed2")
      }

    })
  }
  renderMyInfo()
  for (let i = 0; i < account.length; i++) {
    account[i].addEventListener('mouseenter', show)
  }
  for (let i = 0; i < account.length; i++) {
    account[i].addEventListener('mouseleave', hid)
  }

  // 点开创作中心
  nav.querySelector('.release').addEventListener('click', function () {
    nav.style.display = 'none'
    creationModule.style.display = 'block'
    indexModule.style.display = 'none'
    userModule.style.display = 'none'
    forgetModule.style.display = 'none'
    editModule.style.display = 'none'
  })
}

// 热点文章渲染
// function renderBlog() {

// }