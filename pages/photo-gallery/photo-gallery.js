Page({
  onBack() {
    wx.navigateBack();
  },
  data: {
    post: {
      // id:1,
      title: '图集标题',
      author: {
        avatar: '/assets/皮影图片/双手在头顶举着鞭子单脚站的女生.jpg',
        nickname: '我是季千寻'
      },
      images: [
        { src: '/assets/皮影图片/四郎探母.jpg' },
        { src: '/assets/皮影图片/举手女生.jpg' },
        { src: '/assets/皮影图片/清代陕甘皮影天官赐福-寿星（大脑门）.png' },
        { src: '/assets/皮影图片/皮影戳子.png' },
        { src: '/assets/皮影图片/穿双喜服的皇上（新郎）.jpg' },
        { src: '/assets/皮影图片/肚子有嘴的鸟人.png' },
        { src: '/assets/皮影图片/红衣新郎官.png' },
      ],
      likes: 0,
      comments: []
    },
    isFavorited: false,
    isLiked: false,
    newComment: ''
  },
  onLoad: function(options) {
    const postId = options.id;
    // 模拟获取帖子数据
    // 可以通过 API 请求获取真实数据
  },
  toggleFavorite: function() {
    this.setData({
      isFavorited: !this.data.isFavorited
    });
  },
  toggleLike: function() {
    this.setData({
      isLiked: !this.data.isLiked,
      'post.likes': this.data.isLiked ? this.data.post.likes - 1 : this.data.post.likes + 1
    });
  },
  onCommentInput: function(event) {
    this.setData({
      newComment: event.detail.value
    });
  },
  submitComment: function() {
    if (this.data.newComment.trim() === '') return;
    
    const newComment = {
      id: Date.now(),
      avatar: '/assets/皮影图片/头上有根鸡毛的人.jpg',
      nickname: '评论者昵称',
      content: this.data.newComment
    };
    
    this.setData({
      post: {
        ...this.data.post,
        comments: [...this.data.post.comments, newComment]
      },
      newComment: ''
    });
  }
});
