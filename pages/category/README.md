# 商品分类列表页面

## 功能概述

这是一个完整的微信小程序商品分类列表页面，包含以下核心功能：

### 🎯 主要功能
- **分类导航**：左侧垂直分类列表，支持滚动和高亮选中
- **商品展示**：右侧商品卡片列表，瀑布流布局
- **商品详情弹窗**：半屏弹窗展示商品规格选择和购买功能
- **购物车功能**：支持直接加入购物车和规格选择后加入
- **搜索功能**：顶部搜索栏（可扩展实现）

### 🎨 设计特色
- **现代化UI**：圆角卡片、阴影效果、渐变色彩
- **响应式布局**：适配不同屏幕尺寸
- **流畅动画**：弹窗滑入滑出、按钮点击反馈
- **橙色主题**：主色调为橙色(#ff6b35)，符合电商风格

## 文件结构

```
pages/category/
├── category.wxml    # 页面模板
├── category.wxss    # 页面样式
├── category.js      # 页面逻辑
├── category.json    # 页面配置
└── README.md        # 说明文档
```

## 核心组件

### 1. 分类导航
- 固定宽度200rpx
- 垂直滚动布局
- 选中状态高亮显示
- 支持动态切换分类

### 2. 商品列表
- 卡片式布局
- 商品图片、标题、价格、贡献值
- 悬浮购物车按钮
- 点击触发详情弹窗

### 3. 商品规格弹窗
- 半屏底部弹出
- 商品基础信息展示
- 规格选择（横向滚动）
- 数量加减控制
- 加入购物车/立即购买按钮

## 数据结构

### 分类数据
```javascript
categories: [
  { name: '全部', id: 0 },
  { name: '新品上架', id: 1 },
  // ...
]
```

### 商品数据
```javascript
products: [
  {
    id: 1,
    title: '商品标题',
    price: 52.8,
    contribution: 52.8,
    image: '图片URL',
    stock: 1000,
    specs: [
      { name: '规格名称', price: 42.8 },
      // ...
    ]
  }
]
```

## 使用方法

### 1. 页面跳转
```javascript
wx.navigateTo({
  url: '/pages/category/category'
});
```

### 2. 数据接口对接
在`category.js`中修改以下方法：
- `loadProductsByCategory()`: 对接真实API
- `addToCartAction()`: 实现购物车逻辑
- `buyNow()`: 对接支付流程

### 3. 自定义样式
在`category.wxss`中修改：
- 主色调：修改`#ff6b35`为你的品牌色
- 布局尺寸：调整rpx值适配设计稿
- 动画效果：修改transition属性

## 扩展功能

### 1. 搜索功能
```javascript
onSearchInput: function(e) {
  const keyword = e.detail.value;
  // 实现搜索逻辑
  this.searchProducts(keyword);
}
```

### 2. 下拉刷新
```javascript
onPullDownRefresh: function() {
  // 刷新商品数据
  this.loadProductsByCategory(this.data.currentCategory);
}
```

### 3. 上拉加载
```javascript
onReachBottom: function() {
  // 加载更多商品
  this.loadMoreProducts();
}
```

## 注意事项

1. **图片资源**：当前使用占位图片，需要替换为真实商品图片
2. **API对接**：需要根据实际后端接口调整数据格式
3. **性能优化**：大量商品时建议使用虚拟列表
4. **兼容性**：确保在不同微信版本中正常显示

## 更新日志

- v1.0.0: 初始版本，包含基础分类和商品展示功能
- 支持商品规格选择和购物车功能
- 响应式布局和现代化UI设计 