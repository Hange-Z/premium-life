// 商品分类列表页面逻辑
Page({
  data: {
    // 分类数据
    categories: [
      { name: '全部', id: 0 },
      { name: '新品上架', id: 1 },
      { name: '优选水果', id: 2 },
      { name: '零食小吃', id: 3 },
      { name: '饮料饮品', id: 4 },
      { name: '生活用品', id: 5 },
      { name: '母婴用品', id: 6 },
      { name: '美妆护肤', id: 7 }
    ],
    currentCategory: 0,

    // 商品数据
    products: [
      {
        id: 1,
        title: '头水夹心海苔 18g*10袋 脆脆海苔片',
        price: 52.8,
        contribution: 52.8,
        image: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=海苔',
        stock: 1000,
        specs: [
          { name: '3袋尝鲜装', price: 18.8 },
          { name: '5袋普通装', price: 28.8 },
          { name: '10袋家庭装', price: 52.8 },
          { name: '15袋礼盒装', price: 78.8 },
          { name: '20袋大礼盒', price: 98.8 },
          { name: '30袋超大礼盒', price: 148.8 },
          { name: '50袋批发装', price: 238.8 },
          { name: '100袋团购装', price: 428.8 }
        ]
      },
      {
        id: 2,
        title: '新鲜黄桃罐头 425g*6罐 水果罐头',
        price: 42.8,
        contribution: 42.8,
        image: 'https://via.placeholder.com/300x300/ff9f43/ffffff?text=黄桃',
        stock: 500,
        specs: [
          { name: '3罐尝鲜装', price: 28.8 },
          { name: '5罐普通装', price: 42.8 },
          { name: '8罐家庭装', price: 68.8 },
          { name: '12罐礼盒装', price: 98.8 },
          { name: '16罐大礼盒', price: 128.8 },
          { name: '24罐超大礼盒', price: 188.8 },
          { name: '36罐批发装', price: 268.8 },
          { name: '48罐团购装', price: 338.8 }
        ]
      },
      {
        id: 3,
        title: '有机草莓 500g 新鲜水果',
        price: 68.0,
        contribution: 68.0,
        image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=草莓',
        stock: 200,
        specs: [
          { name: '250g尝鲜装', price: 38.0 },
          { name: '500g家庭装', price: 68.0 },
          { name: '750g大包装', price: 98.0 },
          { name: '1kg礼盒装', price: 128.0 },
          { name: '1.5kg大礼盒', price: 178.0 },
          { name: '2kg超大礼盒', price: 238.0 },
          { name: '3kg批发装', price: 338.0 },
          { name: '5kg团购装', price: 528.0 }
        ]
      },
      {
        id: 4,
        title: '坚果大礼包 混合坚果 每日坚果',
        price: 88.0,
        contribution: 88.0,
        image: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=坚果',
        stock: 300,
        specs: [
          { name: '7袋尝鲜装', price: 28.0 },
          { name: '15袋普通装', price: 58.0 },
          { name: '30袋家庭装', price: 88.0 },
          { name: '45袋礼盒装', price: 128.0 },
          { name: '60袋大礼盒', price: 158.0 },
          { name: '90袋超大礼盒', price: 228.0 },
          { name: '120袋批发装', price: 298.0 },
          { name: '180袋团购装', price: 428.0 }
        ]
      },
      {
        id: 5,
        title: '纯牛奶 250ml*12盒 营养早餐奶',
        price: 45.6,
        contribution: 45.6,
        image: 'https://via.placeholder.com/300x300/3498db/ffffff?text=牛奶',
        stock: 800,
        specs: [
          { name: '6盒尝鲜装', price: 25.6 },
          { name: '12盒家庭装', price: 45.6 },
          { name: '24盒礼盒装', price: 88.0 },
          { name: '36盒大礼盒', price: 128.0 },
          { name: '48盒超大礼盒', price: 168.0 },
          { name: '72盒批发装', price: 248.0 },
          { name: '96盒团购装', price: 328.0 },
          { name: '120盒企业装', price: 408.0 }
        ]
      }
    ],

    // 弹窗相关数据
    showModal: false,
    selectedProduct: {},
    selectedSpecIndex: 0,
    selectedSpec: '',
    quantity: 1
  },

  onLoad: function(options) {
    // 页面加载时的初始化
    this.setData({
      selectedProduct: this.data.products[0],
      selectedSpec: this.data.products[0].specs[0].name
    });
  },

  // 切换分类
  switchCategory: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentCategory: index
    });
    
    // 这里可以根据分类ID加载对应的商品数据
    // this.loadProductsByCategory(this.data.categories[index].id);
  },

  // 显示商品详情弹窗
  showProductDetail: function(e) {
    const product = e.currentTarget.dataset.product;
    this.setData({
      showModal: true,
      selectedProduct: product,
      selectedSpecIndex: 0,
      selectedSpec: product.specs[0].name,
      quantity: 1
    });
  },

  // 隐藏弹窗
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },

  // 阻止事件冒泡
  stopPropagation: function() {
    // 空函数，用于阻止事件冒泡
  },

  // 选择规格
  selectSpec: function(e) {
    const index = e.currentTarget.dataset.index;
    const spec = this.data.selectedProduct.specs[index];
    this.setData({
      selectedSpecIndex: index,
      selectedSpec: spec.name
    });
  },

  // 增加数量
  increaseQuantity: function() {
    if (this.data.quantity < this.data.selectedProduct.stock) {
      this.setData({
        quantity: this.data.quantity + 1
      });
    }
  },

  // 减少数量
  decreaseQuantity: function() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  // 从商品卡片直接加入购物车
  addToCart: function(e) {
    const product = e.currentTarget.dataset.product;
    this.addToCartAction(product, 1, product.specs[0]);
  },

  // 从弹窗加入购物车
  addToCartFromModal: function() {
    const product = this.data.selectedProduct;
    const spec = product.specs[this.data.selectedSpecIndex];
    this.addToCartAction(product, this.data.quantity, spec);
  },

  // 立即购买
  buyNow: function() {
    const product = this.data.selectedProduct;
    const spec = product.specs[this.data.selectedSpecIndex];
    
    // 模拟购买逻辑
    wx.showToast({
      title: '正在跳转支付...',
      icon: 'loading',
      duration: 2000
    });

    // 这里可以跳转到支付页面
    setTimeout(() => {
      this.hideModal();
      wx.showToast({
        title: '购买成功！',
        icon: 'success'
      });
    }, 2000);
  },

  // 加入购物车的通用方法
  addToCartAction: function(product, quantity, spec) {
    // 模拟加入购物车
    wx.showToast({
      title: `已加入购物车`,
      icon: 'success',
      duration: 1500
    });

    // 这里可以将商品信息存储到本地或发送到服务器
    console.log('加入购物车:', {
      product: product,
      quantity: quantity,
      spec: spec
    });
  },

  // 搜索功能
  onSearchInput: function(e) {
    const keyword = e.detail.value;
    // 这里可以实现搜索逻辑
    console.log('搜索关键词:', keyword);
  },

  // 根据分类加载商品（模拟API调用）
  loadProductsByCategory: function(categoryId) {
    // 这里可以调用真实的API
    wx.showLoading({
      title: '加载中...'
    });

    // 模拟网络请求
    setTimeout(() => {
      wx.hideLoading();
      // 根据分类ID更新商品列表
      // this.setData({
      //   products: newProducts
      // });
    }, 1000);
  },

  // 页面分享
  onShareAppMessage: function() {
    return {
      title: '发现好物，快来选购！',
      path: '/pages/category/category'
    };
  }
});