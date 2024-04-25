// 忘记密码背景全铺满
forgetModule.style.minWidth = nav.offsetWidth + 'px'

// 忘记密码模块
const forgetForm = document.querySelector('.forget-form')
const forgetA = document.querySelector('.forget')
const forgetBtn = forgetForm.querySelector('button')
const forgetUnameInput = forgetForm.querySelector('[name="username"]')
const forgetPsdInput = forgetForm.querySelector('[name="password"]')
// 登录框跳转到忘记密码模块
forgetA.addEventListener('click', function () {
  forgetModule.style.display = 'block'
  userModule.style.display = 'none'
  indexModule.style.display = 'none'
  login_wrapper.style.display = 'none'
  creationModule.style.display = 'none'
})
// 阻止默认行为
forgetBtn.addEventListener('click', function (e) {
  e.preventDefault()
})
let flagII = true
function forgetpsd() {
  function findpsd() {
    if (flagII) {
      flagII = false
      myAjax({
        type: 'POST',
        url: '/user/forgetPassword',
        data: {
          username: forgetUnameInput.value,
          password: forgetPsdInput.value
        },
        callback: function (responseText) {
          responseText = JSON.parse(responseText)
          // console.log(`忘记密码${responseText}`)
          const msg = document.querySelector('.forget-msg')
          msg.innerHTML = responseText.msg
          if (responseText.code >= 200 && responseText.code < 300) {
            msg.className = 'forget-msg success'
            setTimeout(function () {
              indexModule.style.display = 'block'
              login_wrapper.style.display = 'block'
              forgetModule.style.display = 'none'
              msg.innerHTML = ''
              forgetUnameInput.value = ''
              forgetPsdInput.value = ''
              flagII = true
            }, 1000)
          }
          else {
            msg.className = 'forget-msg wrong'
            flagII = true
          }
        },
        error: function () {
          console.log("Ruquest Failed")
          flagII = true
        }
      })
    }
  }
  let username = forgetUnameInput.value
  let password = forgetPsdInput.value
  if (username && password) {
    forgetBtn.style.backgroundColor = 'var(--orange-color)'
    forgetBtn.style.color = 'var(--white-color)'
    forgetBtn.style.cursor = 'pointer'
    if (flagI) {
      forgetBtn.addEventListener('click', findpsd)
      flagI = false
    }
  }
  else {
    forgetBtn.style.backgroundColor = ' var(--gray-color3)'
    forgetBtn.style.color = 'var(--gray-text))'
    forgetBtn.style.cursor = 'default'
    if (!flagI) {
      forgetBtn.removeEventListener('click', findpsd)
      flagI = true
    }
  }
}
let flagI = true
forgetUnameInput.addEventListener('input', forgetpsd)
forgetPsdInput.addEventListener('input', forgetpsd)
// 返回
const returnBtn = document.querySelector('.return')
returnBtn.addEventListener('click', function () {
  indexModule.style.display = 'block'
  forgetModule.style.display = 'none'
  forgetPsdInput.value = ''
  forgetUnameInput.value = ''
  login_wrapper.style.display = 'none'
})