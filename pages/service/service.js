// 客服中心页面逻辑
Page({
  data: {
    faqList: [
      {
        id: 1,
        question: '如何下单购买？',
        answer: '在商品分类页面选择商品，加入购物车后点击结算即可下单。',
        expanded: false
      },
      {
        id: 2,
        question: '如何查看订单状态？',
        answer: '在"我的"页面点击"我的订单"可以查看所有订单状态。',
        expanded: false
      },
      {
        id: 3,
        question: '如何申请退款？',
        answer: '在订单详情页面可以申请退款，我们会在1-3个工作日内处理。',
        expanded: false
      },
      {
        id: 4,
        question: '如何联系客服？',
        answer: '您可以通过在线客服、电话客服或留言的方式联系我们。',
        expanded: false
      },
      {
        id: 5,
        question: '配送范围和时间？',
        answer: '我们支持全国配送，一般3-7个工作日送达。',
        expanded: false
      }
    ],
    contactMethods: [
      {
        id: 1,
        icon: '💬',
        name: '在线客服',
        desc: '9:00-22:00在线',
        action: 'chat'
      },
      {
        id: 2,
        icon: '📞',
        name: '电话客服',
        desc: '400-123-4567',
        action: 'call'
      },
      {
        id: 3,
        icon: '📝',
        name: '留言反馈',
        desc: '我们会尽快回复',
        action: 'feedback'
      }
    ]
  },

  onLoad() {
    console.log('客服中心页面加载')
  },

  // 展开/收起FAQ
  toggleFaq(e) {
    const id = e.currentTarget.dataset.id
    const faqList = this.data.faqList.map(item => {
      if (item.id === id) {
        item.expanded = !item.expanded
      }
      return item
    })
    this.setData({ faqList })
  },

  // 联系客服
  contactService(e) {
    const action = e.currentTarget.dataset.action
    
    switch(action) {
      case 'chat':
        wx.showToast({
          title: '正在连接客服...',
          icon: 'loading',
          duration: 2000
        })
        setTimeout(() => {
          wx.showToast({
            title: '客服繁忙，请稍后再试',
            icon: 'none'
          })
        }, 2000)
        break
      case 'call':
        wx.makePhoneCall({
          phoneNumber: '4001234567',
          fail: () => {
            wx.showToast({
              title: '拨打失败',
              icon: 'none'
            })
          }
        })
        break
      case 'feedback':
        wx.showModal({
          title: '留言反馈',
          content: '请输入您的问题或建议',
          editable: true,
          placeholderText: '请输入内容...',
          success: (res) => {
            if (res.confirm && res.content) {
              wx.showToast({
                title: '提交成功，我们会尽快回复',
                icon: 'success'
              })
            }
          }
        })
        break
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '客服中心',
      path: '/pages/service/service'
    }
  }
})

