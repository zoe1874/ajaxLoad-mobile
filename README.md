# 移动端上传图片
整合百度的fex-webUploader,微信jssdk的移动端上传
依赖jquery,百度的fex-webUploader,jweixin-1.0.0.js
需要引入uploader.css

1. pData:ajax请求时需要额外的参数,json结构
2. page:翻页时的页码参数,如page,pge
3. success_fn:成功之后的处理,列表的渲染在此处,对返回值格式没有要求,注意需要在返回成功后重新设置当前页码setCurPage

## 说明
包括两部分内容:
1. 不包含UI部分,只是整合了两种上传方式,引入upload.base.min.js
2. 包含UI部分,UI交互同demo(参照医师认证),引入upload.ui.min.js

## 引入:
都需要单独引入依赖,jquery,webuploader,jweixin
支持全局引入和AMD引入,参照demo/index.html

## 使用
upload.base.min.js和upload.ui.min.js分别对应两个全局变量uploadBase和uploadUI
使用方法为配置参数,新建一个实例，然后调用实例方法,参照demo/index.html

### 部分参数说明:

主要分两部分参数:
1. webuploadConfig:fex-webUploader的参数配置,
具体参照[http://fex.baidu.com/webuploader/doc/index.html](http://fex.baidu.com/webuploader/doc/index.html)
2. wechatConfig:微信上传的一些配置
   * selectEl:{Seletor} 上传el同webuploadConfig的pick[id]
   * debug: {Boolean} 默认false,微信的调试开关
   * simUrl:{String} 默认'https://sim.dxy.cn/japi/js/sign/2', 不同公众号,id不同
   * count:{Number} 每次最多课选择几张图片, 默认9
   * isPreview{Boolean} true,是否需要预览
   
ui增加的参数:
    * prevList:{Seletor}, 默认'#j_prevList' 生成预览图列表的容器
    * delClass:{String}, 默认'j-prevDel' 删除预览图的class
    * filesDom:{$dom} , 默认 '$('#j_fileId')' 存放上传图片ids的input hidden