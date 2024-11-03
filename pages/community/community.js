Page({
  data: {
    currentTab: 'dynamic', // 默认显示动态内容

    posts1: [
      {
        id:1,
        title: "帖子标题 1",
        imageUrl: "cloud://shadow-0gooh3356a2f78ff.7368-shadow-0gooh3356a2f78ff-1330756691/Assets/素材/图片/皮影图片/举手女生.jpg",
        author:"作者1",
        body:"贴子内容1"
      },
      {
        id:2,
        title: "帖子标题 2",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影戏十八地狱.png?sign=98f35c1b83fc9ab7ad52d654ff4f6287&t=1730537044",
        author:"作者2",
        body:"贴子内容2"
      },
      {
        id:3,
        title: "帖子标题 3",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影衬景.png?sign=1aea39a54ecce0e9234a2dfa9bfa5451&t=1730537295",
        author:"作者3",
        body:"贴子内容3"
      },
      {
        id:4,
        title: "帖子标题 4",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/清代陕甘皮影戏十八地狱.png?sign=2428a93a00549dff8194f334e633cf8d&t=1730537076",
        author:"作者4",
        body:"贴子内容4"
      },
      {
        id:5,
        title: "帖子标题 5",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影靴子.png?sign=6d0991ce88fc3c351287dd458dbc8a7c&t=1730537304",
        author:"作者5",
        body:"贴子内容5"
      },
      {
        id:6,
        title: "帖子标题 6",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/瑞兽，鱼-清代陕甘皮影天官赐福.png?sign=8e6c0aa12cbeb456dfed126472304b01&t=1730537091",
        author:"作者6",
        body:"贴子内容6"
      },
      {
        id:7,
        title: "帖子标题 7",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/穿双喜服的皇上（新郎）.jpg?sign=13e46bc195bf89136ecd8746c555788e&t=1730537339",
        author:"作者7",
        body:"贴子内容7"
      },
      {
        id:8,
        title: "帖子标题 8",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/瑞兽，鱼-清代陕甘皮影天官赐福.png?sign=899047cd9469133c1bdbe79b77a2f210&t=1730537320",
        author:"作者8",
        body:"贴子内容8"
      },
      {
        id:9,
        title: "帖子标题 9",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影动物.png?sign=eaf570d06a29f92becac0750c7da2409&t=1730537106",
        author:"作者9",
        body:"贴子内容9"
      },
      {
        id:10,
        title: "帖子标题 10",
        imageUrl: "https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影衬景.png?sign=d8715779c482afcc3589b0b1df843da6&t=1730537330",
        author:"作者10",
        body:"贴子内容10"
      }
    ],
    posts2: [
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影戳子.png?sign=a9ae780bb0a703192a2b542e1a439e34&t=1730537148', 
        title: 'Title 1',
        author:'作者1'
      },
      { imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/瑞兽，鱼-清代陕甘皮影天官赐福.png?sign=ac25ccf9ad10591fb3f759b663bc5f1c&t=1730537156', 
        title: 'Title 2',
        author:'作者2'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/穿双喜服的皇上（新郎）.jpg?sign=c3d4e662b854de82ca5478774aea781a&t=1730537166', 
        title: 'Title 3',
        author:'作者3'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影动物.png?sign=73fc33d5606237c40b00957579825c24&t=1730537375', 
        title: 'Title 4',
        author:'作者4'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/红衣新郎官.png?sign=761be1ada1330c54d7d98656d609ce15&t=1730537181',
        title: 'Title 5',
        author:'作者5'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影衬景.png?sign=32250f49130dd6815d7896f24e23a449&t=1730537396', 
        title: 'Title 6',
        author:'作者6'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/穿双喜服的皇上（新郎）.jpg?sign=b3229d84fb042e466962909ac6ca5f70&t=1730537196', 
        title: 'Title 7',
        author:'作者7'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/肚子有嘴的鸟人.png?sign=b92ebc4d08b0dc68d1042deaf5b5a53d&t=1730537204', 
        title: 'Title 8',
        author:'作者8'
      },
      { 
        imageUrl: '/assets/皮影图片/清代陕甘皮影天官赐福-三个神仙一朵云.png', 
        title: 'Title 9',
        author:'作者9' 
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/蛇精脸女生.jpg?sign=4ea5439dc2cdb5afd5ab5e60ca6e3442&t=1730537211', 
        title: 'Title 10',
        author:'作者10'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/西北清代皮影天官赐福-真有一条天官赐福.png?sign=50ebc3d3948df55449d043da34a040df&t=1730537219', 
        title: 'Title 11',
        author:'作者11'
      },
      { 
        imageUrl: 'https://7368-shadow-0gooh3356a2f78ff-1330756691.tcb.qcloud.la/Assets/素材/图片/皮影图片/皮影衬景.png?sign=a460e5f38ae0010e677b48deb8b3f46d&t=1730537227', 
        title: 'Title 12',
        author:'作者13'
      },
      // 其他帖子数据
    ]
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  }
});
