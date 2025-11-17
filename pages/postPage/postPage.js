// 发布动态页面逻辑
Page({
  data: {
    postContent: '',
    images: [],
    selectedProduct: null,
    tags: [
      { id: 1, name: '美食', selected: false },
      { id: 2, name: '购物', selected: false },
      { id: 3, name: '生活', selected: false },
      { id: 4, name: '推荐', selected: false },
      { id: 5, name: '新品', selected: false },
      { id: 6, name: '优惠', selected: false }
    ]
  },

  onLoad() {
    console.log('发布动态页面加载')
  },

  // 文本输入
  onTextInput(e) {
    this.setData({
      postContent: e.detail.value
    })
  },

  // 选择图片
  chooseImage() {
    const that = this
    wx.chooseImage({
      count: 9 - that.data.images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          images: [...that.data.images, ...tempFilePaths]
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images
    images.splice(index, 1)
    this.setData({ images })
  },

  // 选择商品
  selectProduct() {
    wx.navigateTo({
      url: '/pages/category/category?selectMode=true'
    })
  },

  // 移除商品
  removeProduct() {
    this.setData({
      selectedProduct: null
    })
  },

  // 切换标签
  toggleTag(e) {
    const id = e.currentTarget.dataset.id
    const tags = this.data.tags
    const tag = tags.find(t => t.id === id)
    if (tag) {
      tag.selected = !tag.selected
      this.setData({ tags })
    }
  },

  // 发布动态
  publishPost() {
    const { postContent, images, selectedProduct, tags } = this.data
    
    if (!postContent.trim()) {
      wx.showToast({
        title: '请输入动态内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '发布中...'
    })

    // 模拟发布过程
    setTimeout(() => {
      // 保存到本地存储
      const newPost = {
        id: Date.now(),
        username: '我',
        avatar: 'https://via.placeholder.com/60x60/ff6b35/ffffff?text=我',
        content: postContent,
        images: images,
        time: '刚刚',
        createTime: new Date().toISOString(),
        likes: 0,
        liked: false,
        comments: 0,
        commentsList: [],
        tags: tags.filter(t => t.selected).map(t => t.name)
      }
      
      let posts = wx.getStorageSync('communityPosts') || []
      posts.unshift(newPost)
      wx.setStorageSync('communityPosts', posts)
      
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })

      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 2000)
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})
