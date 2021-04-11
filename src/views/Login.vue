<template>
    <div class="container">
        
        <div class="caixa-login">      
            <div class="logo"><center><img src="@/assets/logo.png" /></center></div>     
            <div class="form-login">
                <br/>
                <form v-on:submit.prevent="doLogin()">
                    <label for="login">Login: </label><br/>
                    <input type="text" v-model="login" id="login" required> <br/> <br/>

                    <label for="senha">Senha: </label><br/>
                    <input type="password" v-model="senha"  id="senha" required> <br/> <br/>  
                    <br/>  

                    <input type="submit" value="Efetuar Login" class="btnLogin"/>
                </form>
            </div>
        </div>
    </div>
</template>


<script>

import Http from "../httpClient";
import loading from  "../loading";

export default {
  name: "Login",
  data(){
      return {
          login : 'admin',
          senha : '123456'
      }
  },
  created() {
    localStorage.setItem('token_authorization', "");
  },
  methods: {

      doLogin : function() {

        let formData = new URLSearchParams();

        localStorage.setItem('token_authorization', "");
        formData.append('scope', 'web');
        formData.append('grant_type', 'password');
        formData.append('username', this.login);
        formData.append('password', this.senha);

        loading(true);

        Http.post("/auth/oauth/token", formData, {
            auth : {
                username : 'sigo',
                password : 'sigopassword'
            }, 
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((response) => response.data)
        .then((data) => {
            localStorage.setItem('token_authorization',  data.access_token);
            this.$router.push('normas');
            loading(false);
        })
        .catch(error => {
            console.log(error);
            loading(false);
        });  

        

      }
  }
  
};
</script>


<style scoped>

    .caixa-login{
        width: 400px;
        height: 500px;
        background-color: white;
        border: 1px solid #e7eaec;
        border-radius: 8px;
    }

    .form-login{
      padding: 30px;  
    }

    .container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }

    input, button{        
        font-size: 16px;
        padding: 8px 10px;
        border: 1px solid #e7eaec;
        outline: none;
        width: 100%;
        box-sizing: border-box;
    }

    input[type=text]:focus{
        background-color:#fffef1;
    }

   
    .btnLogin {
        background-color:#1ab394;
        border: 1px solid #e7eaec;
        outline: none;
        color: white;
        border-radius: 5px;
    }

    .btnLogin:hover {
        background-color:#1d987f;
        cursor: pointer;
    }    

    .logo{
        background-image: linear-gradient(#233626, #2f4050);
        padding: 20px 30px;
        border-radius: 8px 8px 0 0;
    }

</style>