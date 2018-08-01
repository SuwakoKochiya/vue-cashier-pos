<template>
  <div class="left-nav-container">
    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <p>收银</p>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <p>店铺</p>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <p>商品</p>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <p>会员</p>
      </li>
      <li>
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <p>设置</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'LeftNav',
}
</script>


<style>
  .left-nav-container {
    float: left;
    width: 8%;
    height: 100%;
    background-color: #1d8ce0;
    color: #fff;
    font-size: 12px;
  }

  .iconfont {
    font-size: 24px;
  }

  .left-nav-container ul {
    height: 100%;
  }

  .left-nav-container ul li {
    padding: 15px;
    border-bottom: 1px solid #20a0ff;
    text-align: center;
    cursor: pointer;
  }
</style>

