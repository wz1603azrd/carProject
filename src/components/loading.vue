<template>
    <div class='loading-page'>
            <img src='../assets/img/loading.gif'/>
    </div>
</template>
<script>
    export default{
        name: 'loading'
    }
</script>
<style>
.loading-page{
    width: 100%;
    height: 100%;
    left:0;
    top: 0;
    position: fixed;
    z-index: 999;
    text-align:center;
    background:#fff;
    display: flex;
    align-items:center;
}
.loading-page img{
    margin: 0 auto;
    width: 50px;
    height: 50px;
}
</style>
