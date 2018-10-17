<template>
   <div class='index-page'> 
       <div>
          <div v-for='(item, index) in bandList' :key='index'>
            <h5 class='head-one' :ref="'a'+index">{{item.title}}</h5>
            <div v-for='(value, index) in item.list' :key='index'>
                <div class='val-one' @click='showType(value.MasterID)'>
                    <img :src='value.CoverPhoto' class='img'/>
                    <span>{{value.Name}}</span>
                </div>
            </div>
        </div>
       </div>
       <loading v-if='LOADING'/>
        <div class='title'>
        <p v-for='(item, index) in bandList' :key='index' @touchstart="touchstart(index,$event)" @touchmove='touchmove' @touchend='touchend'>{{item.title}}</p>
        </div>
        <div v-if='SHOWTYPE' :class="isA?'carType animation':'carType animationTwo'" >
            <div v-for='(item, index) in markList' :key='index'>
                <h5 class='head-one'>{{item.GroupName}}</h5>
                <div v-for='(value, index) in item.GroupList' :key='index'>
                   <router-link :to="{path:'/detail', query:{SerialID:value.SerialID}}">
                     <div class='carType-one'>
                        <img :src='value.Picture' class='carType-img'/>
                        <p class='carP'><span>{{value.AliasName}}</span><span style='color:#f00;'>{{value.DealerPrice}}</span></p>
                    </div>
                   </router-link>
                </div>
            </div>
        </div>
   </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import bScroll from 'better-scroll'
import loading from '../components/loading'
export default {
    name: 'index',
    data(){
       return{
           LOADING: true,
           SHOWTYPE: false,
           isA:false,
           id:0,
           start:0
       }
    },
    components:{
        loading
    },
    computed: {
      ...mapState({
          bandList: state=>state.index.getBrandList
      }),
      markList () {
          return this.$store.state.index.getMakeList
      }
    },
    methods: {
        ...mapActions({
            getBrandList: 'index/getBrandList'
        }),
        showType(id){
           this.isA= false
           this.$store.dispatch('index/getCarType',id),
           this.SHOWTYPE = true
        },
        scrollList(){
            console.log(2)
            this.scroll=new bScroll('.index-page', {
                click:true,
                probeType: 2
            })
        },
        touchstart(id,e){
            console.log(id)
           this.id=id
           this.start=e.changedTouches[0].clientY
        },
        touchmove(e){
            console.log(1)
            let newId= this.id+parseInt((e.changedTouches[0].clientY-this.start)/e.target.clientHeight)
            if(newId < 0){
                newId = 0
            }
            if(newId > 20){
                newId = 20
            }
            this.scroll.scrollToElement(this.$refs['a'+newId][0])
        },
        touchend(e){
             let newId= this.id+parseInt((e.changedTouches[0].clientY-this.start)/e.target.clientHeight)
            if(newId < 0){
                newId = 0
            }
            if(newId > 20){
                newId = 20
            }
            this.scroll.scrollToElement(this.$refs['a'+newId][0])
        },
        clearRight(){
           function GetSlideAngle(dx, dy) {
              return Math.atan2(dy, dx) * 180 / Math.PI;
          }
 
          //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
          function GetSlideDirection(startX, startY, endX, endY) {
              var dy = startY - endY;
              var dx = endX - startX;
              var result = 0;
 
              //如果滑动距离太短
              if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                  return result;
              }
 
              var angle = GetSlideAngle(dx, dy);
              if(angle >= -45 && angle < 45) {
                  result = 4;
              }else if (angle >= 45 && angle < 135) {
                  result = 1;
              }else if (angle >= -135 && angle < -45) {
                  result = 2;
              }
              else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                  result = 3;
              }
 
              return result;
          }
 
          //滑动处理
          var startX, startY;
          document.addEventListener('touchstart',(ev) => {
              startX = ev.touches[0].pageX;
              startY = ev.touches[0].pageY;  
          }, false);
          document.addEventListener('touchend',(ev) => {
              var endX, endY;
              endX = ev.changedTouches[0].pageX;
              endY = ev.changedTouches[0].pageY;
              var direction = GetSlideDirection(startX, startY, endX, endY);
              switch(direction) {
                  case 4:
                      this.isA= true
                      console.log(this.isA)
                      break;
                  default:           
              }
          }, false);
        }
    },
    mounted() {
        this.getBrandList()
        this.clearRight()
        this.scrollList()
    },
    updated() {
        this.LOADING = false
    },
}
</script>
<style>
*{
    box-sizing: border-box;
}
a{
    text-decoration: none;
}
.carType{
    overflow: scroll;
    position: fixed;
    z-index: 100;
    width: 75%;
    height: 100%;
    right:0 ;
    top: 0;
    background:#fff;
}
.animation{
    transform: translateX(100%);
    transition: all 1s;
    left: 100px;
}
.animationTwo{
    transform: translateX(-100%);
    transition: all 1s;
    left: 100%; 
}
.index-page{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.title{
    position: fixed;
    right: 5px;
    top: 50%;
    transform:translateY(-50%);
}
.title p{
    color: #999;
    font-size: 10px;
    margin: 3px 0;
}
.head-one{
    padding: 0 10px;
    line-height: 16px;
    width: 100%;
    background: #eee;
    color: #999;
    font-weight: normal;
    font-size:10px;
    box-sizing: border-box;
}
.img{
    width: 32px;
    height: 32px;
    margin-right:15px;
}
.val-one{
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    font-size: 13.5px;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
    margin: 0 10px;
    box-sizing: border-box;
}
.carType-one{
    display: flex;
    align-items: center; 
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #ddd;
    margin: 5px 10px;
    box-sizing: border-box;
    font-size:12px;
}
.carType-img{
    width: 100px;
    height: 60px;
    margin-right:10px;
}
.carP{
    flex:1;
    display: flex;
    flex-direction: column;
}
.carP span{
    line-height: 30px;
}
</style>
