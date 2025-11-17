// 编辑地址页面逻辑
Page({
  data: {
    addressId: null,
    name: '',
    phone: '',
    region: ['北京市', '北京市', '朝阳区'],
    address: '',
    detail: '',
    isDefault: false
  },

  onLoad(options) {
    if (options.id) {
      this.loadAddress(options.id)
    }
  },

  // 加载地址信息
  loadAddress(id) {
    const addresses = wx.getStorageSync('addresses') || []
    const address = addresses.find(a => a.id === parseInt(id))
    
    if (address) {
      this.setData({
        addressId: address.id,
        name: address.name,
        phone: address.phone,
        address: address.address,
        detail: address.detail || '',
        isDefault: address.isDefault || false
      })
    }
  },

  // 输入姓名
  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  // 输入电话
  onPhoneInput(e) {
    this.setData({ phone: e.detail.value })
  },

  // 选择地区
  onRegionChange(e) {
    this.setData({ region: e.detail.value })
  },

  // 输入详细地址
  onAddressInput(e) {
    this.setData({ address: e.detail.value })
  },

  // 输入门牌号
  onDetailInput(e) {
    this.setData({ detail: e.detail.value })
  },

  // 切换默认地址
  toggleDefault() {
    this.setData({ isDefault: !this.data.isDefault })
  },

  // 保存地址
  saveAddress() {
    const { name, phone, region, address, detail, isDefault, addressId } = this.data
    
    // 验证
    if (!name.trim()) {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none'
      })
      return
    }
    
    if (!phone.trim() || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    
    if (!address.trim()) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return
    }
    
    let addresses = wx.getStorageSync('addresses') || []
    const fullAddress = region.join('') + address
    
    if (addressId) {
      // 编辑
      addresses = addresses.map(addr => {
        if (addr.id === addressId) {
          return {
            ...addr,
            name,
            phone,
            address: fullAddress,
            detail,
            isDefault
          }
        }
        // 如果设置为默认，其他地址取消默认
        return isDefault ? { ...addr, isDefault: false } : addr
      })
    } else {
      // 新增
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1
      const newAddress = {
        id: newId,
        name,
        phone,
        address: fullAddress,
        detail,
        isDefault
      }
      
      // 如果设置为默认，其他地址取消默认
      if (isDefault) {
        addresses = addresses.map(addr => ({ ...addr, isDefault: false }))
      }
      
      addresses.push(newAddress)
    }
    
    wx.setStorageSync('addresses', addresses)
    
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

