// 订单详情页面逻辑
Page({
  data: {
    order: null
  },

  onLoad(options) {
    const orderId = options.id
    this.loadOrderDetail(orderId)
  },

  // 加载订单详情
  loadOrderDetail(orderId) {
    const orders = wx.getStorageSync('orders') || []
    const order = orders.find(o => o.id === orderId)
    
    if (order) {
      // 设置状态文本
      const statusTextMap = {
        'unpaid': '待付款',
        'unshipped': '待发货',
        'unconfirmed': '待收货',
        'completed': '已完成',
        'cancelled': '已取消'
      }
      order.statusText = statusTextMap[order.status] || order.status
      
      this.setData({ order })
    } else {
      wx.showToast({
        title: '订单不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 支付订单
  payOrder() {
    wx.showLoading({
      title: '支付中...'
    })
    
    setTimeout(() => {
      const orders = wx.getStorageSync('orders') || []
      const orderIndex = orders.findIndex(o => o.id === this.data.order.id)
      
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'unshipped'
        orders[orderIndex].statusText = '待发货'
        wx.setStorageSync('orders', orders)
        
        this.setData({
          order: orders[orderIndex]
        })
      }
      
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      })
    }, 2000)
  },

  // 取消订单
  cancelOrder() {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orders = wx.getStorageSync('orders') || []
          const orderIndex = orders.findIndex(o => o.id === this.data.order.id)
          
          if (orderIndex !== -1) {
            orders[orderIndex].status = 'cancelled'
            orders[orderIndex].statusText = '已取消'
            wx.setStorageSync('orders', orders)
            
            this.setData({
              order: orders[orderIndex]
            })
          }
          
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          })
        }
      }
    })
  },

  // 确认收货
  confirmReceive() {
    wx.showModal({
      title: '确认收货',
      content: '确认已收到商品？',
      success: (res) => {
        if (res.confirm) {
          const orders = wx.getStorageSync('orders') || []
          const orderIndex = orders.findIndex(o => o.id === this.data.order.id)
          
          if (orderIndex !== -1) {
            orders[orderIndex].status = 'completed'
            orders[orderIndex].statusText = '已完成'
            wx.setStorageSync('orders', orders)
            
            this.setData({
              order: orders[orderIndex]
            })
          }
          
          wx.showToast({
            title: '确认收货成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 再次购买
  buyAgain() {
    const app = getApp()
    const order = this.data.order
    
    order.items.forEach(item => {
      app.addToCart(item, item.quantity)
    })
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/cart/cart'
      })
    }, 1500)
  },

  // 复制订单号
  copyOrderId() {
    wx.setClipboardData({
      data: this.data.order.id,
      success: () => {
        wx.showToast({
          title: '订单号已复制',
          icon: 'success'
        })
      }
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})





