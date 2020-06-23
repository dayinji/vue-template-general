/* eslint-disable */
const axios = require('axios').default;
axios.defaults.withCredentials = true;

declare var wx: any;
declare var _hmt: any;

function initWXShare(inputUrl: string, shareTitle: string, shareDesc: string) {
    // Get Shader JDK
    axios({
        method: 'get',
        url: "https://api.badprinter.com/api/weixin/config",
        responseType: 'json',
        params: {
            url: inputUrl
        },
        crossDomain: true,
    }).then((res: any) => {
        let data = res.data
        console.log(data)
        wx.config({
            debug: false,
            appId: data["appId"], 
            timestamp: data["timestamp"], 
            nonceStr: data["nonceStr"], 
            signature: data["signature"], 
            jsApiList: [
                // 新接口在安卓端神坑！！
                // "updateAppMessageShareData", 
                // "updateTimelineShareData",
                'onMenuShareAppMessage',  //旧的接口，即将废弃
                'onMenuShareTimeline'] //旧的接口，即将废弃] 
        });
    })
    wx.ready(function(){
        changeShareTitle(inputUrl, shareTitle, shareDesc)
    });
}
        
function changeShareTitle(inputUrl:string, shareTitle:string, shareDesc:string) {
    wx.onMenuShareAppMessage({
        title: shareTitle, 
        desc:  shareDesc, 
        link: inputUrl,
        imgUrl: process.env.PUBLIC_URL + `/images/cover.jpg`,
        success: function () {
            _hmt.push(['_trackEvent', "share", "AppMessage"]);
        }
    });
    wx.onMenuShareTimeline({
        title: shareTitle, 
        desc:  shareDesc, 
        link: inputUrl,
        imgUrl: process.env.PUBLIC_URL + `/images/cover.jpg`,
        success: function () {
            _hmt.push(['_trackEvent', "share", "Timeline"]);
        }
    });
}

export  {
    initWXShare, 
    changeShareTitle
}