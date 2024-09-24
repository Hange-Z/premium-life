Page({
  onBack() {
    wx.navigateBack();
  },
  data: {
    post: {
      title: '帖子标题',
      author: {
        avatar: '/assets/皮影图片/双手在头顶举着鞭子单脚站的女生.jpg',
        nickname: '我是季千寻'
      },
      content: '皮影戏是中国传统的民间艺术形式之一，具有悠久的历史和独特的文化价值。它起源于中国汉代，经过数百年的发展，形成了具有地方特色的各种风格。皮影戏不仅是中国文化的重要组成部分，也是世界非物质文化遗产的珍贵遗产。一、皮影戏的历史背景皮影戏的历史可以追溯到公元前2世纪的汉朝，当时的皮影戏是以剪纸为主要形式的戏剧演出。这种戏剧形式最初由汉代的艺人们在皇宫内演出，之后逐渐流传到民间。随着时间的推移，皮影戏的表现形式不断演变，从最初的剪纸到后来的皮影，逐渐形成了具有独特风格的艺术形式。在唐代，皮影戏开始受到广泛关注，并逐渐发展成为一种主要的戏剧形式。唐代的皮影戏不仅在国内流行，雕刻式**：皮影戏的表演主要通过在幕布上投射皮影的影像来完成。演员们站在幕布的另一侧，通过操控皮影的动作和姿势来演绎故事情节。表演时，演员们通常需要用手中的木棍或线绳操控皮影，使其在灯光下做出各种动作和姿势。3. **音乐与配乐**：皮影戏的音乐和配乐也是其重要的艺术特点之一。传统的皮影戏音乐通常由鼓、锣、钹等乐器演奏，并配以歌唱和口技。音乐的节奏和旋律与皮影戏的剧情和人物动作密切配合，为观众提供了丰富的听觉享受。4. **戏剧内容**：皮影戏的剧本内容丰富多彩，涵盖了历史、神话、民间故事等多个方面。传统的皮影戏剧本多以古代历史故事、民间传说为题材，通过生动的表演和音乐展示了人物的情感和故事的情的文化色彩。',
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
