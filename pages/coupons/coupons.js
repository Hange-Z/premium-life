// 优惠券页面逻辑
Page({
  data: {
    currentTab: 'available', // available: 可用, used: 已用, expired: 已过期
    tabs: [
      { key: 'available', label: '可用' },
      { key: 'used', label: '已用' },
      { key: 'expired', label: '已过期' }
    ],
    coupons: {
      available: [
        {
          id: 1,
          name: '新用户专享',
          type: 'discount', // discount: 满减, percent: 折扣
          value: 10,
          condition: '满50元可用',
          startTime: '2024-01-01',
          endTime: '2024-12-31',
          description: '新用户专享优惠券'
        },
        {
          id: 2,
          name: '满减优惠',
          type: 'discount',
          value: 20,
          condition: '满100元可用',
          startTime: '2024-01-01',
          endTime: '2024-12-31',
          description: '满100减20'
        }
      ],
      used: [
        {
          id: 3,
          name: '已使用优惠券',
          type: 'discount',
          value: 15,
          condition: '满80元可用',
          startTime: '2024-01-01',
          endTime: '2024-12-31',
          description: '已使用'
        }
      ],
      expired: []
    },
    filteredCoupons: []
  },

  onLoad() {
    this.loadCoupons()
  },

  // 加载优惠券
  loadCoupons() {
    const coupons = wx.getStorageSync('coupons') || this.data.coupons
    this.setData({ coupons })
    this.filterCoupons()
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    this.filterCoupons()
  },

  // 筛选优惠券
  filterCoupons() {
    const { coupons, currentTab } = this.data
    this.setData({
      filteredCoupons: coupons[currentTab] || []
    })
  },

  // 领取优惠券
  receiveCoupon(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '领取成功',
      icon: 'success'
    })
  },

  // 使用优惠券
  useCoupon(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '已选择优惠券',
      icon: 'success'
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '我的优惠券',
      path: '/pages/coupons/coupons'
    }
  }
})

