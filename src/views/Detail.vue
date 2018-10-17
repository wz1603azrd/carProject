<template>
   <div class='detail-page'>
    <div class='content'>
       <div class='detail-img'>
         <router-link :to='{path:"/img", query: {SerialID: this.$route.query.id}}'><img :src='detailList.CoverPhoto'/></router-link>
         <span class='count'>{{detailList.pic_group_count}}张照片</span>
      </div>
      <div class='info'>
        <p>{{detailList.market_attribute && detailList.market_attribute.dealer_price}}</p>
        <p>指导价{{detailList.market_attribute && detailList.market_attribute.official_refer_price}}</p>
        <div class='action'>
           <button @click='clickbut(129758)'>{{detailList.BottomEntranceTitle}}</button>
        </div>
      </div>
      <div class='car-list'>
         <div class="c-type">
           <span class="list-span"v-for="(item,index) in topList" @click="filterCar(index)">{{item}}</span>
        </div>
        <div v-for="(key,index) in obj">
           <p>{{index}}</p>
           <ul>
              <li  v-for="(vaule,k) in obj[index]">
                <p>{{vaule.market_attribute.year}} 款 {{vaule.car_name}}</p>
                <p>{{vaule.horse_power}}马力{{vaule.gear_num}}档{{vaule.trans_type}}</p> 
                <p><span>指导价 {{vaule.market_attribute.dealer_price_max}}</span> <span>{{vaule.market_attribute.dealer_price_min}}起</span></p> 
                <button data-id="121254" data-hover="hover" @click='clickbut(vaule.car_id)'>询问底价</button>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <div class='bottom' @click='clickbut(129758)'>
       <p>询问底价</p>
       <p>本地经销商为你报价</p>
    </div>
    <loading v-show='LOADING' />
   </div>
</template>
<script>
   import loading from '../components/loading'
   import province from '../components/province'
   import { mapState, mapActions,mapMutations } from 'vuex'
   export default {
       name: 'deatil',
       data() {
           return{
               LOADING: true
           }
       },
       computed: {
          ...mapState({
              detailList: state=>state.detail.detailList,
              obj: state=>state.detail.obj,
              topList: state=>state.detail.topList
          })
       },
       components: {
          loading
       },
       mounted() {
           this.getData()
       },
       updated() {
           this.LOADING = false;
       },
       methods: {
           ...mapActions({
               getDetailList: 'detail/getDetailList'
           }),
           ...mapMutations({
               filter: 'detail/filter'
           }),
           getData(){
               let id= this.$route.query.SerialID
               this.getDetailList(id)
           },
           filterCar(index){
               this.filter(index)
           },
           clickbut(id){
               console.log(id)
               this.$router.push({
                   path:"/quotation",
                   query:{carId:id}
               })
           }
       }
   }    
</script>
<style>
*{
    font-size:12px;
}
.content{
    width: 100%;
    overflow: scroll;
    display:flex;
    flex-direction:column;
}
.car-list>div>p {
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #999;
    background: #f4f4f4;
}
.car-list ul:last-child {
    border-bottom: 5px solid #f4f4f4;
}
.car-list ul {
    background: #fff;
}
.car-list ul li {
    padding: 0 10px;
    border-bottom: 9px solid #f4f4f4;
    overflow: hidden;
}
.car-list div:last-child{
 margin-bottom:45px;
}
.car-list ul li p:first-child {
    padding: 13px 0 9px;
    font-size: 12px;
    line-height: 1;
    color: #3d3d3d;
}
.car-list ul li p:nth-child(2) {
    color: #bdbdbd;
    font-size: 12px;
}
.car-list ul li p:nth-child(3) {
    text-align: right;
    padding-bottom: 5px;
    font-size: 12px;
    color: #818181;
}
.car-list ul li p:nth-child(3) span:nth-child(2) {
    font-size: 12px;
    color: #ff2336;
    margin-left: 5px;
}
.car-list ul li button {
    border: none;
    border-top: 1px solid #eee;
    width: 110%;
    height: 40px;
    font-size: 12px;
    color: #00afff;
    background: #fff;
    font-weight: 500;
    margin-left: -15px;
}
.car-list .c-type {
    border-top: 8px solid #f4f4f4;
    padding: 0 15px;
    font-size: 12px;
    height: 35px;
    line-height: 35px;
    background: #fff;
}
.car-list .c-type span {
    padding-right: 23px;
    font-size:12px;
}
.active{
    color:blue;
}
.bottom{
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 50px;
    color: #fff;
    display:flex;
    align-items: center;
    flex-direction: column;
}
.bottom p:first-child {
    font-size: 12px;
    margin-top: 6px;
    font-weight: 500;
}
.bottom p:nth-child(2) {
    font-size: 12px;
}
.detail-page,.content{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
}
.detail-img {
    width:100%;
    position: relative;
}
.detail-img img{
    width:100%;
    margin-top: -43px;
}
.detail-img span{
    position: absolute;
    bottom: 30px;
    right: 15px;
    color: #fff;
    padding: 2px 8px;
    border-radius: 10px;
    background: rgba(0,0,0,.6);
    font-size: 12px;
}
.info{
    padding: 18px 10px 10px;
    background: #fff;
    position: relative;
    margin:0;
}
.info p:first-child {
    font-size: 16px;
    color: red;
    font-weight: 500;
}
.info p {
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info p:nth-child(2) {
    font-size: 12px;
    color: silver;
}
.info p {
    max-width: 170px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.action{
    padding-top: 10px;
    justify-content: space-between;
    width: 50%;
    position: absolute;
    right: 5px;
    top: 10px;
}
.action button{
    width: 100%;
    background: #00afff;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
    height: 35px;
    border: none;
    box-sizing: border-box;
}
</style>

