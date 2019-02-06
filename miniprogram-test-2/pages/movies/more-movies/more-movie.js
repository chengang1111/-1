// pages/movies/more-movies/more-movie.js
var app = getApp();
var util = require('../../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },
  onScrollLower: function(event) {
    var nextUrl = this.data.requestUrl + "?start" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onMovietap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  },
  onLoad: function(options) {
    var category = options.category;
    var dataUrl = "";
    this.setData({
      navigateTitle: category,
    });
    switch (category) {
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '正在上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }
    this.setData({
      requestUrl: dataUrl,
    });
    util.http(dataUrl, this.processDoubanData);
  },
  onPullDownRefresh: function(event) {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  processDoubanData: function(moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        stars: util.converToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp)
    }
    var totalMovies = {};
    //如果要绑定新加载的数据，那么需要同旧的数据合并在一起
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',

      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function() {

      }
    })
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }


})