// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    imgUrl: '',
    code: '',
    QRCurl: '',
    bgcolor: ''
  },
  mutations: {
    setImgUrl(state, imgUrl) {
      state.imgUrl = imgUrl
    },
    setCode(state, code) {
      state.code = code
    },
    setQRCurl(state, QRCurl) {
      state.QRCurl = QRCurl
    },
    setBgcolor(state, bgcolor) {
      state.bgcolor = bgcolor
    }
  },
  actions: {
    getImgUrl({ commit }, imgUrl) {
      commit('setImgUrl', imgUrl)
    },
    getCode({ commit }, code) {
      commit('setCode', code)
    },
    getQRCurl({ commit }, QRCurl) {
      commit('setQRCurl', QRCurl)
    },
    getBgcolor({ commit }, bgcolor) {
      commit('setBgcolor', bgcolor)
    }
  }
})