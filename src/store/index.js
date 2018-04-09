import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state={
    rootdept:null,
    getAll:false
};

export default new Vuex.Store({
    state,
    mutations:{
        setState(state,params){
            state[params.field] = params.data;
        }
    },
    actions:{
        setState(context,params){
            context.commit(params);
        }
    },
    getters:{
        rootdept:state=>state.rootdept,
        getAll:state=>state.getAll
    }
})
