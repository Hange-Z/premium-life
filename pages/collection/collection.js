// 收藏页面逻辑
Page({
  data: {
    collections: [
      {
        id: 1,
        title: '头水夹心海苔 18g*10袋 脆脆海苔片',
        price: 52.8,
        image: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=海苔',
        spec: '12罐礼盒装',
        quantity: 1,
        selected: false
      },
      {
        id: 2,
        title: '新鲜黄桃罐头 425g*6罐 水果罐头',
        price: 42.8,
        image: 'https://via.placeholder.com/300x300/ff9f43/ffffff?text=黄桃',
        spec: '5罐普通装',
        quantity: 2,
        selected: false
      },
      {
        id: 3,
        title: '有机草莓 500g 新鲜水果',
        price: 68.0,
        image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=草莓',
        spec: '500g装',
        quantity: 1,
        selected: false
      }
    ],
    selectedCount: 0,
    totalItems: 0,
    totalValue: 0
  },

  onLoad() {
    this.loadCollections()
  },

  onShow() {
    // 每次显示页面时重新加载数据
    this.loadCollections()
  },
  
  // 加载收藏数据
  loadCollections() {
    let collections = wx.getStorageSync('collections') || this.data.collections
    this.setData({ collections })
    this.calculateStats()
  },
  
  // 保存收藏数据
  saveCollections() {
    wx.setStorageSync('collections', this.data.collections)
  },

  // 计算统计数据
  calculateStats() {
    const collections = this.data.collections
    const totalItems = collections.length
    const totalValue = collections.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    this.setData({
      totalItems,
      totalValue: totalValue.toFixed(1)
    })
  },

  // 切换选择状态
  toggleSelect(e) {
    const id = e.currentTarget.dataset.id
    const collections = this.data.collections
    const item = collections.find(item => item.id === id)
    
    if (item) {
      item.selected = !item.selected
      const selectedCount = collections.filter(item => item.selected).length
      
      this.setData({
        collections,
        selectedCount
      })
      this.saveCollections()
    }
  },

  // 全选
  selectAll() {
    const collections = this.data.collections
    const allSelected = collections.every(item => item.selected)
    
    collections.forEach(item => {
      item.selected = !allSelected
    })
    
    this.setData({
      collections,
      selectedCount: allSelected ? 0 : collections.length
    })
    this.saveCollections()
  },

  // 删除选中项
  deleteSelected() {
    const selectedItems = this.data.collections.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请先选择要删除的商品',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedItems.length} 件商品吗？`,
      success: (res) => {
        if (res.confirm) {
          const collections = this.data.collections.filter(item => !item.selected)
          this.setData({
            collections,
            selectedCount: 0
          })
          this.saveCollections()
          this.calculateStats()
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 添加到购物车
  addToCart(e) {
    const item = e.currentTarget.dataset.item
    const app = getApp()
    app.addToCart(item, item.quantity)
  },

  // 从收藏中移除
  removeFromCollection(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认移除',
      content: '确定要从收藏中移除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          const collections = this.data.collections.filter(item => item.id !== id)
          this.setData({ collections })
          this.saveCollections()
          this.calculateStats()
          
          wx.showToast({
            title: '移除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 将选中商品加入购物车
  addSelectedToCart() {
    const selectedItems = this.data.collections.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      })
      return
    }

    const app = getApp()
    selectedItems.forEach(item => {
      app.addToCart(item, item.quantity)
    })

    wx.showToast({
      title: `已添加 ${selectedItems.length} 件商品到购物车`,
      icon: 'success'
    })
  },

  // 购买选中商品
  buySelected() {
    const selectedItems = this.data.collections.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      })
      return
    }

    wx.showToast({
      title: '正在跳转支付...',
      icon: 'loading',
      duration: 2000
    })

    setTimeout(() => {
      wx.showToast({
        title: '购买成功！',
        icon: 'success'
      })
    }, 2000)
  },

  // 跳转到分类页面
  goToCategory() {
    wx.switchTab({
      url: '/pages/category/category'
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '我的收藏清单',
      path: '/pages/collection/collection'
    }
  }
})
