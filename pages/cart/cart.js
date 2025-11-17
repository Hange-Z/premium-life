// 购物车页面逻辑
Page({
  data: {
    cartItems: [],
    selectedItems: [],
    allSelected: false,
    totalPrice: 0,
    totalCount: 0
  },

  onLoad() {
    // 获取系统信息，适配安全区域
    const systemInfo = wx.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const screenWidth = systemInfo.windowWidth || 375
    const rpxRatio = 750 / screenWidth
    const statusBarHeightRpx = statusBarHeight * rpxRatio
    const safeAreaTop = systemInfo.safeArea ? ((systemInfo.safeArea.top - statusBarHeight) * rpxRatio) : 0
    const headerPaddingTop = statusBarHeightRpx + safeAreaTop + 30 // 30rpx基础padding
    
    this.setData({
      headerPaddingTop: headerPaddingTop
    })
    
    this.loadCartItems()
  },

  onShow() {
    // 每次显示页面时重新加载购物车数据
    this.loadCartItems()
  },

  // 从本地存储加载购物车数据
  loadCartItems() {
    const app = getApp()
    let cartItems = wx.getStorageSync('cartItems') || app.globalData.cartItems || []
    
    // 初始化选中状态
    cartItems = cartItems.map(item => ({
      ...item,
      selected: item.selected !== undefined ? item.selected : true
    }))
    
    this.setData({ cartItems })
    this.calculateTotal()
  },

  // 切换商品选中状态
  toggleSelect(e) {
    const id = e.currentTarget.dataset.id
    const cartItems = this.data.cartItems
    const item = cartItems.find(item => item.id === id)
    
    if (item) {
      item.selected = !item.selected
      this.setData({ cartItems })
      this.calculateTotal()
      this.saveCartItems()
    }
  },

  // 全选/取消全选
  toggleSelectAll() {
    const allSelected = !this.data.allSelected
    const cartItems = this.data.cartItems.map(item => ({
      ...item,
      selected: allSelected
    }))
    
    this.setData({
      cartItems,
      allSelected
    })
    this.calculateTotal()
    this.saveCartItems()
  },

  // 增加商品数量
  increaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const cartItems = this.data.cartItems
    const item = cartItems.find(item => item.id === id)
    
    if (item) {
      item.quantity += 1
      this.setData({ cartItems })
      this.calculateTotal()
      this.saveCartItems()
    }
  },

  // 减少商品数量
  decreaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const cartItems = this.data.cartItems
    const item = cartItems.find(item => item.id === id)
    
    if (item && item.quantity > 1) {
      item.quantity -= 1
      this.setData({ cartItems })
      this.calculateTotal()
      this.saveCartItems()
    }
  },

  // 删除商品
  deleteItem(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.cartItems.find(item => item.id === id)
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${item.title}"吗？`,
      success: (res) => {
        if (res.confirm) {
          const cartItems = this.data.cartItems.filter(item => item.id !== id)
          this.setData({ cartItems })
          this.calculateTotal()
          this.saveCartItems()
          
          // 同步到全局数据
          const app = getApp()
          app.globalData.cartItems = cartItems
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 计算总价和总数量
  calculateTotal() {
    const selectedItems = this.data.cartItems.filter(item => item.selected)
    const totalPrice = selectedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
    const totalCount = selectedItems.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)
    const allSelected = this.data.cartItems.length > 0 && 
                       this.data.cartItems.every(item => item.selected)
    
    this.setData({
      selectedItems,
      totalPrice: totalPrice.toFixed(2),
      totalCount,
      allSelected
    })
  },

  // 保存购物车数据到本地存储
  saveCartItems() {
    wx.setStorageSync('cartItems', this.data.cartItems)
    const app = getApp()
    app.globalData.cartItems = this.data.cartItems
  },

  // 结算
  checkout() {
    const selectedItems = this.data.cartItems.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择要结算的商品',
        icon: 'none'
      })
      return
    }

    // 跳转到订单确认页面
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?items=${JSON.stringify(selectedItems)}`
    })
  },

  // 继续购物
  continueShopping() {
    wx.switchTab({
      url: '/pages/category/category'
    })
  },

  // 清空购物车
  clearCart() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            cartItems: [],
            totalPrice: 0,
            totalCount: 0,
            allSelected: false
          })
          this.saveCartItems()
          
          wx.showToast({
            title: '已清空',
            icon: 'success'
          })
        }
      }
    })
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '我的购物车',
      path: '/pages/cart/cart'
    }
  }
})





