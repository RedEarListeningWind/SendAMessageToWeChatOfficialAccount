auto.waitFor();

/*
 *作者: 赤耳听风
 *发布平台:  酷安
 * 发信息至微信公众号 V1.0
 *完成时间:  2020.8.12  11:43
 *新版特性
 *1.发送自定义信息至指定微信公众号
 *
 *    #GitHub
 * https://github.com/RedEarListeningWind/SendAMessageToWeChatOfficialAccount.git
 *
 *    #QQ群
 * 1102812451
 *
 *    #更新
 * 关于 回复关键词 时间有限，还没有做出来。
 * 做出来以后会发到QQ群里。
 * 
 *    #声明
 *当你第一次开始使用本人所提供的任何软件及资源的那一刻起就将被视为对本声明全部内容的认可。
 *同时您必须认可上述免责条款，方可使用本软件及资源。
 *如有任何异议，建议立刻删除本软件及资源并且停止使用
 *因使用本脚本而引致的任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其所造成的任何损失，本人概不负责，亦概不承担任何民事或刑事法律责任。
 *利用本软件所做出的任何软件作有品，和本人无关.
 */


var PageSwitchingCooling = 800;    //页面切换冷却时间 1s=1000ms
var SendsOutContent = ["666", "777"];
var WeChatOfficialAccountName = "轻安卓";


restart:
    for (var i = 0; i < 3; i++) {
        launchApp("微信");
        sleep(3000);

        while (currentActivity() != "com.tencent.mm.ui.LauncherUI") {
            back();
            sleep(PageSwitchingCooling * 3 / 4);
            if (currentPackage() != "com.tencent.mm") {
                if (i >= 2) {
                    exit();
                } else {
                    continue restart;
                }
            }
            sleep(PageSwitchingCooling / 4)
        }
        if (currentActivity() == "com.tencent.mm.ui.LauncherUI") {
            break restart;
        }
    }


var mailList = depth(12).text("通讯录").findOne().bounds();
click(mailList.centerX(), mailList.centerY());


desc("搜索").findOne().click();
waitForActivity("com.tencent.mm.plugin.fts.ui.FTSMainUI");
sleep(PageSwitchingCooling);


depth(13).text("公众号").findOne().click();
//var officialAccount = depth(13).text("公众号").findOne().bounds();
//click(officialAccount.centerX(),officialAccount.centerY())


waitForActivity("com.tencent.mm.plugin.webview.ui.tools.fts.FTSSearchTabWebViewUI");
sleep(PageSwitchingCooling);
depth(9).text("取消").findOne().click();
//var cancel = depth(9).text("取消").findOne().bounds();
//click(cancel.centerX(),cancel.centerY())


waitForActivity("com.tencent.mm.plugin.fts.ui.FTSMainUI");
setText(WeChatOfficialAccountName);
var officialAccountName = depth(14).text(WeChatOfficialAccountName).findOne().bounds();
click(officialAccountName.centerX(), officialAccountName.centerY());


/*
//事实上，32到82行代码，都可以简化为下面这几行
context.startActivity(app.intent({
      action: "VIEW",
      className:"com.tencent.mm.ui.LauncherUI",
      packageName:"com.tencent.mm",
      extras: {
          LauncherUI.From.Biz.Shortcut": true,
          LauncherUI.Shortcut.Username": "shortcut_" + value
      //可惜的是换一个微信号就不行了，主要是上面这一行的value随着微信号的变化而变化。如果你有能力找到他的生成方法，请大佬告诉我一下。
      }
    }).setFlags(335544320));
*/

waitForActivity("com.tencent.mm.ui.chatting.ChattingUI");
sleep(PageSwitchingCooling);
if (depth(13).desc("消息").exists()) {
    var news = depth(13).desc("消息").findOne().bounds();
    click(news.centerX(), news.centerY());
} else if (depth(13).desc("服务按钮").exists()) {
    toastLog("服务按钮");
} else {
    toastLog("未知BUG");
    exit();
}
sleep(PageSwitchingCooling);


for(var i = 0;SendsOutContent.length > i;i++){
    SendOut(SendsOutContent[i]);
}


function SendOut(content) {
    setText(content);
    sleep(PageSwitchingCooling / 2);


    depth(18).text("发送").findOne().click();
    //var sendOut = depth(18).text("发送").findOne().bounds();
    //click(sendOut.centerX(), sendOut.centerY());
}


sleep(500);