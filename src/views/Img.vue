<template>
    <div class='imgPage'> 
          <img v-for="(item,index) in imgList" :key="index" :src="`${item.Url.replace('{0}',item.LowSize)}`"/>
    </div>
</template>
<script>
import  {mapState, mapActions,mapMutations} from 'vuex'
  export default {
      computed:{
          ...mapState({
            imgList:state => state.img.imgList,
            imgAllList:state=> state.img.imgAllList
          })
      },
      methods:{
         ...mapActions({
             getImgList: 'img/getCategoryImgList',
             upAllImgList:'img/getImageList'
         })
      },
      mounted() {
          this.getImgList({
              SerialID: 2593,
              ImageID:6
            
          }),
          this.upAllImgList({
              SerialID:4765,
              ImageID:6 
          })
      }
  }  
</script>
<style>
    .imgPage{
        display:flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap:wrap;
    }
    .imgPage img{
        width:125px;
        height: 125px;
        background-size: cover;
        background-repeat:no-repeat;
        background-position: center;
    }
</style>