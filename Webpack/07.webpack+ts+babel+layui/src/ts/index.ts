import "../scss/index.scss";

$(document.body).append("hello world")
$(document.body).append("hello world")


layui.use(['form', 'layedit', 'laydate'], function () {
  var form = layui.form
    , layer = layui.layer
    , layedit = layui.layedit
    , laydate = layui.laydate;

  //日期
  laydate.render({
    elem: '#date'
  });
  laydate.render({
    elem: '#date1'
  });

  //创建一个编辑器
  var editIndex = layedit.build('LAY_demo_editor');

  //自定义验证规则
  form.verify({
    title: function (value: any) {
      if (value.length < 5) {
        return '标题至少得5个字符啊';
      }
    }
    , pass: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ]
    , content: function (value: any) {
      layedit.sync(editIndex);
    }
  });


  //监听提交
  form.on('submit(demo1)', function (data) {
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });

  //表单赋值
  layui.$('#LAY-component-form-setval').on('click', function () {
    form.val('example', {
      "username": "贤心" // "name": "value"
      , "password": "123456"
      , "interest": 1
      , "like[write]": true //复选框选中状态
      , "close": true //开关状态
      , "sex": "女"
      , "desc": "我爱 layui"
    });
  });

  //表单取值
  layui.$('#LAY-component-form-getval').on('click', function () {
    var data = form.val('example');
    alert(JSON.stringify(data));
  });

});