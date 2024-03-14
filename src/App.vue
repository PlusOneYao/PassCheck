<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <PassPic />
      <p style="text-align: left">
        注:<br />1、打印尺寸为高5cm宽7.5cm <br />
        2、<a href="https://github.com/PlusOneYao/passCheck">开源代码</a><br />
      </p>
    </el-col>
    <el-col :span="10">
      <ButtonList />
    </el-col>
  </el-row>
</template>

<script>
import PassPic from "./components/PassPic.vue"
import ButtonList from "./components/ButtonList.vue"
export default {
  name: "App",
  components: {
    PassPic,
    ButtonList,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
