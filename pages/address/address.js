// 收货地址管理页面逻辑
Page({
  data: {
    addresses: [],
    selectMode: false, // 是否为选择模式
    selectedAddressId: null
  },

  onLoad(options) {
    if (options.select === 'true') {
      this.setData({ selectMode: true })
    }
    this.loadAddresses()
  },

  onShow() {
    this.loadAddresses()
  },

  // 加载地址列表
  loadAddresses() {
    let addresses = wx.getStorageSync('addresses') || []
    
    // 如果没有地址，生成默认地址
    if (addresses.length === 0) {
      addresses = [
        {
          id: 1,
          name: '张三',
          phone: '138****8888',
          address: '北京市朝阳区xxx街道xxx号',
          detail: 'xxx小区xxx号楼xxx室',
          isDefault: true
        }
      ]
      wx.setStorageSync('addresses', addresses)
    }
    
    this.setData({ addresses })
  },

  // 添加新地址
  addAddress() {
    wx.navigateTo({
      url: '/pages/address-edit/address-edit'
    })
  },

  // 编辑地址
  editAddress(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/address-edit/address-edit?id=${id}`
    })
  },

  // 删除地址
  deleteAddress(e) {
    const id = e.currentTarget.dataset.id
    const address = this.data.addresses.find(a => a.id === id)
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除"${address.name}"的地址吗？`,
      success: (res) => {
        if (res.confirm) {
          let addresses = this.data.addresses.filter(a => a.id !== id)
          
          // 如果删除的是默认地址，设置第一个为默认
          if (address.isDefault && addresses.length > 0) {
            addresses[0].isDefault = true
          }
          
          this.setData({ addresses })
          wx.setStorageSync('addresses', addresses)
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 设置默认地址
  setDefault(e) {
    const id = e.currentTarget.dataset.id
    const addresses = this.data.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    
    this.setData({ addresses })
    wx.setStorageSync('addresses', addresses)
    
    wx.showToast({
      title: '设置成功',
      icon: 'success'
    })
  },

  // 选择地址（选择模式）
  selectAddress(e) {
    if (!this.data.selectMode) return
    
    const id = e.currentTarget.dataset.id
    const address = this.data.addresses.find(a => a.id === id)
    
    if (address) {
      wx.setStorageSync('defaultAddress', address)
      
      // 返回上一页
      const pages = getCurrentPages()
      if (pages.length > 1) {
        const prevPage = pages[pages.length - 2]
        if (prevPage.setData) {
          prevPage.setData({ address })
        }
      }
      
      wx.navigateBack()
    }
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 空函数，用于阻止事件冒泡
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '我的收货地址',
      path: '/pages/address/address'
    }
  }
})
