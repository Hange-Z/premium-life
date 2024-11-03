Page({
  isFavorite: true, // 初始状态
  data: {
    currentTab: 'dynamic', // 默认显示动态内容

    posts1: [
      {
        id:1,
        isFavorite: true,
        title: "帖子标题 1",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/三人打架.jpg?sign=03e19533953cb85327bca2db15e14cbb&t=1730536805",
        author:"作者1",
        body:"贴子内容1"
      },
      {
        id:2,
        isFavorite: true,
        title: "帖子标题 2",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/举手女生.jpg?sign=92ee08ccb3166d3ccfd1dfb99471467e&t=1730536824",
        author:"作者2",
        body:"贴子内容2"
      },
      {
        id:3,
        isFavorite: true,
        title: "帖子标题 3",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/叉腰指人的女生.jpg?sign=8b9c98bc47f417053f3e2a516aaebf78&t=1730536879",
        author:"作者3",
        body:"贴子内容3"
      },
      {
        id:4,
        isFavorite: true,
        title: "帖子标题 4",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/双手在头顶举着鞭子单脚站的女生.jpg?sign=5f5f79f00ca5866cb17f01b871cc8bfc&t=1730536889",
        author:"作者4",
        body:"贴子内容4"
      },
      {
        id:5,
        isFavorite: true,
        title: "帖子标题 5",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/双臂展开的女的.png?sign=8c4edb142b4196e9a1579e4f2fbe4f3d&t=1730536895",
        author:"作者5",
        body:"贴子内容5"
      },
      {
        id:6,
        isFavorite: true,
        title: "帖子标题 6",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/咬着扫把的怪物.png?sign=e5eea2857b0a0a3a30cdb8f1555367cb&t=1730536901",
        author:"作者6",
        body:"贴子内容6"
      },
      {
        id:7,
        isFavorite: true,
        title: "帖子标题 7",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/天官赐福—一人站在一片云多少，手里端着东西.png?sign=2fd680df6ac42b9425210b683dc00e62&t=1730536907",
        author:"作者7",
        body:"贴子内容7"
      },
      {
        id:8,
        isFavorite: true,
        title: "帖子标题 8",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/头上有根鸡毛的人.jpeg?sign=5b38827d74d1b5847e2f01b98a74abcf&t=1730536912",
        author:"作者8",
        body:"贴子内容8"
      },
      {
        id:9,
        isFavorite: true,
        title: "帖子标题 9",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/女子头.jpg?sign=5f1037fa9b9c6918b576034e4b170d0a&t=1730536918",
        author:"作者9",
        body:"贴子内容9"
      },
      {
        id:10,
        isFavorite: true,
        title: "帖子标题 10",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/挑着灯的怪物.png?sign=c514f3741f50418cd852b6ca41b82594&t=1730536923",
        author:"作者10",
        body:"贴子内容10"
      }
    ],
    posts2: [
      { id:1,isFavorite: true,imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/女子头.jpg?sign=2c4a4b1af77016381f46b31e6951459c&t=1730536988', title: 'Title 1' ,author:'作者1'},
      { id:2,isFavorite: true,imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/拿扇子单脚站.png?sign=db0060347d77d638b17ea8be28d32308&t=1730536992', title: 'Title 2' ,author:'作者2'},
      {id:3,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/挑着灯的怪物.png?sign=0e0d2e6799fdb3afd9866a641c55e783&t=1730536997', title: 'Title 3' ,author:'作者3'},
      {id:4,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/摸胡须的官大人-清代陕甘皮影天官赐福.png?sign=fc8710f2d7be8529eab55a63bb7475e8&t=1730537003', title: 'Title 4' ,author:'作者4'},
      { id:5,isFavorite: true,imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/摸胡须的官大人-清代陕甘皮影天官赐福.png?sign=b205ef6f2ea198b0b522ff0f3b140fe4&t=1730537016', title: 'Title 5',author:'作者5'},
      {id:6,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/撑伞女的坐着.png?sign=35c3c9c808f4fb0b10bf92c95f0f7c5f&t=1730537019', title: 'Title 6',author:'作者6'},
      {id:7,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/撑伞女的坐着.png?sign=c288e14e05c9093e50e111a08d360167&t=1730537024', title: 'Title 7' ,author:'作者7'},
      {id:8,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影天官赐福-三个神仙一朵云.png?sign=1dd1f8138a78d49aa5ca3b02ae4dbbd4&t=1730537027', title: 'Title 8' ,author:'作者8'},
      { id:9,isFavorite:true,imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影天官赐福-三个神仙一朵云.png?sign=e1d64565324d90bea6df5bb474a39782&t=1730537033', title: 'Title 9',author:'作者9' },
      {id:10,isFavorite:true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影天官赐福-三个神仙一朵云.png?sign=4b4d0786f3e4cdfe2dff59ff1396aedd&t=1730537037', title: 'Title 10' ,author:'作者10'},
      { id:11,isFavorite: true,imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影天官赐福-不知道什么东西，看上去像个摆件.png?sign=ffb39091e945617a65d5c7b1a0538996&t=1730537041', title: 'Title 11' ,author:'作者11'},
      {id:12,isFavorite: true, imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影戏十八地狱.png?sign=98f35c1b83fc9ab7ad52d654ff4f6287&t=1730537044', title: 'Title 12',author:'作者12'},
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
