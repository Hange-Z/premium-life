// 积分商城页面逻辑
Page({
  data: {
    totalPoints: 0,
    pointsProducts: [
      {
        id: 1,
        name: '10元优惠券',
        points: 100,
        image: 'https://via.placeholder.com/200x200/ff6b35/ffffff?text=优惠券',
        stock: 100,
        description: '满50元可用'
      },
      {
        id: 2,
        name: '20元优惠券',
        points: 200,
        image: 'https://via.placeholder.com/200x200/ff9f43/ffffff?text=优惠券',
        stock: 50,
        description: '满100元可用'
      },
      {
        id: 3,
        name: '精美礼品',
        points: 500,
        image: 'https://via.placeholder.com/200x200/e74c3c/ffffff?text=礼品',
        stock: 20,
        description: '精美定制礼品一份'
      },
      {
        id: 4,
        name: 'VIP会员月卡',
        points: 1000,
        image: 'https://via.placeholder.com/200x200/3498db/ffffff?text=VIP',
        stock: 10,
        description: '享受VIP会员特权'
      }
    ],
    exchangeHistory: []
  },

  onLoad() {
    this.loadPointsData()
  },

  onShow() {
    this.loadPointsData()
  },

  // 加载积分数据
  loadPointsData() {
    const walletData = wx.getStorageSync('wallet') || { points: 0 }
    const history = wx.getStorageSync('pointsExchangeHistory') || []
    
    this.setData({
      totalPoints: walletData.points || 0,
      exchangeHistory: history
    })
  },

  // 兑换商品
  exchangeProduct(e) {
    const product = e.currentTarget.dataset.product
    
    if (this.data.totalPoints < product.points) {
      wx.showToast({
        title: '积分不足',
        icon: 'none'
      })
      return
    }
    
    if (product.stock <= 0) {
      wx.showToast({
        title: '库存不足',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '确认兑换',
      content: `确定要用${product.points}积分兑换"${product.name}"吗？`,
      success: (res) => {
        if (res.confirm) {
          // 扣除积分
          const walletData = wx.getStorageSync('wallet') || { points: 0 }
          walletData.points = (walletData.points || 0) - product.points
          wx.setStorageSync('wallet', walletData)
          
          // 记录兑换历史
          const history = wx.getStorageSync('pointsExchangeHistory') || []
          history.unshift({
            id: Date.now(),
            productName: product.name,
            points: product.points,
            time: this.formatTime(new Date())
          })
          wx.setStorageSync('pointsExchangeHistory', history)
          
          // 更新库存
          const products = this.data.pointsProducts
          const productIndex = products.findIndex(p => p.id === product.id)
          if (productIndex !== -1) {
            products[productIndex].stock -= 1
            this.setData({ pointsProducts: products })
          }
          
          this.loadPointsData()
          
          wx.showToast({
            title: '兑换成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 查看兑换记录
  viewHistory() {
    wx.navigateTo({
      url: '/pages/points-history/points-history'
    })
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
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '积分商城',
      path: '/pages/points/points'
    }
  }
})

