<template>
  <div class="card" ref="card" :style="{ backgroundColor: bgcolor }">
    <img class="logo" src="../images/nnu_pic.png" alt="NNU Pic" />

    <img :src="QRCurl" alt="QR Code" class="qrcode" @load="LoadImg" />
    <div class="password">{{ code }}</div>
  </div>
  <!-- <el-button type="primary" @click="download">下载</el-button>
  <el-button type="primary" @click="generateCode">随机生成</el-button> -->
</template>

<script>
/* eslint-disable */
import { ref, toRef, watch } from "vue"
import { useStore } from "vuex"
import html2canvas from "html2canvas"

export default {
  name: "PassPic",
  setup() {
    const store = useStore()
    const card = ref(null)
    const code = toRef(store.state, "code")
    const QRCurl = toRef(store.state, "QRCurl")
    const bgcolor = toRef(store.state, "bgcolor")

    const LoadImg = () => {
      html2canvas(card.value).then((canvas) => {
        const imgUrl = canvas.toDataURL("image/png")
        store.dispatch("getImgUrl", imgUrl)
        console.log(code.value)
      })
    }
    watch(bgcolor, (newVal, oldVal) => {
      console.log("colorChange")
      setTimeout(() => {
        html2canvas(card.value).then((canvas) => {
          const imgUrl = canvas.toDataURL("image/png")
          store.dispatch("getImgUrl", imgUrl)
          console.log(code.value)
        })
      }, 1000)
    })
    const convertToImage = () => {
      if (card.value) {
        html2canvas(card.value).then((canvas) => {
          const imgUrl = canvas.toDataURL("image/png")
          store.dispatch("getImgUrl", imgUrl)
        })
      } else {
        console.log("card is null")
      }
    }
    const download = () => {
      if (card.value) {
        html2canvas(card.value).then((canvas) => {
          let link = document.createElement("a")
          link.download = "image.png"
          link.href = canvas.toDataURL("image/png")
          link.click()
        })
      }
    }
    const generateCode = () => {
      // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      // const letterPart =
      //   letters[Math.floor(Math.random() * letters.length)] +
      //   letters[Math.floor(Math.random() * letters.length)]
      const numberPart = Math.floor(Math.random() * 40000) + 10000
      code.value = "XS" + numberPart
      // console.log(code.value)
      generateQRCode(code.value)
    }

    const QRCode = require("qrcode")
    const generateQRCode = async (text) => {
      try {
        const options = {
          margin: 1,
          scale: 16, // 设置边框大小为 0 个 QR 码模块
        }
        QRCurl.value = await QRCode.toDataURL(text, options)
      } catch (err) {
        console.error(err)
      }
    }
    return {
      card,
      code,
      QRCurl,
      bgcolor,
      convertToImage,
      download,
      generateCode,
      LoadImg,
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  position: relative;
  width: 600px;
  height: 400px;
  background-color: #bd4b59;
  display: flex;
  /* 设置为 flex，以便使用 flexbox 布局 */
  flex-direction: column;
  /* 设置主轴方向为垂直方向 */
  justify-content: center;
  /* 在主轴方向上居中对齐 */
  align-items: center;
}
.card img.logo {
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-color: rgb(48, 0, 181); */
  /* 设置为 absolute，使得 img 可以相对于最近的 relative 父元素定位 */
  top: 0;
  /* 定位到顶部 */
  left: 0;
  /* 定位到右侧 */
}
.card img.qrcode {
  width: 180px;
  /* 设置宽度为父元素的 50% */
  height: 185px;
  /* 设置高度为父元素的 50% */
  margin-top: 50px;
}

.card div.password {
  position: absolute;
  color: rgb(0, 0, 0);
  /* 设置文本颜色为黑色 */
  font-family: "Times New Roman", Times, serif;
  /* 设置字体为新罗马 */
  text-align: center;
  font-weight: bold;
  bottom: 8px;
  letter-spacing: 5px;
  font-size: 55px;
  padding-left: 18px;
}
</style>
