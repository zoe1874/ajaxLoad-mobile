/**
 * @description:
 * @author: Zhen.li
 * @Date: 2015-10-02 下午10:08
 */

var third_party = window.jQuery ||  window.Zepto;
(function ($) {
    "use strict";

    /**
     * @param opt
     */
    var ajaxPage = function (opt) {
        var w = this;
        var defaultOpt = {
            el:$('#j_ajaxList'),//list的$dom元素
            moreBtn:$('#j_moreBtn'),//按钮
            url:'',//ajax 必填
            isAuto:true,//是否下拉自动刷新,false为点击按钮加载
            startPage:2, //开始加载是第几页
            pData:{}, //发送请求时所需参数
            ajaxType:'get', //发送请求type
            page:'page'//翻页参数名称

        };

        w.opt = $.extend({}, defaultOpt,opt);
        w.init();
    };

    ajaxPage.prototype = {
        init:function(){
            var w = this;
            //console.log(w.opt);
            w.curPage = w.opt.startPage;
            w.initHTML();
            w.initEvent();
        },
        initHTML:function(){
            var w = this;
            w.hasItem();

        },
        initEvent:function(){
            var w = this;
            var pData = w.opt.pData;
            if(w.opt.isAuto){
                w.scroll();
            }else{
                w.opt.moreBtn.bind('click', function (e) {
                    e.preventDefault();
                    w.ajaxLoad(w.opt.url, w.opt.type, pData);
                })
            }

        },
        /**
         * 一屏是否已经显示完item
         */
        hasItem: function () {
            var w = this;
            var winH = $(window).height(),
                docH = $(document).height();
            if(docH <= winH){
                w.opt.moreBtn && w.opt.moreBtn.remove();
            }
        },
        /**
         * 截流处理,延迟一段时间在进行操作
         * @param fn
         * @param delay
         * @returns {Function}
         */
        throttle:function(fn, delay){
            var timer = null;

            return function(){
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(context, args);
                }, delay);
            }
        },
        /**
         * 滚动事件
         */
        scroll: function () {
            var w = this;
            var winH = $(window).height();

            window.onscroll = w.throttle(function(){
                var y = $(window).scrollTop(),
                    docH = $(document).height();
                /**
                 * isBottom
                 */
                if(y+winH >= docH){
                    w.scrollDeal();
                }
            }, 50);

        },
        /**
         * 滚动处理
         */
        scrollDeal:function(){
            var w = this;

            w.ajaxLoad(w.opt.url, w.opt.type, w.opt.pData)
        },
        /**
         *
         * @param url
         * @param type
         * @param data
         */
        ajaxLoad: function (url,type,data) {
            var w = this;
            //console.log(w.curPage)
            data[w.opt.page] = w.curPage;

            w.opt.moreBtn.html('正在加载...');
            $.ajax({
                url:url,
                type:type,
                data: data,
                dataType:'json',
                success: function (reData) {
                    w.success_fn(reData);
                },
                error: function (reData) {
                    w.error_fn(reData);
                }
            })
        },

        /**
         *
         * @param reData
         */
        success_fn:function(reData){
            var w = this;

        },

        error_fn:function(reData){
            var w = this;
            w.opt.moreBtn.html('加载失败');
            console.log('加载失败');

        },

        /**
         * 设置当前请求页码,一般接口返回
         */
        setCurPage:function(page){
            var w = this;

            w.curPage = page;
        }

    };
    window.global = {};
    window.global.ajaxLoad = ajaxPage;
})(third_party);