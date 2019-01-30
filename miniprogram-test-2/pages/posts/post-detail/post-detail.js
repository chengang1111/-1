var postsData = require('../../../data/posts-data.js')
// pages/posts/post-item/post-detail/post-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      currentPostId: postId
    });
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
  //  wx.clearStorage();
    var postsCollected = wx.getStorageSync('posts_collected');
    if(postsCollected){
      var postCollected = postsCollected[postId];
      if(postCollected){
        this.setData({
          collected: postCollected
        })
      }
    }
    else{
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onCollectionTap: function(event){
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showModal(postsCollected, postCollected);
  },
  showModal: function (postsCollected, postCollected){
    var that = this;
    wx.showModal({
      title:'收藏',
      content: postCollected ? "收藏该文章":"取消收藏该文章",
      showCancel:"true",
      cancelText:"取消",
      cancelColor:"#333",
      confirmText: "确认",
      confirmColor:'#405f80',
      success:function(res){
        if(res.confirm){
          that.showToast(postsCollected, postCollected);
        }
      }
    })
  },
  showToast: function(postsCollected,postCollected){
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    }),

      wx.showToast({
        title: postCollected ? "收藏成功" : "取消成功",
        duration: 1000
      })
  },
  onShareTap:function(event){
    var itemList = [
        "分享给微信好友",
        "分享到朋友圈",
        "分享给qq好友",
        "分享到微博"
      ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:"#405f80",
      success: function(res){
        //res.cancel 用户是否点击了取消按钮
        //res.tapIndex数组元素的序号，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '现在无法实现分享功能',
        })
      }
    })
  },
  onMusicTap: function(event){
    var isPlayingMusic = this.data.isPlayingMusic;
    if(isPlayingMusic){
      // wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else{
      // wx.playBackgroundAudio({
      //   dataUrl: 'http://music.163.com/#/song?id=25906124',
      //   title: '许巍',
      //   coverImgURL: ''
      // });
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})