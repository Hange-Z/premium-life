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
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/举手女生.jpg?sign=9ea64fe1b3620d99daf9159142e545bf&t=1730537403' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/叉腰指人的女生.jpg?sign=4aa1aa99157a7a2a91b0d6ecaa5f13a6&t=1730537431' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/双手在头顶举着鞭子单脚站的女生.jpg?sign=e40037d03e6b5799b2d0db91c65eb799&t=1730537438' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/双臂展开的女的.png?sign=092d4ad7bf2de2307e2656c0b11fead8&t=1730537445' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/咬着扫把的怪物.png?sign=50cdc3ae6d9649ea7969f066afea3050&t=1730537452' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/头上有根鸡毛的人.jpeg?sign=9132e5e1cb7ac599600282b3698158cd&t=1730537459' },
        { src: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/挑着灯的怪物.png?sign=46b3e564b1261615cc130bb1a9735c5a&t=1730537466' },
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
