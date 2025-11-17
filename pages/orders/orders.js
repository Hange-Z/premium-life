// 订单列表页面逻辑
Page({
  data: {
    currentTab: 'all',
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'unpaid', label: '待付款' },
      { key: 'unshipped', label: '待发货' },
      { key: 'unconfirmed', label: '待收货' },
      { key: 'completed', label: '已完成' }
    ],
    orders: [],
    filteredOrders: []
  },

  onLoad(options) {
    const status = options.status || 'all'
    this.setData({ currentTab: status })
    this.loadOrders()
  },

  onShow() {
    this.loadOrders()
  },

  // 加载订单数据
  loadOrders() {
    let orders = wx.getStorageSync('orders') || []
    
    // 如果没有订单，生成一些示例订单
    if (orders.length === 0) {
      orders = this.generateSampleOrders()
      wx.setStorageSync('orders', orders)
    }
    
    // 确保所有订单都有statusText
    orders = this.addStatusText(orders)
    
    this.setData({ orders })
    this.filterOrders()
  },

  // 添加状态文本
  addStatusText(orders) {
    const statusTextMap = {
      'unpaid': '待付款',
      'unshipped': '待发货',
      'unconfirmed': '待收货',
      'completed': '已完成',
      'cancelled': '已取消'
    }
    
    return orders.map(order => ({
      ...order,
      statusText: order.statusText || statusTextMap[order.status] || order.status
    }))
  },

  // 生成示例订单
  generateSampleOrders() {
    const statusTextMap = {
      'unpaid': '待付款',
      'unshipped': '待发货',
      'unconfirmed': '待收货',
      'completed': '已完成',
      'cancelled': '已取消'
    }
    
    return [
      {
        id: 'ORD001',
        status: 'unpaid',
        statusText: statusTextMap['unpaid'],
        totalPrice: 95.6,
        createTime: '2024-01-15 10:30',
        items: [
          {
            id: 1,
            title: '头水夹心海苔 18g*10袋',
            price: 52.8,
            quantity: 1,
            image: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=海苔',
            spec: '10袋家庭装'
          },
          {
            id: 2,
            title: '新鲜黄桃罐头 425g*6罐',
            price: 42.8,
            quantity: 1,
            image: 'https://via.placeholder.com/300x300/ff9f43/ffffff?text=黄桃',
            spec: '5罐普通装'
          }
        ]
      },
      {
        id: 'ORD002',
        status: 'unshipped',
        statusText: statusTextMap['unshipped'],
        totalPrice: 68.0,
        createTime: '2024-01-14 15:20',
        items: [
          {
            id: 3,
            title: '有机草莓 500g 新鲜水果',
            price: 68.0,
            quantity: 1,
            image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=草莓',
            spec: '500g装'
          }
        ]
      },
      {
        id: 'ORD003',
        status: 'unconfirmed',
        statusText: statusTextMap['unconfirmed'],
        totalPrice: 88.0,
        createTime: '2024-01-13 09:15',
        items: [
          {
            id: 4,
            title: '坚果大礼包 混合坚果',
            price: 88.0,
            quantity: 1,
            image: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=坚果',
            spec: '30袋家庭装'
          }
        ]
      },
      {
        id: 'ORD004',
        status: 'completed',
        statusText: statusTextMap['completed'],
        totalPrice: 45.6,
        createTime: '2024-01-10 14:45',
        items: [
          {
            id: 5,
            title: '纯牛奶 250ml*12盒',
            price: 45.6,
            quantity: 1,
            image: 'https://via.placeholder.com/300x300/3498db/ffffff?text=牛奶',
            spec: '12盒装'
          }
        ],
        commented: false
      }
    ]
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    this.filterOrders()
  },

  // 筛选订单
  filterOrders() {
    const { orders, currentTab } = this.data
    let filteredOrders = orders
    
    if (currentTab !== 'all') {
      if (currentTab === 'uncommented') {
        filteredOrders = orders.filter(o => o.status === 'completed' && !o.commented)
      } else {
        filteredOrders = orders.filter(o => o.status === currentTab)
      }
    }
    
    this.setData({ filteredOrders })
  },

  // 查看订单详情
  viewOrderDetail(e) {
    const orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${orderId}`
    })
  },

  // 取消订单
  cancelOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认取消',
      content: '确定要取消这个订单吗？',
      success: (res) => {
        if (res.confirm) {
          const orders = this.data.orders.map(order => {
            if (order.id === orderId) {
              order.status = 'cancelled'
              order.statusText = '已取消'
            }
            return order
          })
          this.setData({ orders })
          wx.setStorageSync('orders', orders)
          this.filterOrders()
          
          wx.showToast({
            title: '订单已取消',
            icon: 'success'
          })
        }
      }
    })
  },

  // 支付订单
  payOrder(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showLoading({
      title: '支付中...'
    })
    
    setTimeout(() => {
      const orders = this.data.orders.map(order => {
        if (order.id === orderId) {
          order.status = 'unshipped'
          order.statusText = '待发货'
        }
        return order
      })
      this.setData({ orders })
      wx.setStorageSync('orders', orders)
      this.filterOrders()
      
      wx.hideLoading()
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      })
    }, 2000)
  },

  // 确认收货
  confirmReceive(e) {
    const orderId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认收货',
      content: '确认已收到商品？',
      success: (res) => {
        if (res.confirm) {
          const orders = this.data.orders.map(order => {
            if (order.id === orderId) {
              order.status = 'completed'
              order.statusText = '已完成'
            }
            return order
          })
          this.setData({ orders })
          wx.setStorageSync('orders', orders)
          this.filterOrders()
          
          wx.showToast({
            title: '确认收货成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 再次购买
  buyAgain(e) {
    const order = e.currentTarget.dataset.order
    const app = getApp()
    
    order.items.forEach(item => {
      app.addToCart(item, item.quantity)
    })
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})





