
// 编辑资料模块
const uploadBtn = document.querySelector('.next-btn')
const editFile = document.querySelector('.edit-account-wrapper')
let file_avatar = document.querySelector('#file-avatar')
// 修改头像
file_avatar.addEventListener('change', function (event) {
  const files = event.target.files; // 获取文件列表
  let formData = new FormData()
  let file = files[0]
  formData.append('file', file)
  myAjax({
    type: 'POST',
    url: '/file/uploadImg',
    headers: {
      'token': localStorage.getItem('token')
    },
    data: formData,
    callback: function (responseText) {
      responseText = JSON.parse(responseText)
      // 修改信息
      myAjax({
        type: 'POST',
        url: '/user/modify/userInfo',
        headers: {
          'token': localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
          username: myName,
          avatar: responseText.data,
          intro: null
        },
        callback: function (responseText) {
          // console.log(`上传文件${responseText}`)
          renderMyInfo()
        },
        error: function () {
          console.log('error')
        }
      })
    },
    error: function () {
      console.log('上传文件就error啦')
    }
  })
})