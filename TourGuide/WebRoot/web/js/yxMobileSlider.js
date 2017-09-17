(function($){
    $.fn.yxMobileSlider = function(settings){
        var defaultSettings = {
            width: 640, //容器宽度
            height: 320, //容器高度
            during: 5000, //间隔时间
            speed:30 //滑动速度
        }
        settings = $.extend(true, {}, defaultSettings, settings);
        return this.each(function(){
            var _this = $(this), s = settings;
            var startX = 0, startY = 0; //触摸开始时手势横纵坐标
            var temPos; //滚动元素当前位置
            var iCurr = 0; //当前滚动屏幕数
            var movestate = 0;//0 左移 由小到大 1 图片右移 由大到小
            var timer = null; //计时器
            var oMover = $("ul", _this); //滚动元素
            var oLi = $("li", oMover); //滚动单元
            var num = oLi.length; //滚动屏幕数
            var oPosition = {}; //触点位置
            var moveWidth = s.width; //滚动宽度
            //初始化主体样式
            _this.width(s.width).height(s.height).css({
                position: 'relative',
                overflow: 'hidden',
				margin:'0 auto'
            }); //设定容器宽高及样式
            oMover.css({
                position: 'absolute',
                left: 0
            });
            oLi.css({
                float: 'left',
                display: 'inline'
            });
            $("img", oLi).css({
                width: '100%',
                height: '100%'
            });

            //初始化焦点容器及按钮
            _this.append('<div class="focus"><div class="nums"></div></div>');
            var oFocusContainer = $(".focus");
            for (var i = 0; i < num; i++) {
                $(".nums", oFocusContainer).append("<span class='numsbtn'></span>");
                var dictext = $("img", oLi[i]).attr("alt");
                
                $("img", oLi[i]).after("<span class='imgSliderTitle'>"+dictext+"</span>");
                
                
            }
            var oFocus = $(".numsbtn", oFocusContainer);
            oFocusContainer.css({
                minHeight: $(this).find('.numsbtn').height() * 2,
                position: 'absolute',
                bottom: 0,
                background: '#000005',
                opacity:0.5,
                zIndex:2
            });
            $(".numsbtn", oFocusContainer).css({
                display: 'block',
                float: 'left',
                cursor: 'pointer'
            });
            $(".nums", oFocusContainer).width(oFocus.outerWidth(true) * num).css({
                position: 'absolute',
                right: 10,
                top: '50%',
                marginTop: -$(this).find('.numsbtn').width() / 2,
                zIndex:4
            });
            $(".imgSliderTitle").css({
                display:'block',
                width:'100%',
                position:'absolute',
                bottom:0,
                overflow:'hidden',
                zIndex:100,
                lineHeight:'100%',
                textAlign:'left',
                color:'#fff',
                textIndent:'1em'
            });
            $("a",oLi).css({
                display:'block',
            });
            oFocus.first().addClass("current");
            //页面加载或发生改变
           function imgSliderResize(){
                if (isMobile()) {
                    mobileSettings();
                    bindTochuEvent();
                }
                oLi.width(_this.width()).height(_this.height());//设定滚动单元宽高
                oMover.width(num * oLi.width());
                oFocusContainer.width(_this.width()).height(_this.height() * 0.15).css({
                });//设定焦点容器宽高样式

                $(".numsbtn", oFocusContainer).css({
                    height:oFocusContainer.height()*0.5,
                    width:oFocusContainer.height()*0.5
                });
                $(".nums", oFocusContainer).width(oFocus.outerWidth(true) * num).css({
                    top: '50%',
                    marginTop: -oFocusContainer.height()*0.25
                });
                $(".imgSliderTitle").css({
                    height:oFocusContainer.height()*0.5,
                    width:oFocusContainer.width()-$(".nums", oFocusContainer).width(),
                    fontSize:oFocusContainer.height()*0.5,
                    paddingBottom:oFocusContainer.height()*0.5,
                    marginBottom:-(oFocusContainer.height()*0.25)
                });
                _this.fadeIn(300);
                $("img", oLi).height(_this.height());
                $("a",oLi).height(_this.height()*0.85).width(_this.width()).css({
                    top:"0px",
                    zIndex:1
                });
            }
            $(window).bind('resize load',imgSliderResize());
            //页面加载完毕BANNER自动滚动
            autoMove();
            //PC机下焦点切换
            if (!isMobile()) {
                oFocus.hover(function(){
                    iCurr = $(this).index() - 1;
                    stopMove();
                    doMove();
                }, function(){
                    autoMove();
                })
            }
            //自动运动
            function autoMove(){
                timer = setInterval(doMove, s.during);
            }
            //停止自动运动
            function stopMove(){
                clearInterval(timer);
            }
            //运动效果
            function doMove(){
                  //图片右移 由大到小
                if(movestate){
                    iCurr-=1;
                    if(iCurr<=0)
                    {
                        iCurr=0;//防止移动端用户移动导致数组越界
                        movestate=0;
                    }
                }else{
                    iCurr+=1;
                    if(iCurr>=(num-1))
                    {
                        iCurr=num-1;
                        movestate=1;
                    }
                }
                doAnimate(-moveWidth * iCurr);
                oFocus.eq(iCurr).addClass("current").siblings().removeClass("current");
            }
            //绑定触摸事件
            function bindTochuEvent(){
                oMover.get(0).addEventListener('touchstart', touchStartFunc, false);
                oMover.get(0).addEventListener('touchmove', touchMoveFunc, false);
                oMover.get(0).addEventListener('touchend', touchEndFunc, false);
            }
            //获取触点位置
            function touchPos(e){
                var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
                for (var i = 0; i < l; i++) {
                    touch = touches[i];
                    tagX = touch.clientX;
                    tagY = touch.clientY;
                }
                oPosition.x = tagX;
                oPosition.y = tagY;
                return oPosition;
            }
            //触摸开始
            function touchStartFunc(e){
                clearInterval(timer);
                touchPos(e);
                startX = oPosition.x;
                startY = oPosition.y;
                temPos = oMover.position().left;
            }
            //触摸移动
            function touchMoveFunc(e){
                touchPos(e);
                var moveX = oPosition.x - startX;
                var moveY = oPosition.y - startY;
                if (Math.abs(moveY) < Math.abs(moveX)) {
                    e.preventDefault();
                    oMover.css({
                        left: temPos + moveX
                    });
                }
            }
            //触摸结束
            function touchEndFunc(e){
                touchPos(e);
                var moveX = oPosition.x - startX;
                var moveY = oPosition.y - startY;
                if (Math.abs(moveY) < Math.abs(moveX)) {
                    if (moveX > 0) {
                        iCurr--;
                        if (iCurr >= 0) {
                            var moveX = iCurr * moveWidth;
                            doAnimate(-moveX, autoMove);
                        }
                        else {
                            doAnimate(0, autoMove);
                            iCurr = 0;
                        }
                    }
                    else {
                        iCurr++;
                        if (iCurr < num && iCurr >= 0) {
                            var moveX = iCurr * moveWidth;
                            doAnimate(-moveX, autoMove);
                        }
                        else {
                            iCurr = num - 1;
                            doAnimate(-(num - 1) * moveWidth, autoMove);
                        }
                    }
                    oFocus.eq(iCurr).addClass("current").siblings().removeClass("current");
                }
            }
            //移动设备基于屏幕宽度设置容器宽高
            function mobileSettings(){
                moveWidth = $(window).width();
                var iScale = $(window).width() / s.width;
                _this.height(s.height * iScale).width($(window).width());
                oMover.css({
                    left: -iCurr * moveWidth
                });
            }
            //动画效果
            function doAnimate(iTarget, fn){
                oMover.stop().animate({
                    left: iTarget
                }, _this.speed , function(){
                    if (fn)
                        fn();
                });
            }
            //判断是否是移动设备
            function isMobile(){
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPod') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        });
    }
})(jQuery);
