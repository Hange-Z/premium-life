// 演示页面交互效果
const demoEffects = {
  // 分类切换动画
  categorySwitch: {
    description: "点击左侧分类，右侧商品列表平滑切换",
    code: `
    switchCategory: function(e) {
      const index = e.currentTarget.dataset.index;
      // 添加切换动画
      this.setData({
        currentCategory: index,
        // 可以添加商品列表切换动画
      });
    }
    `
  },

  // 商品卡片点击效果
  productCardClick: {
    description: "点击商品卡片，弹窗从底部滑入",
    code: `
    showProductDetail: function(e) {
      const product = e.currentTarget.dataset.product;
      this.setData({
        showModal: true,  // 触发弹窗显示动画
        selectedProduct: product
      });
    }
    `
  },

  // 规格选择效果
  specSelection: {
    description: "横向滚动规格标签，选中状态高亮",
    code: `
    selectSpec: function(e) {
      const index = e.currentTarget.dataset.index;
      const spec = this.data.selectedProduct.specs[index];
      this.setData({
        selectedSpecIndex: index,
        selectedSpec: spec.name
      });
    }
    `
  },

  // 数量控制效果
  quantityControl: {
    description: "加减按钮，数量实时更新，边界控制",
    code: `
    increaseQuantity: function() {
      if (this.data.quantity < this.data.selectedProduct.stock) {
        this.setData({
          quantity: this.data.quantity + 1
        });
      }
    }
    `
  },

  // 购物车功能
  cartFunction: {
    description: "加入购物车，显示成功提示",
    code: `
    addToCartAction: function(product, quantity, spec) {
      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      });
    }
    `
  }
};

// 样式效果演示
const styleEffects = {
  // 弹窗动画
  modalAnimation: `
  .modal-overlay {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .modal-overlay.show {
    opacity: 1;
    visibility: visible;
  }
  
  .modal-content {
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .modal-overlay.show .modal-content {
    transform: translateY(0);
  }
  `,

  // 按钮点击效果
  buttonEffect: `
  .cart-btn:active {
    transform: scale(0.9);
  }
  
  .product-card:active {
    transform: scale(0.98);
  }
  `,

  // 分类选中效果
  categoryActive: `
  .category-item.active {
    background: #ff6b35;
    color: white;
    font-weight: bold;
  }
  
  .category-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    width: 6rpx;
    height: 40rpx;
    background: white;
  }
  `
};

module.exports = {
  demoEffects,
  styleEffects
}; 