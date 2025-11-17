// app.js
App({
  globalData: {
    userInfo: null,
    cartItems: [],
    selectedCategory: 0
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功:', res.code)
      }
    })
  },

  onShow() {
    console.log('App Show')
  },

  onHide() {
    console.log('App Hide')
  },

  // 全局方法：添加到购物车
  addToCart(product, quantity = 1, spec = null) {
    // 从本地存储加载购物车数据
    let cartItems = wx.getStorageSync('cartItems') || this.globalData.cartItems || []
    
    const specName = spec ? (spec.name || spec) : (product.specs && product.specs[0] ? product.specs[0].name : '默认规格')
    const specPrice = spec ? (spec.price || spec) : product.price
    
    const existingItem = cartItems.find(item => 
      item.id === product.id && 
      item.spec === specName
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.push({
        id: product.id,
        title: product.title,
        price: specPrice,
        image: product.image,
        quantity: quantity,
        spec: specName,
        selected: true
      })
    }

    // 保存到本地存储和全局数据
    this.globalData.cartItems = cartItems
    wx.setStorageSync('cartItems', cartItems)
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
  },

  // 获取购物车商品数量
  getCartCount() {
    return this.globalData.cartItems.reduce((total, item) => total + item.quantity, 0)
  }
})
