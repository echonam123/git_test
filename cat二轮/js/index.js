// 关闭广告
const adCloseBtn = document.querySelector('.ad-close')
const ad = document.querySelector('.ad')
adCloseBtn.addEventListener('click', function () {
  ad.style.visibility = 'hidden'
})

// submenu下拉效果
const filter = document.querySelector('.filter')
const subMenu = document.querySelector('.submenu')
const subMenu_down = document.querySelector('.submenu-down i')

subMenu.addEventListener('mouseenter', function () {
  filter.style.height = '140px'
  subMenu_down.classList.remove('fa-chevron-down')
  subMenu_down.classList.add('fa-chevron-up')
})

subMenu.addEventListener('mouseleave', function () {
  filter.style.height = '60px'
  subMenu_down.classList.remove('fa-chevron-up')
  subMenu_down.classList.add('fa-chevron-down')
})


// 定义轮播函数
function swiper(index, leftBtn, rightBtn, page, showName, hidName) {
  // 判断按钮颜色函数
  function btnColor() {
    if (index == 0) {
      leftBtn.style.color = 'var(--gray-color)'
      rightBtn.style.color = 'var(--black-color)'
    }
    else if (index == page.length - 1) {
      leftBtn.style.color = 'var(--black-color)'
      rightBtn.style.color = 'var(--gray-color)'
    }
    else {
      leftBtn.style.color = 'var(--black-color)'
      rightBtn.style.color = 'var(--black-color)'
    }
  }
  btnColor()
  leftBtn.addEventListener('click', function () {
    if (index == 0) { }
    else {
      index--
      btnColor()
      for (let i = 0; i < page.length; i++) {
        page[i].className = hidName
      }
      page[index].className = showName
    }
  })
  rightBtn.addEventListener('click', function () {
    if (index == page.length - 1) { }
    else {
      index++
      btnColor()
      for (let i = 0; i < page.length; i++) {
        page[i].className = hidName
      }
      page[index].className = showName
    }
  })
}
// 实现头条文章轮播效果
const newsLeft = document.querySelector('.news-swiper-btn .left')
const newsRight = document.querySelector('.news-swiper-btn .right')
const newsPage = document.querySelectorAll('.news-swiper>li')
let newsIndex = 0
swiper(newsIndex, newsLeft, newsRight, newsPage, 'news-page-show', 'news-page-hid')


// 实现热点文章轮播效果
const hotsLeft = document.querySelector('.hots-swiper-btn .left')
const hotsRight = document.querySelector('.hots-swiper-btn .right')
const hotsPage = document.querySelectorAll('.hots-swiper>li')
let hotsIndex = 0
swiper(hotsIndex, hotsLeft, hotsRight, hotsPage, 'hots-page-show', 'hots-page-hid')