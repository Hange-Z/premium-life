Page({
  isFavorite: true, // 初始状态
  data: {
    currentTab: 'dynamic', // 默认显示动态内容

    posts1: [
      {
        id:1,
        isFavorite: true,
        title: "帖子标题 1",
        imageUrl: "/assets/皮影图片/image1.png",
        author:"作者1",
        body:"贴子内容1"
      },
      {
        id:2,
        isFavorite: true,
        title: "帖子标题 2",
        imageUrl: "/assets/皮影图片/image2.jpg",
        author:"作者2",
        body:"贴子内容2"
      },
      {
        id:3,
        isFavorite: true,
        title: "帖子标题 3",
        imageUrl: "/assets/皮影图片/一手扇子一手马鞭的女生.jpg",
        author:"作者3",
        body:"贴子内容3"
      },
      {
        id:4,
        isFavorite: true,
        title: "帖子标题 4",
        imageUrl: "/assets/皮影图片/三人打架.jpg",
        author:"作者4",
        body:"贴子内容4"
      },
      {
        id:5,
        isFavorite: true,
        title: "帖子标题 5",
        imageUrl: "/assets/皮影图片/举手女生.jpg",
        author:"作者5",
        body:"贴子内容5"
      },
      {
        id:6,
        isFavorite: true,
        title: "帖子标题 6",
        imageUrl: "/assets/皮影图片/双手在头顶举着鞭子单脚站的女生.jpg",
        author:"作者6",
        body:"贴子内容6"
      },
      {
        id:7,
        isFavorite: true,
        title: "帖子标题 7",
        imageUrl: "/assets/皮影图片/双臂展开的女的.png",
        author:"作者7",
        body:"贴子内容7"
      },
      {
        id:8,
        isFavorite: true,
        title: "帖子标题 8",
        imageUrl: "/assets/皮影图片/咬着扫把的怪物.png",
        author:"作者8",
        body:"贴子内容8"
      },
      {
        id:9,
        isFavorite: true,
        title: "帖子标题 9",
        imageUrl: "/assets/皮影图片/四郎探母.jpg",
        author:"作者9",
        body:"贴子内容9"
      },
      {
        id:10,
        isFavorite: true,
        title: "帖子标题 10",
        imageUrl: "/assets/皮影图片/天官赐福—一人站在一片云多少，手里端着东西.png",
        author:"作者10",
        body:"贴子内容10"
      }
    ],
    posts2: [
      { id:1,isFavorite: true,imageUrl: '/assets/皮影图片/天官赐福—一人站在一片云多少，手里端着东西.png', title: 'Title 1' ,author:'作者1'},
      { id:2,isFavorite: true,imageUrl: '/assets/皮影图片/头上有根鸡毛的人.jpeg', title: 'Title 2' ,author:'作者2'},
      {id:3,isFavorite: true, imageUrl: '/assets/皮影图片/女子头.jpg', title: 'Title 3' ,author:'作者3'},
      {id:4,isFavorite: true, imageUrl: '/assets/皮影图片/拿扇子单脚站.png', title: 'Title 4' ,author:'作者4'},
      { id:5,isFavorite: true,imageUrl: '/assets/皮影图片/挑着灯的怪物.png', title: 'Title 5',author:'作者5'},
      {id:6,isFavorite: true, imageUrl: '/assets/皮影图片/摸胡须的官大人-清代陕甘皮影天官赐福.png', title: 'Title 6',author:'作者6'},
      {id:7,isFavorite: true, imageUrl: '/assets/皮影图片/撑伞女的坐着.png', title: 'Title 7' ,author:'作者7'},
      {id:8,isFavorite: true, imageUrl: '/assets/皮影图片/敲锣的怪物.png', title: 'Title 8' ,author:'作者8'},
      { id:9,isFavorite:true,imageUrl: '/assets/皮影图片/清代陕甘皮影天官赐福-三个神仙一朵云.png', title: 'Title 9',author:'作者9' },
      {id:10,isFavorite:true, imageUrl: '/assets/皮影图片/清代陕甘皮影天官赐福-不知道什么东西，看上去像个摆件.png', title: 'Title 10' ,author:'作者10'},
      { id:11,isFavorite: true,imageUrl: '/assets/皮影图片/清代陕甘皮影天官赐福-寿星（大脑门）.png', title: 'Title 11' ,author:'作者11'},
      {id:12,isFavorite: true, imageUrl: '/assets/皮影图片/清代陕甘皮影戏十八地狱.png', title: 'Title 12',author:'作者12'},
      // 其他帖子数据
    ]
  },
  onFavorite: function(postId) {
    const posts = this.data.posts1.map(post => {
      if (post.id === postId) {
        post.isFavorite = !post.isFavorite;
      }
      return post;
    });
  
    
    this.setData({
      posts: posts
    });
  
    wx.showToast({
      title: posts.find(post => post.id === postId).isFavorite ? '已收藏' : '取消收藏',
      icon: 'success'
    });
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },
  
});
