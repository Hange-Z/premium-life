// 编辑个人信息页面逻辑
Page({
  data: {
    userInfo: {
      nickname: '',
      avatar: '',
      phone: '',
      level: ''
    }
  },

  onLoad() {
    this.loadUserInfo()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {
      nickname: '用户昵称',
      avatar: 'https://via.placeholder.com/120x120/ff6b35/ffffff?text=用户',
      phone: '138****8888',
      level: 'VIP会员'
    }
    
    this.setData({ userInfo })
  },

  // 输入昵称
  onNicknameInput(e) {
    this.setData({
      'userInfo.nickname': e.detail.value
    })
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },

  // 选择头像
  chooseAvatar() {
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        that.setData({
          'userInfo.avatar': tempFilePath
        })
      }
    })
  },

  // 保存信息
  saveProfile() {
    const { nickname, phone } = this.data.userInfo
    
    if (!nickname.trim()) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }
    
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    
    wx.setStorageSync('userInfo', this.data.userInfo)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})

