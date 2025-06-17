const Application = require('@waline/vercel');
const axios = require('axios');

const MY_EV_VAR = {
  // QMsg酱的key
  qMsgKey: "a209384dfac5a306b283c2aa9d76a440",
  // 作者邮箱，如果是你自己回复的就不会推送到qq上了
  authorEmail: "2436378140@qq.com",
  // 网站名称
  siteName: "Nan0in_blog",
  // 网站地址
  siteURL: "https://nan0in27.cn",
  // QMsg酱消息发送接口地址
  qMsgApi: "https://qmsg.zendee.cn/send",
}

module.exports = Application({
  plugins: [],
  async postSave(comment, pComment) {
    // do what ever you want after comment saved
    if (comment.mail != MY_EV_VAR.authorEmail) {
      
      // 使用axios发送post请求
      const formData = new URLSearchParams(); // 转载数据
      // 将要发送的信息格式化好后装载到POST参数中
      if (pComment == undefined) {
        formData.append('msg', `💬 ${MY_EV_VAR.siteName} 有新评论啦\n${comment.nick} 说:\n${comment.comment}\n评论地址:\n${comment.url}`);
      } else {
        formData.append('msg', `💬 ${MY_EV_VAR.siteName} 有新评论啦\n${comment.nick} 回复 ${pComment.nick} 的内容:\n${pComment.comment}\n说:\n${comment.comment}\n评论地址:\n${comment.url}`);
      }
      // 给QMsg发送请求
      await axios.post(`${MY_EV_VAR.qMsgApi}/${MY_EV_VAR.qMsgKey}`, formData);
    };
  },
});
