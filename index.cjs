const Application = require('@waline/vercel');
const axios = require('axios');

// 自定义环境变量
const MY_EV_VAR = {
  // QMsg酱的key
  QMSG_KEY: "a209384dfac5a306b283c2aa9d76a440",
  // 作者邮箱
  AUTHOR_EMAIL: "2436378140@qq.com",
  // 网站名称
  SITE_NAME: "nan0in_blog",
  // 网站地址
  SITE_URL: "nan0in27.cn",
  
  QQ_ID: "2436378140"
}

module.exports = Application({
  // 违禁词
  forbiddenWords: ['习近平', '毛泽东'],
  plugins: [],
  // 评论发布后执行的操作，参数1：评论，参数2：回复评论的父级评论
  // 使用async的方法，方法体内调用方法一定配合await使用
  async postSave(comment, pComment) {
    // 如果不是博主本人发的才通知
    if (comment.mail != MY_EV_VAR.authorEmail) {
      
      // 使用axios发送post请求
      const formData = new URLSearchParams(); // 转载数据
      // 将要发送的信息格式化好后装载到POST参数中
      if (pComment == undefined) {
        formData.append('msg', `💬 ${MY_EV_VAR.siteName} 有新评论啦\n${comment.nick} 说:\n${comment.comment}\n评论地址:\n${MY_EV_VAR.siteURL + comment.url}`);
      } else {
        formData.append('msg', `💬 ${MY_EV_VAR.siteName} 有新评论啦\n${comment.nick} 回复 ${pComment.nick} 的内容:\n${pComment.comment}\n说:\n${comment.comment}\n评论地址:\n${MY_EV_VAR.siteURL + comment.url}`);
      }
      // 给QMsg发送请求
      await axios.post(`${MY_EV_VAR.qMsgApi}/${MY_EV_VAR.qMsgKey}`, formData);
    };
  },
});
