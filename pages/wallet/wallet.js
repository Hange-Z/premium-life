// 我的钱包页面逻辑
Page({
  data: {
    balance: 0.00,
    points: 0,
    transactions: [],
    currentTab: 'balance', // balance: 余额, points: 积分
    tabs: [
      { key: 'balance', label: '余额' },
      { key: 'points', label: '积分' }
    ]
  },

  onLoad() {
    this.loadWalletData()
  },

  onShow() {
    this.loadWalletData()
  },

  // 加载钱包数据
  loadWalletData() {
    const walletData = wx.getStorageSync('wallet') || {
      balance: 0.00,
      points: 0,
      transactions: []
    }
    
    this.setData({
      balance: walletData.balance,
      points: walletData.points,
      transactions: walletData.transactions || []
    })
  },

  // 切换标签
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
  },

  // 充值
  recharge() {
    wx.showModal({
      title: '充值',
      content: '请输入充值金额',
      editable: true,
      placeholderText: '请输入金额',
      success: (res) => {
        if (res.confirm && res.content) {
          const amount = parseFloat(res.content)
          if (isNaN(amount) || amount <= 0) {
            wx.showToast({
              title: '请输入正确的金额',
              icon: 'none'
            })
            return
          }
          
          const walletData = wx.getStorageSync('wallet') || { balance: 0, transactions: [] }
          walletData.balance = (walletData.balance || 0) + amount
          walletData.transactions = walletData.transactions || []
          walletData.transactions.unshift({
            id: Date.now(),
            type: 'recharge',
            amount: amount,
            time: this.formatTime(new Date()),
            description: '账户充值'
          })
          
          wx.setStorageSync('wallet', walletData)
          this.loadWalletData()
          
          wx.showToast({
            title: '充值成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 提现
  withdraw() {
    if (this.data.balance <= 0) {
      wx.showToast({
        title: '余额不足',
        icon: 'none'
      })
      return
    }
    
    wx.showModal({
      title: '提现',
      content: `当前余额：¥${this.data.balance.toFixed(2)}，请输入提现金额`,
      editable: true,
      placeholderText: '请输入金额',
      success: (res) => {
        if (res.confirm && res.content) {
          const amount = parseFloat(res.content)
          if (isNaN(amount) || amount <= 0) {
            wx.showToast({
              title: '请输入正确的金额',
              icon: 'none'
            })
            return
          }
          
          if (amount > this.data.balance) {
            wx.showToast({
              title: '余额不足',
              icon: 'none'
            })
            return
          }
          
          const walletData = wx.getStorageSync('wallet') || { balance: 0, transactions: [] }
          walletData.balance = (walletData.balance || 0) - amount
          walletData.transactions = walletData.transactions || []
          walletData.transactions.unshift({
            id: Date.now(),
            type: 'withdraw',
            amount: -amount,
            time: this.formatTime(new Date()),
            description: '账户提现'
          })
          
          wx.setStorageSync('wallet', walletData)
          this.loadWalletData()
          
          wx.showToast({
            title: '提现成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 查看明细
  viewDetails() {
    wx.navigateTo({
      url: '/pages/wallet-details/wallet-details'
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
      title: '我的钱包',
      path: '/pages/wallet/wallet'
    }
  }
})

