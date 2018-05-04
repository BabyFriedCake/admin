import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var state={
    rootdept:{
        id:0,
        flag:true
    },
    memberEmail:"",
    currentDeptName:"",
    memberUpdate:false,
    getAll:false,
    tempMember:{
        userName: "",
        userEmail: "www",
        userPhone: "",
        userPassword: "",
        userRealName: "",
        departmentId:"",
        deptName:""
      },
      enterpriseInfo:{
        flag:true
      },
      entSettings:{
        bizCard:"",
        bizEnglishCard:"",
        bizCardPicture:"",
        defaultStorageCapacity:"",
        domainName:"",
        userQuotas:1,
        validIpaddress:"",
        domainName:"",
        maxStorageCapacity:0,
        flag:true
      },
};

export default new Vuex.Store({
    state,
    mutations:{
        setState(state,params){
            state[params.field] = params.data;
        },
        setStateWithSessionStorage(state,params){
            state[params.field] = params.data;
            sessionStorage.setItem(params.field,JSON.stringify(params.data));
        }
    },
    actions:{
        setState(context,params){
            context.commit(params);
        }
    },
    getters:{
        rootdept:state=>state.rootdept,
        getAll:state=>state.getAll,
        memberUpdate:state=>state.memberUpdate,
        tempMember:state=>state.tempMember,
        getItemWithSessionStorage:(state)=>(field)=>{
            if(typeof(state[field])=='undefined' || state[field].flag){
                let itemJsonStr = sessionStorage.getItem(field);
                let obj = JSON.parse(itemJsonStr);
                return obj?obj:state[field];
            }else{
                return state[field];
            }
        }
    }
})
