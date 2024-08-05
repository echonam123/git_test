// 滚动轴滑到240变样式
const nav = document.querySelector('nav')
const logo = document.querySelector('.logo')
window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop >= 240) {
    nav.className = 'fixed'
    logo.style.backgroundColor = 'transparent'
  }
  else {
    nav.className = 'nav-bar'
    logo.style.backgroundColor = 'var(--primary-color)'
  }
})


// 出场动画
let clock
const loadingFlash = document.querySelector('.flash')
const load = document.querySelector('.rectangle')
loadingFlash.style.top = document.documentElement.scrollTop + 'px'
// 页面资源加载完则动画结束,停止计时器
window.addEventListener('load', function () {
  this.clearInterval(clock)
  load.style.animationPlayState = 'paused'
  loadingFlash.style.opacity = '0'
  loadingFlash.style.display = 'none'
  document.documentElement.style.overflowY = 'auto'
})
// 动画加载
function animationLoading() {
  setTimeout(function () {
    load.style.animation = 'rotateX .8s ease-in-out'
    setTimeout(function () {
      load.style.animation = 'rotateY .8s ease-in-out'
    }, 800)
  }, 0)
}
animationLoading()
clock = setInterval(animationLoading, 1600)

// 搜索框点击事件
const searchBtn = document.querySelector('.search i')
const search = document.querySelector('.search .dropdown-search')
let i = 0
searchBtn.addEventListener('click', function () {
  i++
  if (i % 2 !== 0) {
    search.style.display = 'block'
  }
  else {
    search.style.display = 'none'
  }
})

// 放大到150%时点击bar出现左边的menu
const menuDiv = document.querySelectorAll('.sideBar-title + div')
const menuTitle = document.querySelectorAll('.sideBar-title')
const menuTitleLogo = document.querySelectorAll('.sideBar-title i')

const menuHeading = document.querySelectorAll('.sideBar-heading')
const menuHeadingLogo = document.querySelectorAll('.sideBar-heading i')
const sideBar = document.querySelector('.sidebar')
const bar = document.querySelector('.bar')
const menuHome = document.querySelector('.home-title')
const overlay = document.querySelector('.overlay')
let count = 0
bar.addEventListener('click', function () {
  sideBar.style.transform = 'translateX(0)'
  document.documentElement.style.overflow = 'hidden'
  overlay.style.display = 'block'
})
menuHome.addEventListener('click', function () {
  sideBar.style.transform = 'translateX(-500px)'
  document.documentElement.style.overflow = 'auto'
  overlay.style.display = 'none'
})
overlay.addEventListener('click', function () {
  overlay.style.display = 'none'
  sideBar.style.transform = 'translateX(-500px)'
  document.documentElement.style.overflow = 'auto'
})
let num = []
for (let i = 0; i < menuTitle.length; i++) {
  num.push(0)
}
for (let i = 0; i < menuTitle.length; i++) {
  menuTitle[i].addEventListener('click', function () {
    num[i]++
    if (num[i] % 2 == 0) {
      menuTitleLogo[i - 1].className = 'fa-solid fa-plus'
      menuDiv[i - 1].style.display = 'none'
      menuTitle[i].style.color = 'var(--black-color)'
    }
    else {
      menuTitleLogo[i - 1].className = 'fa-solid fa-minus'
      menuDiv[i - 1].style.display = 'block'
      menuTitle[i].style.color = 'var(--red-color)'
    }
  })
}
let number = []
for (let i = 0; i < menuHeading.length; i++) {
  number.push(0)
}
for (let i = 0; i < menuHeading.length; i++) {
  menuHeading[i].addEventListener('click', function () {
    number[i]++
    if (number[i] % 2 == 0) {
      menuHeadingLogo[i].className = 'fa-solid fa-plus'
      menuHeading[i].style.color = 'var(--secondary-color)'
      menuHeading[i].nextElementSibling.className = 'sideBar-content hid'
    }
    else {
      menuHeadingLogo[i].className = 'fa-solid fa-minus'
      menuHeading[i].style.color = 'var(--red-color)'
      menuHeading[i].nextElementSibling.className = 'sideBar-content'
    }
  })
}

// 导航栏的产品下拉实现
const productMenu = document.querySelectorAll('.products-menu li')
const productItem = document.querySelectorAll('.product-item')
for (let i = 0; i < productMenu.length; i++) {
  productMenu[i].addEventListener('mouseenter', function () {
    for (let j = 0; j < productItem.length; j++) {
      productItem[j].className = 'product-item'
    }
    productItem[i].classList.add('active')
  })
}


// 向上划按钮
const upBtn = document.querySelector('.up-btn')
let befortop = 0
window.addEventListener('scroll', function () {
  let aftertop = document.documentElement.scrollTop
  if (aftertop - befortop > 0) {
    // cone.log('往下滑')
    upBtn.style.transform = 'translateY(150px)'
  }
  else {
    // console.log('往上滑')
    upBtn.style.transform = 'translateY(0)'
  }
  befortop = aftertop;
})
function toTop() {
  window.document.documentElement.scrollTop = 0
}
upBtn.addEventListener('click', toTop)

// 轮播图制作
let nowIndex = 0
let nowIndex2 = 0
let timer
const img = document.querySelectorAll('.swiperItem')
const img2 = document.querySelectorAll('.showItem')
const imgBox = document.querySelector('.main')
swiperPlay()
//鼠标移入停止自动播放，移出则继续
imgBox.addEventListener('mouseenter', function () {
  clearInterval(timer)
})
imgBox.addEventListener('mouseleave', function () {
  swiperPlay()
})
// 点击左右按钮
const leftBtn = document.querySelector('.btn1-left')
const rightBtn = document.querySelector('.btn1-right')
const leftBtn2 = document.querySelector('.btn2-left')
const rightBtn2 = document.querySelector('.btn2-right')
leftBtn.addEventListener('click', function () {
  img[nowIndex].className = 'swiperItem def'
  nowIndex--
  if (nowIndex < 0) {
    nowIndex = img.length - 1
  }
  img[nowIndex].className = 'swiperItem nowplay'
  swiperPoints()
})
rightBtn.addEventListener('click', function () {
  img[nowIndex].className = 'swiperItem def'
  nowIndex++
  if (nowIndex > img.length - 1) {
    nowIndex = 0
  }
  img[nowIndex].className = 'swiperItem nowplay'
  swiperPoints()
})
leftBtn2.addEventListener('click', function () {
  img2[nowIndex2].className = 'showItem def'
  nowIndex2--
  if (nowIndex2 < 0) {
    nowIndex2 = img2.length - 1
  }
  img2[nowIndex2].className = 'showItem nowplay'
  swiper2Points()
})
rightBtn2.addEventListener('click', function () {
  img2[nowIndex2].className = 'showItem def'
  nowIndex2++
  if (nowIndex2 > img2.length - 1) {
    nowIndex2 = 0
  }
  img2[nowIndex2].className = 'showItem nowplay'
  swiper2Points()
})
// 点击小圆点
const btn = document.querySelectorAll('.btn1')
const btn2 = document.querySelectorAll('.btn2')
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function () {
    img[nowIndex].className = 'swiperItem def'
    nowIndex = i
    img[nowIndex].className = 'swiperItem nowplay'
    swiperPoints()
  })
}
for (let i = 0; i < btn2.length; i++) {
  btn2[i].addEventListener('click', function () {
    img2[nowIndex2].className = 'showItem def'
    nowIndex2 = i
    img2[nowIndex2].className = 'showItem nowplay'
    swiper2Points()
  })
}

// 轮播函数
function swiperPlay() {
  // 2.5s自动播一次
  timer = setInterval(function () {
    img[nowIndex].className = 'swiperItem def'
    nowIndex++
    if (nowIndex == img.length) {
      nowIndex = 0
    }
    img[nowIndex].className = 'swiperItem nowplay'
    swiperPoints()
  }, 2500)

}
function swiperPoints() {
  for (let i = 0; i < btn.length; i++) {
    btn[i].className = 'btn1'
  }
  btn[nowIndex].className = 'btn1 current'
}

function swiper2Points() {
  for (let i = 0; i < btn2.length; i++) {
    btn2[i].className = 'btn2'
  }
  btn2[nowIndex2].className = 'btn2 current'
}



// 视频展示
const closeBtn = document.querySelector('.close-btn')
const videoShow = document.querySelector('.video-show')
const playBtn = document.querySelector('.controls')
const video = document.querySelector('.wrapper video')
video.pause()
playBtn.addEventListener('click', function () {
  videoShow.style.top = window.document.documentElement.scrollTop + 'px'
  videoShow.style.display = 'block'
  document.documentElement.style.overflowY = 'hidden'
  video.currentTime = 0
  video.play()
})
closeBtn.addEventListener('click', function () {
  videoShow.style.display = 'none'
  document.documentElement.style.overflowY = 'auto'
  video.pause()
})