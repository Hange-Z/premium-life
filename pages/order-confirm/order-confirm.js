// 订单确认页面逻辑
Page({
  data: {
    items: [],
    address: {
      name: '张三',
      phone: '138****8888',
      address: '北京市朝阳区xxx街道xxx号',
      isDefault: true
    },
    totalPrice: 0,
    totalCount: 0,
    remark: ''
  },

  onLoad(options) {
    if (options.items) {
      const items = JSON.parse(decodeURIComponent(options.items))
      this.setData({ items })
      this.calculateTotal()
    }
    this.loadAddress()
  },

  // 加载收货地址
  loadAddress() {
    const address = wx.getStorageSync('defaultAddress') || this.data.address
    this.setData({ address })
  },

  // 计算总价
  calculateTotal() {
    const totalPrice = this.data.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0)
    const totalCount = this.data.items.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      totalCount
    })
  },

  // 选择地址
  selectAddress() {
    wx.navigateTo({
      url: '/pages/address/address?select=true'
    })
  },

  // 输入备注
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 提交订单
  submitOrder() {
    const { items, address, totalPrice, remark } = this.data
    
    if (!address.name) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '提交中...'
    })

    // 生成订单
    const order = {
      id: 'ORD' + Date.now(),
      status: 'unpaid',
      items: items,
      address: address,
      totalPrice: parseFloat(totalPrice),
      remark: remark,
      createTime: this.formatTime(new Date())
    }

    // 保存订单
    const orders = wx.getStorageSync('orders') || []
    orders.unshift(order)
    wx.setStorageSync('orders', orders)

    // 清空购物车中已购买的商品
    const app = getApp()
    const cartItems = app.globalData.cartItems || []
    const remainingItems = cartItems.filter(cartItem => {
      return !items.some(item => 
        item.id === cartItem.id && item.spec === cartItem.spec
      )
    })
    app.globalData.cartItems = remainingItems
    wx.setStorageSync('cartItems', remainingItems)

    setTimeout(() => {
      wx.hideLoading()
      wx.redirectTo({
        url: `/pages/order-detail/order-detail?id=${order.id}`
      })
    }, 1500)
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})





