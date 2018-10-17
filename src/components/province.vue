<template>
  <div class='Province'>
    <div class="Province-header">
      <h6>自动定位</h6>
      <span>北京</span>
    </div>
    <div class="Province-List">
      <h6>省市</h6>
      <p v-for="(item,index) in CityList" @click='sendprovinceid(item.CityID)'><span>{{item.CityName}}</span><span>></span></p>
    </div>
    <div :class="isShow?'mask active':'mask'">
      <div :class="isShow?'mask-List mask-List-active':'mask-List'">
        <span v-for='(item,index) in CityEveryList' @click='CityEvery(item)'>{{item.CityName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    name:'Province',
    data(){
      return {
        isShow:false
      }
    },
    computed: {
      ...mapState({
        CityEveryList: state => state.question.provinceList,
        CityList: state => state.question.cityAlllist,
        carId: state => state.question.carId
      })
    },
    methods: {
      ...mapActions({
        getCityAlllist:'question/getCityAlllist',
        getProvince:'question/getProvince',
        getQuestionInfo: 'question/getQuestionInfo'
      }),
      sendprovinceid(id){
        this.isShow = true
        this.getProvince(id)
      },
      ...mapMutations({
        updataisHidden:'question/updataisHidden',
        updataShowCity:'question/updataShowCity'
      }),
      CityEvery(item){
        this.isShow = false
        this.updataisHidden()
        this.updataShowCity(item.CityName)
        this.getQuestionInfo({carId:this.carId,cityId:item.CityID})
      }
    },
    mounted() {
      this.getCityAlllist()
    },
  }
</script>

<style lang="scss">
  .Province{
    box-sizing:border-box;
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:#fff;
    z-index:999;
    display: flex;
    flex-direction: column;
    h6{
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      padding-left: 10px;
      background: #f4f4f4;
      font-weight:400;
    }
    .Province-header{
      box-sizing:border-box;
      width:100%;
      span{
        width:100%;
        height:30px;
        line-height:30px;
        padding-left:20px;
        font-size:12px;
      }
    }
    .Province-List{
      box-sizing:border-box;
      overflow-y:auto;      
      width:100%;
      p{
        width:100%;
        display:flex;
        justify-content:space-between;
        border-bottom:solid 1px #ccc;
        height:32px;
        line-height:32px;
        padding-left:20px;
        font-size:12px;
        span{
          &:nth-child(2){
            margin-right:40px;
            font-size:16px;
            color: #ccc;
          }
        }
      }
    }
  }
  .mask{
    box-sizing:border-box;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    position:absolute;
    top:0;
    left:0;
    display:none;
    .mask-List{
      box-sizing:border-box;
      width:70%;
      height:100%;
      overflow-y:auto;
      background:#fff;
      position:absolute;
      top:0;
      right:0;
      transform:translate3d(100%,0,0);
      transition:all 2s 1s;
      span{
        width:100%;
        height:30px;
        font-size:12px;
        line-height:30px;
        border-bottom:solid 1px #ccc;
        display:block;
        padding-left:10px;
      }
    }
  }
  .active{
    display:block;
  }
  .mask-List-active{
      transform:translate3d(0,0,0)!important;
  }
</style>