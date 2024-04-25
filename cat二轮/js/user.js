// 切换登录与注册标签
const tag = document.querySelector('.form-tag')
const form = document.querySelectorAll('.form-content li')
const login_title = {
  '0': '欢迎注册<br>与专业的创作者进行<span class= "text-primary" > 深度的互动交流</span> ',
  '1': '登录可享更多权益<br>提高技能水平<span class= "text-primary" > 海量资源免费使用</span>'
}
tag.addEventListener('click', function (e) {
  if (e.target.tagName == 'LI') {
    document.querySelector(' .active').classList.remove('active')
    e.target.classList.add('active')
    document.querySelector('.show').classList.remove('show')
    form[e.target.dataset.id].classList.add('show')
    document.querySelector('.login-title').innerHTML = login_title[e.target.dataset.id]
  }
})

// 密码眼睛显示与隐藏
const passwordInput = document.querySelectorAll('.password')
for (let i = 0; i < passwordInput.length; i++) {
  passwordInput[i].addEventListener('click', function (e) {
    if (e.target.tagName == 'I') {
      e.target.classList.toggle('fa-eye-slash')
      e.target.classList.toggle('fa-eye')
      if (e.target.classList.contains('fa-eye-slash')) {
        this.querySelector('input').type = 'password'
      }
      else {
        this.querySelector('input').type = 'text'
      }
    }
  })
}

//封装
// 注册信息
function success_register() {
  const login_tag = document.querySelectorAll('.form-tag li')[1]
  const msg = document.querySelectorAll('.register-msg')
  msg[2].classList.remove('wrong')
  msg[2].classList.add('success')
  let count = 5
  let timer = null
  msg[2].innerHTML = `注册成功,即将跳转登录界面${count}`
  timer = setInterval(function () {
    count--
    if (count === 0) {
      clearInterval(timer)
      document.querySelector('.active').classList.remove('active')
      login_tag.classList.add('active')
      document.querySelector('.show').classList.remove('show')
      form[1].classList.add('show')
      document.querySelector('.login-title').innerHTML = login_title[1]
      // 清空表单
      msg[2].innerHTML = ''
      document.querySelector('.register-form [name="username"]').value = null
      document.querySelector('.register-form [name="password"]').value = null
      document.querySelector('.register-form [name="confirm-password"]').value = null
      return
    }
    msg[2].innerHTML = `注册成功,即将跳转登录界面${count}`
  }, 1000)
  setInterval(function () {
    if (document.querySelector('.login-content').classList.contains('show')) {
      // 清空表单
      document.querySelector('.register-form [name="username"]').value = null
      document.querySelector('.register-form [name="password"]').value = null
      document.querySelector('.register-form [name="confirm-password"]').value = null
      // 停止计时器
      clearInterval(timer)
      timer = null
      msg[2].innerHTML = ''
    }
  }, 100)
}
const register_form = document.querySelector('.register-form')
register_form.addEventListener('submit', function (e) {
  e.preventDefault()
  register()
})
function register() {
  const username = document.querySelector('.register-form [name="username"]').value
  const password = document.querySelector('.register-form [name="password"]').value
  const password2 = document.querySelector('.register-form [name="confirm-password"]').value
  const msg = document.querySelectorAll('.register-msg')
  const username_reg = /^.{1,16}$/
  const password_reg = /^[a-zA-Z0-9]{6,16}$/
  const agree = document.querySelector('.agree [type="checkbox"]')
  let flag = true
  if (!username_reg.test(username)) {
    msg[0].innerHTML = '用户名必须为1到16位字符'
    flag = false
  } else {
    msg[0].innerHTML = ''
    flag = true
  }
  if (!password_reg.test(password)) {
    msg[1].innerHTML = '密码必须为6到16位数字或字母'
    flag = false
  } else {
    msg[1].innerHTML = ''
    flag = true
  }
  if (password !== password2) {
    msg[2].innerHTML = '两次密码输入不一致，请重新输入'
    flag = false
  } else {
    msg[2].innerHTML = ''
    flag = true
  }
  if (!agree.checked) {
    msg[3].innerHTML = '请同意协议'
    msg[3].textAlign = 'center'
    flag = false
  } else {
    msg[3].innerHTML = ''
    flag = true
  }
  if (flag) {
    // 发送请求
    flag = false
    myAjax({
      type: 'POST',
      url: '/user/register',
      data: {
        username,
        password
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      callback: function (responseText) {
        responseText = JSON.parse(responseText)
        if (responseText.code == 500) {
          const msg = register_form.querySelectorAll('.register-msg')
          msg[2].className = 'register-msg wrong'
          msg[2].innerHTML = responseText.msg
        }
        if (responseText.code == 200) {
          success_register()
        }
      },
      error: function () {
        console.log("Ruquest Failed")
      }
    })
    flag = true
  }
}

// 判断登录状态看是否能登录账户或者退出
let signout = null
if (localStorage.getItem('token') != undefined) {
  myAjax({
    type: 'GET',
    url: '/user/isLogin',
    headers: {
      'token': localStorage.getItem('token')
    },
    callback: function (responseText) {
      responseText = JSON.parse(responseText)
      if (responseText.data == true) {
        flag = false
        signout = true
      } else {
        flag = true
        signout = false
      }
      // console.log(signout);
    }
  })
} else {
  flag = true
  signout = false
}
// 登录信息
const login_form = document.querySelector('.login-form')
const tokenBtn = document.querySelector('#token')
function login() {
  const username = login_form.querySelector('[name="username"]').value
  const password = login_form.querySelector('[name="password"]').value
  if (flag == true) {
    flag = false
    myAjax({
      type: 'POST',
      url: '/user/login',
      data: {
        username,
        password
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      callback: function (responseText) {
        responseText = JSON.parse(responseText)
        // console.log(`登录：${responseText}`);
        if (responseText.code == 200) {
          if (tokenBtn.checked) {
            localStorage.setItem('token', responseText.data)
            let lastTime = +new Date() + 7 * 24 * 60 * 60 * 1000
            localStorage.setItem('lastTime', `${lastTime}`)
            // console.log('七天免登录')
          }
          else {
            localStorage.setItem('token', responseText.data)
            let lastTime = +new Date() + 1 * 24 * 60 * 60 * 1000
            localStorage.setItem('lastTime', `${lastTime}`)
            // console.log('普通')
          }
          success_login()
        }
        else {
          const msg = login_form.querySelector('.login-msg')
          msg.className = 'login-msg wrong'
          msg.innerHTML = responseText.msg
        }
      },
      error: function () {
        console.log("Ruquest Failed")
      }
    })
  }

}
function success_login() {
  const msg = login_form.querySelector('.login-msg')
  msg.classList.remove('wrong')
  msg.classList.add('success')
  msg.innerHTML = '登录成功'
  setTimeout(function () {
    login_wrapper.style.display = 'none'
    msg.innerHTML = ''
    login_form.querySelector('[name="username"]').value = null
    login_form.querySelector('[name="password"]').value = null
    location.reload(true)
  }, 1000)
}

login_form.addEventListener('submit', function (e) {
  e.preventDefault()
  login()
})

// 检查登录是否失效
// 勾选七天免登录，没有勾选则只能一天之内免登录
function checkLogin() {
  let lastTime = localStorage.getItem('lastTime')
  if (lastTime != undefined) {
    lastTime = +lastTime
    let nowTime = +new Date()
    if (nowTime >= lastTime) {
      logout()
      alert('登录已过期，请重新登录')
    }
  }
  // else {
  // 判断token值是否有效
  //   myAjax({
  //     type:'POST',

  //   })
  // }
}
checkLogin()
setInterval(checkLogin, 1000)


// 退出登录
const exitBtn = document.querySelector('.logout')
exitBtn.addEventListener('click', logout)
function logout() {
  if (signout) {
    myAjax({
      url: '/user/logout',
      type: 'POST',
      headers: {
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=UTF-8'
      },
      callback: function (responseText) {
        localStorage.removeItem('token')
        localStorage.removeItem('lastTime')
        localStorage.removeItem('userId')
        location.reload(true)
      },
      error: function () {
        console.log("Ruquest Failed")
      }
    })
  }
}

// user用户中心界面
// 资料展开
const userfile = document.querySelector('.account-bottom ul')
const foldBtn = document.querySelector('.unfold')
let num = 0
foldBtn.addEventListener('click', function () {
  num++
  if (num % 2 == 0) {
    userfile.style.height = '30px'
  }
  else {
    userfile.style.height = '100px'
  }
})

// 点击编辑资料跳转到编辑页面
const editBtn = document.querySelector('.operation-edit')
editBtn.addEventListener('click', function () {
  forgetModule.style.display = 'none'
  userModule.style.display = 'none'
  editModule.style.display = 'none'
  indexModule.style.display = 'none'
  editModule.style.display = 'block'
})
