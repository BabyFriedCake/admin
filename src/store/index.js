import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state, xmlhttp;
// xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         state = eval('(' + xmlhttp.responseText + ')')
//     } else {
//         state = { serverIP: 0 }
//     }
// }
// xmlhttp.open('GET', 'http://172.27.108.82/hapi/api/login', false)
// xmlhttp.send()
// console.log(state)
export default new Vuex.Store({
    state
})
