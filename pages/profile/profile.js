// 用户中心页面逻辑
Page({
  data: {
    userInfo: {
      nickname: '用户昵称',
      avatar: 'https://via.placeholder.com/120x120/ff6b35/ffffff?text=用户',
      phone: '138****8888',
      level: 'VIP会员'
    },
    orderStats: {
      unpaid: 0,
      unshipped: 0,
      unconfirmed: 0,
      uncommented: 0
    },
    menuItems: [
      {
        id: 1,
        icon: '📦',
        title: '我的订单',
        path: '/pages/orders/orders',
        badge: 0
      },
      {
        id: 2,
        icon: '❤️',
        title: '我的收藏',
        path: '/pages/collection/collection',
        badge: 0
      },
      {
        id: 3,
        icon: '📍',
        title: '收货地址',
        path: '/pages/address/address',
        badge: 0
      },
      {
        id: 4,
        icon: '💳',
        title: '优惠券',
        path: '/pages/coupons/coupons',
        badge: 2
      },
      {
        id: 5,
        icon: '💰',
        title: '我的钱包',
        path: '/pages/wallet/wallet',
        badge: 0
      },
      {
        id: 6,
        icon: '🎁',
        title: '积分商城',
        path: '/pages/points/points',
        badge: 0
      },
      {
        id: 7,
        icon: '📞',
        title: '客服中心',
        path: '/pages/service/service',
        badge: 0
      },
      {
        id: 8,
        icon: '⚙️',
        title: '设置',
        path: '/pages/settings/settings',
        badge: 0
      }
    ]
  },

  onLoad() {
    // 获取系统信息，适配安全区域
    const systemInfo = wx.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    // 将像素转换为rpx (1px ≈ 2rpx，根据屏幕宽度750rpx计算)
    const screenWidth = systemInfo.windowWidth || 375
    const rpxRatio = 750 / screenWidth
    const statusBarHeightRpx = statusBarHeight * rpxRatio
    const safeAreaTop = systemInfo.safeArea ? ((systemInfo.safeArea.top - statusBarHeight) * rpxRatio) : 0
    const headerPaddingTop = statusBarHeightRpx + safeAreaTop + 60 // 60rpx基础padding
    
    this.setData({
      headerPaddingTop: headerPaddingTop
    })
    
    this.loadUserInfo()
    this.loadOrderStats()
  },

  onShow() {
    this.loadOrderStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || this.data.userInfo
    this.setData({ userInfo })
  },

  // 加载订单统计
  loadOrderStats() {
    const orders = wx.getStorageSync('orders') || []
    const orderStats = {
      unpaid: orders.filter(o => o.status === 'unpaid').length,
      unshipped: orders.filter(o => o.status === 'unshipped').length,
      unconfirmed: orders.filter(o => o.status === 'unconfirmed').length,
      uncommented: orders.filter(o => o.status === 'completed' && !o.commented).length
    }
    this.setData({ orderStats })
  },

  // 跳转到订单列表
  goToOrders(e) {
    const status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: `/pages/orders/orders?status=${status || 'all'}`
    })
  },

  // 跳转到菜单项
  goToMenu(e) {
    const path = e.currentTarget.dataset.path
    if (path) {
      wx.navigateTo({
        url: path
      })
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
  },

  // 编辑个人信息
  editProfile() {
    wx.navigateTo({
      url: '/pages/edit-profile/edit-profile'
    })
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '我的个人中心',
      path: '/pages/profile/profile'
    }
  }
})





