<template>
    <div class='question'>
       <header class='head'>
            <p>可向多个商家咨询最低价，商家及时回复</p> 
            <img src="img/icon-help.png">
       </header>
       <div class="content-page">
            <div class='content-img'>
                <img :src="priceList.details.serial.Picture">
                    <div class="flex-column">
                        <p>{{priceList.details.serial.AliasName}}</p>
                        <p>{{priceList.details.market_attribute.year}}款 {{priceList.details.exhaust_str}} {{priceList.car_name}}</p>
                    </div>
            </div>
            <div class="self-info">
                <p class="tip">个人信息</p> 
                <ul>
                    <li>
                        <span>姓名</span> 
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li> 
                    <li>
                        <span>手机</span>
                        <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li> 
                    <li>
                        <span>城市</span> 
                        <span @click="changeIshidden">{{cityInfo.CityName}}</span>
                    </li>
                </ul> 
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
            </div>
            <div class="Inquiry-detail-List">
               <p class='choose'>选择报价经销商</p>
                <div class="Inquiry-detail-List">
                    <ul>
                        <li v-for="(item,index) in priceList.list">
                        <input type="checkbox">
                        <div class="Inquiry-detail-List-middle">
                            <h5>{{item.dealerShortName}}</h5>
                            <p>{{item.address}}</p>
                        </div>
                        <div class="Inquiry-detail-List-right">
                            <span>{{parseInt(item.promotePrice)}}万</span>
                            <span>售{{item.saleRange}}</span>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
       </div>
       <div :class='isHidden?"Province-active":""'><Province/></div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import Province from '../components/province'
export default {
    name:'question',
    components:{
        Province
    },
    computed: {
        ...mapState({
            priceList: state=>state.question.questionInfo,
            isHidden: state => state.question.isHidden,
        })
    },
    mounted() { 
        console.log(this.$route.query.carId)
        this.getQuestionInfo({carId:this.$route.query.carId})
    },
    methods:{
       
        ...mapActions({
            getQuestionInfo: 'question/getQuestionInfo'
        }),
        ...mapMutations({
            updataisHidden: 'question/updataisHidden',
            updataCarId: 'question/updataCarId',
            updataAlertContent:'question/updataAlertContent'
        }),
        changeIshidden(){
           this.updataisHidden()
        }
    }
}
</script>
<style lang='scss'>
.Province-active{
    display:none;
  }
.self-info{
    width: 100%
}
.choose{
    width: 100%;
    line-height: 18px;
    font-size:12px;
    background:#eee;
    color:#999;
    box-sizing:border-box；
}
  .Inquiry-detail-List{
    width:100%;
    box-sizing:border-box;
    ul{ 
      background: #fff;
      box-sizing:border-box;
      width:100%;
      padding:0 10px;
      li{
        box-sizing:border-box;
        width:100%;
        display:flex;
        border-bottom:solid 1px #ccc;
        align-items:center;
        padding: 8px 0;
        justify-content:space-between;
        input{
          width: 14px;
          height: 14px;
          border-radius: 15px;
          border: 1px solid #ccc;
          outline:none;
        }
        .Inquiry-detail-List-middle{
            box-sizing:border-box;
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          padding:0 10px;
          h5{
            font-size:12px;
            font-weight:400;
            line-height:20px;
          }
          p{
            font-size:10px;
            color:#ccc;
          }
        }
        .Inquiry-detail-List-right{
          width:15%;
          display:flex;
          flex-direction:column;
          justify-content:space-around;
          span{
            font-size:12px;
            text-align:right;
            width:100%;
            &:nth-child(1){
            font-size:8px;
              line-height:20px;              
              color:red;
            }
            &:nth-child(2){
              color:#ccc;
              font-size:10px;
            }
          }
        }
      }
    }
  }
.tip {
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    background: #eee;
}
.self-info ul {
    background: #fff;
    padding: 0 10px;
}
.self-info>div {
    background: #fff;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 14px;
}
.self-info ul li {
    font-size: 12px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    color: #000;
}
.quotation button{
    font-size: 12px;
    color: #fff;
    width: 80%;
    background: #3aacff;
    height: 35px;
    border-radius: 5px; 
    border: none; 
}
.self-info ul li input {
    border:none;
    font-size: 12px;
    padding-right: 10px;
    width: 88%;
    text-align: right;
    box-sizing: border-box;
    color: #555;
}
.self-info ul li span:nth-child(2) {
    display: inline-block;
    width: 88%;
    color: #555;
    text-align: right;
    box-sizing: border-box;
}
.question{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.head{
    height: 30px;
    line-height: 30px;
    width: 100%;
    background: #79cd92;
    text-align: center;
    z-index: 99;
}
.head p{
    color: #fff;
    font-size: 12px;
    display: inline-block;
}
.head img{
    width: 6px;
    margin-left: 10px;
    vertical-align: -9%;
}
.content-page{
    flex:1;
    width: 100%;
    height: auto;
    background: #f4f4f4;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.content-img{
    background: #fff;
    padding: 16px 9px 12px;
    box-sizing: border-box;
    display:flex;
}
.content-img img{
    width: 115px;
    height: 70px;
    border: 1px solid #eee;
    box-sizing: border-box;
    border-radius: 5px;
}
.flex-column{
    margin-left: 10px;
    width: 230px;
}
.flex-column p:first-child {
    font-size: 12px;
    line-height: 1;
    margin-top: 5px;
}
.flex-column p:nth-child(2) {
    margin-top: 13px;
    font-size: 12px;
    line-height: 1.2;
    color: #333;
}
</style>