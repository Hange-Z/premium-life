// 图片分享页面逻辑
Page({
  data: {
    galleryImages: [
      {
        url: 'https://via.placeholder.com/800x600/ff6b35/ffffff?text=商品图片1',
        title: '精美商品展示',
        description: '这是一张精美的商品展示图片，展现了商品的独特魅力。',
        uploadTime: '2024-01-15',
        viewCount: 128
      },
      {
        url: 'https://via.placeholder.com/800x600/ff9f43/ffffff?text=商品图片2',
        title: '产品细节图',
        description: '产品细节展示，让您更清楚地了解产品特点。',
        uploadTime: '2024-01-14',
        viewCount: 95
      },
      {
        url: 'https://via.placeholder.com/800x600/e74c3c/ffffff?text=商品图片3',
        title: '使用场景图',
        description: '产品在实际使用场景中的效果展示。',
        uploadTime: '2024-01-13',
        viewCount: 156
      }
    ],
    currentImage: {},
    relatedImages: [
      {
        id: 1,
        url: 'https://via.placeholder.com/200x150/3498db/ffffff?text=相关1',
        title: '相关商品1',
        index: 0
      },
      {
        id: 2,
        url: 'https://via.placeholder.com/200x150/9b59b6/ffffff?text=相关2',
        title: '相关商品2',
        index: 1
      },
      {
        id: 3,
        url: 'https://via.placeholder.com/200x150/1abc9c/ffffff?text=相关3',
        title: '相关商品3',
        index: 2
      }
    ],
    isLiked: false,
    isCollected: false
  },

  onLoad(options) {
    // 设置当前图片信息
    this.setData({
      currentImage: this.data.galleryImages[0]
    })
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url
    const urls = this.data.galleryImages.map(img => img.url)
    
    wx.previewImage({
      current: url,
      urls: urls
    })
  },

  // 点赞图片
  likeImage() {
    this.setData({
      isLiked: !this.data.isLiked
    })
    
    wx.showToast({
      title: this.data.isLiked ? '已点赞' : '取消点赞',
      icon: 'success'
    })
  },

  // 收藏图片
  collectImage() {
    this.setData({
      isCollected: !this.data.isCollected
    })
    
    wx.showToast({
      title: this.data.isCollected ? '已收藏' : '取消收藏',
      icon: 'success'
    })
  },

  // 下载图片
  downloadImage() {
    wx.showLoading({
      title: '下载中...'
    })

    // 模拟下载过程
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '下载成功',
        icon: 'success'
      })
    }, 2000)
  },

  // 切换到相关图片
  switchToImage(e) {
    const index = e.currentTarget.dataset.index
    const image = this.data.galleryImages[index]
    
    this.setData({
      currentImage: image
    })
  },

  // 分享图片
  shareGallery() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: this.data.currentImage.title,
      path: '/pages/photo-gallery/photo-gallery',
      imageUrl: this.data.currentImage.url
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.data.currentImage.title,
      imageUrl: this.data.currentImage.url
    }
  }
})
