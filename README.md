# ajaxLoad-mobile
base on jQuery or Zepto

pData:ajax请求时需要额外的参数,json结构
page:翻页时的页码参数,如page,pge
success_fn:成功之后的处理,列表的渲染在此处,对返回值格式没有要求,
注意需要在返回成功后重新设置当前页码setCurPage

暂未实现对跨域支持;