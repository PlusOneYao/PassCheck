<template>
  <el-row :gutter="20" align="middle" class="row">
    <el-col :span="5">
      <el-button size="large" class="uniform-button" @click="download"
        >下载</el-button
      >
    </el-col>
  </el-row>
  <el-row :gutter="20" align="middle" class="row">
    <el-col :span="5">
      <el-button size="large" class="uniform-button" @click="generateCode"
        >随机生成</el-button
      >
    </el-col>
  </el-row>
  <el-row :gutter="20" align="middle" class="row">
    <el-col :span="5">
      <el-button size="large" class="uniform-button" @click="generatePass"
        >生成通行证</el-button
      >
    </el-col>
    <el-col :span="10">
      <el-input
        v-model="input"
        placeholder="输入通行证号码"
        @click="creatPic"
      />
    </el-col>
  </el-row>
  <el-row :gutter="20" align="middle" class="row">
    <el-col :span="12">
      <div style="display: flex">
        <el-select
          v-model="value"
          placeholder="选择颜色"
          style="width: 230px; margin-right: 20px"
          @change="changeColor"
        >
          <el-option
            v-for="item in colors"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <div class="flex items-center">
              <el-tag
                :color="item.value"
                style="margin-right: 8px"
                size="small"
              />
              <span :style="{ color: item.value }">{{ item.label }}</span>
            </div>
          </el-option>
          <template #tag>
            <el-tag v-for="color in value" :key="color.value" :color="color" />
          </template>
        </el-select>
        <el-color-picker v-model="color1" @change="ColorChangeByPicker" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable */
import { ref, onMounted } from "vue"
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  name: "ButtonList",
  setup() {
    const store = useStore()
    const code = ref("")
    const input = ref("")
    const imgUrl = computed(() => store.state.imgUrl)
    const color1 = ref("#bd4b59")
    const initial = () => {
      // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      // const letterPart =
      //   letters[Math.floor(Math.random() * letters.length)] +
      //   letters[Math.floor(Math.random() * letters.length)]
      const numberPart = Math.floor(Math.random() * 900000) + 100000
      code.value = "XS" + numberPart
      generateQRCode(code.value)
      store.dispatch("getCode", code.value)
    }

    onMounted(initial)

    const download = () => {
      let link = document.createElement("a")
      link.download = "image.png"
      link.href = imgUrl.value
      link.click()
    }
    const generatePass = () => {
      generateQRCode(input.value)
      store.dispatch("getCode", input.value)
    }

    const generateCode = () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      // const letterPart =
      //   // letters[Math.floor(Math.random() * letters.length)] +
      //   // letters[Math.floor(Math.random() * letters.length)]
      const numberPart = Math.floor(Math.random() * 500000) + 100000
      code.value = "XS" + numberPart
      generateQRCode(code.value)
      store.dispatch("getCode", code.value)
    }

    const QRCode = require("qrcode")
    const QRCurl = ref("")
    const generateQRCode = async (text) => {
      try {
        const options = {
          margin: 1,
          scale: 16, // 设置边框大小为 0 个 QR 码模块
        }
        QRCurl.value = await QRCode.toDataURL(text, options)
        store.dispatch("getQRCurl", QRCurl.value)
      } catch (err) {
        console.error(err)
      }
    }
    const value = ref([])
    const colors = [
      {
        value: "#bd4b59",
        label: "红色",
      },
      {
        value: "#9aa91b",
        label: "绿色",
      },
      {
        value: "#9077d2",
        label: "紫色",
      },
    ]
    colors.forEach((color) => {
      value.value.push(color.value)
    })
    const ColorChangeByPicker = (val) => {
      store.dispatch("getBgcolor", val)
    }
    const changeColor = () => {
      color1.value = value.value
      // console.log(color1.value)
      store.dispatch("getBgcolor", value.value)
    }
    return {
      input,
      colors,
      value,
      color1,
      download,
      generateCode,
      generatePass,
      changeColor,
      ColorChangeByPicker,
    }
  },
}
</script>

<style scoped>
.row {
  margin-bottom: 20px; /* 设置行之间的间隙为 20 像素 */
}
.uniform-button {
  width: 100px; /* 设置按钮的宽度 */
  height: 40px; /* 设置按钮的高度 */
}
</style>
