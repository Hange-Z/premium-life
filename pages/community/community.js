// 社区页面逻辑
Page({
  data: {
    posts: [
      {
        id: 1,
        username: '购物达人',
        avatar: 'https://via.placeholder.com/60x60/ff6b35/ffffff?text=用户',
        content: '今天买的海苔真的太好吃了！脆脆的口感，夹心也很丰富，强烈推荐给大家！',
        images: [],
        time: '2小时前',
        likes: 12,
        liked: false,
        comments: 5,
        commentsList: []
      },
      {
        id: 2,
        username: '美食爱好者',
        avatar: 'https://via.placeholder.com/60x60/ff9f43/ffffff?text=用户',
        content: '黄桃罐头很新鲜，甜度刚刚好，包装也很精美，送礼自用都很合适。',
        images: ['https://via.placeholder.com/400x300/ff9f43/ffffff?text=黄桃'],
        time: '4小时前',
        likes: 8,
        liked: false,
        comments: 3,
        commentsList: []
      },
      {
        id: 3,
        username: '健康生活',
        avatar: 'https://via.placeholder.com/60x60/e74c3c/ffffff?text=用户',
        content: '有机草莓真的很新鲜，酸甜可口，营养价值也很高，每天吃一点对身体很好。',
        images: ['https://via.placeholder.com/400x300/e74c3c/ffffff?text=草莓'],
        time: '6小时前',
        likes: 15,
        liked: true,
        comments: 7,
        commentsList: []
      }
    ]
  },

  onLoad() {
    // 获取系统信息，适配安全区域
    const systemInfo = wx.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const screenWidth = systemInfo.windowWidth || 375
    const rpxRatio = 750 / screenWidth
    const statusBarHeightRpx = statusBarHeight * rpxRatio
    const safeAreaTop = systemInfo.safeArea ? ((systemInfo.safeArea.top - statusBarHeight) * rpxRatio) : 0
    const headerPaddingTop = statusBarHeightRpx + safeAreaTop + 40 // 40rpx基础padding
    
    this.setData({
      headerPaddingTop: headerPaddingTop
    })
    
    this.loadPosts()
  },
  
  onShow() {
    // 每次显示时重新加载，以便显示新发布的动态
    this.loadPosts()
  },
  
  // 加载动态列表
  loadPosts() {
    let posts = wx.getStorageSync('communityPosts') || this.data.posts
    // 按时间倒序排列
    posts.sort((a, b) => {
      return new Date(b.createTime || 0) - new Date(a.createTime || 0)
    })
    this.setData({ posts })
  },

  // 跳转到发布动态页面
  goToPosts() {
    wx.navigateTo({
      url: '/pages/postPage/postPage'
    })
  },

  // 跳转到图片分享页面
  goToGallery() {
    wx.navigateTo({
      url: '/pages/photo-gallery/photo-gallery'
    })
  },

  // 跳转到收藏页面
  goToCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },

  // 点赞功能
  likePost(e) {
    const postId = e.currentTarget.dataset.id
    const posts = this.data.posts
    const post = posts.find(p => p.id === postId)
    
    if (post) {
      if (post.liked) {
        post.likes -= 1
        post.liked = false
        wx.showToast({
          title: '已取消点赞',
          icon: 'none'
        })
      } else {
        post.likes += 1
        post.liked = true
        wx.showToast({
          title: '点赞成功',
          icon: 'success'
        })
      }
      this.setData({ posts })
      wx.setStorageSync('communityPosts', posts)
    }
  },

  // 评论功能
  commentPost(e) {
    const postId = e.currentTarget.dataset.id
    wx.showModal({
      title: '评论',
      content: '请输入您的评论',
      editable: true,
      placeholderText: '说点什么...',
      success: (res) => {
        if (res.confirm && res.content) {
          const posts = this.data.posts
          const post = posts.find(p => p.id === postId)
          
          if (post) {
            if (!post.commentsList) {
              post.commentsList = []
            }
            post.commentsList.push({
              id: Date.now(),
              username: '我',
              content: res.content,
              time: '刚刚'
            })
            post.comments += 1
            this.setData({ posts })
            wx.setStorageSync('communityPosts', posts)
            
            wx.showToast({
              title: '评论成功',
              icon: 'success'
            })
          }
        }
      }
    })
  },
  
  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.url
    const urls = e.currentTarget.dataset.urls || [current]
    wx.previewImage({
      current: current,
      urls: urls
    })
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '发现好物，分享生活',
      path: '/pages/community/community'
    }
  }
})
