<template>
  <div class="block" @click="abrirMenu"></div>

  <div id="div-loading">
    <div class="no-transparent">
      <div class="fa-lg">
        <i class="fas fa-spinner fa-spin"></i> <font class="font-carregando">Carregando</font>
      </div>
    </div>    
  </div>
  <div id="div-block">
    <i class="fas fa-sign-out-alt logout"></i>
  </div>

  <div v-if="exibeLogin">
    <transition name="fade">
      <router-view/> 
    </transition>
  </div>
  <div id="main" v-else>
    <div id="menu">
      <div class="esquerda">&nbsp;</div>
      <div class="centro"><center><br/><img src="@/assets/logo.png" /></center></div>      
      <div class="direita"><i class="fas fa-lg fa-times close-menu" @click="abrirMenu"></i></div>
      <br clear="all"/>
      <hr/>
      <!--<router-link to="/normas">Gestão de Normas</router-link><br/>
      <router-link to="/consultorias">Consultorias e Assessorias</router-link>-->
      <span @click="navegar('/normas')">Gestão de Normas</span><br/>     
      <span @click="navegar('/consultorias')">Consultorias e Assessorias</span>
    </div>
    <div>  
      <div id="barra-topo">
        <i class="fas fa-lg fa-bars menu-icon" @click="abrirMenu"></i>
        <i class="fas fa-lg fa-sign-out-alt logout" @click="logout"></i>        
      </div>
      <div id="content">
        <transition name="fade">    
          <router-view/> 
        </transition>
      </div>
      
    </div>
  </div>


</template>


<script>
export default {
  computed : {
    exibeLogin (){
      return this.$route.fullPath==="/login";
    }
  },
  methods: {
    navegar: function(caminho){

      if(window.matchMedia("(max-width: 700px)").matches)
      this.abrirMenu();

      this.$router.push(caminho);
    },
    logout : function(){
      if(confirm("Deseja sair do sistema?")){
        localStorage.removeItem('token_authorization');
        this.$router.push(`/login`);
      }
    },
    abrirMenu : function(){
      let menu = document.getElementById('menu');
			let block = document.getElementsByClassName('block')[0];      

      if(menu.style.visibility !== "visible"){
        menu.style.visibility = "visible";
        menu.style.left="0px";

        Object.assign(block.style, {
          visibility: "visible", opacity:1, pointerEvents: "all"
        });					
        
      } else {
        menu.style.visibility = "hidden";
        menu.style.left="-300px";

        Object.assign(block.style, {
          visibility: "hidden", opacity:0, pointerEvents: "none"
        });	
        
      }


    }
  }
}
</script>


<style>

#div-block {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CECECE;
  opacity: 0.5;

  display: block;
  pointer-events: none;
  visibility: hidden;
}

#div-loading {
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  visibility: hidden;
}

.font-carregando {
  font-size: 14px;
}

.logout{
  margin-right: 20px;
  color: #e93d4f;
  float: right;
  line-height: 50px;
  cursor: pointer;

}


						
.block {			
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.4);				
  -webkit-transition: visibility 5s, opacity 0.5s linear; /* Safari prior 6.1 */
  transition: visibility 5s, opacity 0.5s linear;
  opacity: 0;
  pointer-events: none;
}




@media screen and (min-width: 701px) {
  #main{
    display: grid;
    grid-gap: 0px;
    grid-template-columns: 250px auto;
    height: 100vh;
  }  
  #menu {
    background-image: linear-gradient(#233626,#2f4050);
    text-align: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    left: 0px;
    transition: all 0.5s;
  }


  #menu .direita, #menu .esquerda,  .fechar-menu , .menu-icon{
    visibility: hidden;
  }

  #menu .centro {
    float: left;
    width: 250px;    
  }



}

@media screen and (max-width: 700px) {
  #menu {
    background-image: linear-gradient(#233626, #2f4050);
    text-align: center;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    visibility: hidden;
    position: fixed;
    z-index: 2;
    height: 100vh;
    width: 300px;
    transition: all 0.5s;
    left: -300px;
  }
  #main{
    height: 100vh;
  }   
  
  .menu-icon{
    color: #233626;
    margin-left: 20px;
    line-height: 50px;
    float: left;
    cursor: pointer;
  }

  .close-menu{
    color: white;
    cursor: pointer;
  }

  #menu .esquerda {
    float: left;
    width: 50px;
  }  
  #menu .centro {
    float: left;
    width: 200px;    
  }

  #menu .direita {
    float: right;
    width: 48px;
    padding-top: 20px;

  }  

} 

#barra-topo{
  height: 50px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#menu span {
  color: white;
  text-decoration: none;  
  line-height: 40px;  
  cursor: pointer;
}

#menu .router-link-active {
  color: bisque;
  font-weight: bold;
}

#content{
  background-color: white;
  margin: 25px;
  border: 1px solid #e7eaec;
  height: calc(100vh - 102px);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

hr{
  border: 1px solid #e7eaec;
  width: 80%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
