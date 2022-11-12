var window = floaty.window(
    <vertical>
        <button id="start" >on</button>
        <button id="stop" >off</button>
    </vertical>
);
dw=device   .width
dh=device.height
window.setPosition(dw/4*3, dw/4*3)

if (!files.isFile("/sdcard/控制.txt")) {
    files.create("/sdcard/控制.txt");
};
var xx = files.read("/sdcard/控制.txt")
数组 = xx.split("\r\n")
toastLog(数组)
window.start.click(function () {
    threads.start(function () {
        
        while (1) {
            sleep(2000)
            try {
                //这里是发朋友圈没可发的退出的控件
                if (text("退出").visibleToUser().exists()) {
                    text("退出").findOnce().click()
                    sleep(2000)
                    back()
                    text("微信").visibleToUser().waitFor();
                    let a = text("微信").findOnce().bounds();
                    sleep(1000)
                    click(a.centerX(), a.centerY())
                    sleep(1000)
                }
                //消息界面返回到微信界面
                if (idContains("g1").visibleToUser().exists()) {
                    idContains("g1").findOnce().parent().click()
                }
         
                a = idContains("kmv").visibleToUser().find();
                toastLog("控件数量：" + a.size())
                let f = a[0].bounds()
                if (a) {
                    toastLog(f.centerX(), f.centerY())
                    click(f.centerX(), f.centerY())
                    // 检测是否在聊天界面
                    descContains("切换到按住说话").findOne(4000)
                    if (descContains("切换到按住说话").exists()) {
                        // 检查聊天内容的数组  下面一般不用改
                        try {
                            className("androidx.recyclerview.widget.RecyclerView").visibleToUser().waitFor();
                            var a = className("androidx.recyclerview.widget.RecyclerView").find();
                            控件数量 = a[0].childCount()
                            子控件 = a[0].child(控件数量 - 1).childCount()
                            toastLog(当前文本 = a[0].child(控件数量 - 1).child(子控件 - 1).child(1).child(0).child(0).text())
                            if (当前文本 == "" || 当前文本 == null) {
                                toastLog("啥也没有")
                                back()
                                continue
                            }
                        } catch (e) {
                            back()
                            toastLog("没有文字")
                            continue
                        }
                        sleep(1000)
                        back()
                        sleep(1000)
                        for (i = 0; i < 数组.length; i++) {
                            if (当前文本.includes(数组[i])) {
                               
                              
                                //点击发现 这个一般也不用改
                                text("发现").visibleToUser().waitFor();
                                let a = text("发现").findOnce().bounds();
                                click(a.centerX(), a.centerY())
                                sleep(1000)
                                //点击发现 这个一般也不用改
                                //下拉
                                swipe(502.6, 63, 531, 138, 500)
                                text("朋友圈").visibleToUser().waitFor();
                                let b = text("朋友圈").findOnce().bounds();
                                click(b.centerX(), b.centerY())
                                //长按相机按钮发送文本
                                idContains("by3").visibleToUser().waitFor();
                                sleep(2000)
                                if (idContains("by3").exists()) { toastLog("123") }
                                let c = idContains("by3").findOnce().bounds();
                                press(c.centerX(), c.centerY(), 2000)
                                sleep(1000)
                                //第一次启动相机发送文本可能要点我知道了 这一块第二次之后没有的话可以注释掉
                                text("我知道了").visibleToUser().findOne(3333);
                                if (text("我知道了").exists()) {
                                    toastLog("我知道了")
                                    let d = text("我知道了").findOnce().bounds();
                                    click(d.centerX(), d.centerY())
                                }



                                sleep(1000)
                                //发朋友圈 
                                textContains("发表").visibleToUser().waitFor();
                                if (textContains("发表").exists()) {
                                    toastLog("发表：" + 当前文本)
                                    setText(当前文本)
                                    sleep(2000)
                                    click("发表")
                                    sleep(2000)
                                    back()
                                    sleep(1000)
                                    idContains("f2s").visibleToUser().waitFor();
                                    sleep(2000)
                                    let a = idContains("f2s").findOnce().bounds();
                                    click(a.centerX(), a.centerY())
                                    sleep(1000)
                                }
                                break;
                            } else {
                            }
                        }
                    } else {
                        back()
                        continue
                    }
                }
            }
            catch (e) {
                toastLog(e.message)
            }
        }

    })
})
window.stop.click(function () {
    threads.start(function () {
        exit()
    })
})


setInterval(() => { }, 1000);


