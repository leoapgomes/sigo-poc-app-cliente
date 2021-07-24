<template>

    <PanelPrincipal titulo="Gestão de Contratos">

        <form  v-on:submit.prevent="salvarContrato()">
            <label for="norma">Contrato: </label><br/>
            <input type="text" v-model="contrato" id="contrato" name="contrato" class="width50" required> <br/> <br/>

            <label for="titulo">Descrição: </label><br/>
            <input type="text" v-model="descricao"  id="descricao" class="width50"> <br/> <br/>


            <label for="url">Url do Contrato: </label><br/>
            <input type="text" v-model="url" id="url" class="width75"><br/> <br/>


            <button type="submit" class="btnSalvar">Salvar</button>
            <button type="reset" class="btnCancelar" @click="cancelar">Cancelar</button>

        </form>


    </PanelPrincipal>

</template>


<script>
import Http from "../httpClient";
import loading from  "../loading";
import PanelPrincipal from "@/components/PanelPrincipal.vue";


export default {
    name: "CadastroDeContratos",
    props: ['id'],
    components: {
        PanelPrincipal,
    },
    methods: {
        cancelar : function (){
            if(confirm("Deseja cancelar?")){
                this.$router.push('/consultorias');
            }
        },
        salvarContrato : function (){       

            let obj = {};

            for (var property in this.$data){
                obj[property] = this.$data[property]
            }

            console.log(obj);

            

            loading(true);

            if(this.$props.id){
                Http.put(`/consultoriaseassessorias/contratos/${this.$props.id}`, obj, {})
                .then((response) => response.data)
                .then((data) => {
                    this.$router.push('/consultorias');
                    loading(false);
                })
                .catch(error => {
                    console.log(error);
                    loading(false);
                });  
            } else {
                Http.post("/consultoriaseassessorias/contratos", obj, {})
                .then((response) => response.data)
                .then((data) => {
                    this.$router.push('consultorias');
                    loading(false);
                })
                .catch(error => {
                    console.log(error);
                    loading(false);
                });     
            }          
        }
    },

    data(){
        return {
            contrato : '',
            descricao : '',
            url : ''
        }
    },

    created() {
        
        if(this.$props.id){
            Http.get(`/consultoriaseassessorias/contratos/${this.$props.id}`)
                .then((response) => response.data)
                .then((data) => {
                    this.contrato = data.contrato;
                    this.descricao = data.descricao;
                    this.url = data.url;
                })
                .catch(error => console.log(error));            
        }
    },
};
</script>

<style scoped>

    input, select, button{        
        font-size: 12px;
        padding: 8px 10px;
        border: 1px solid #e7eaec;
        outline: none;
    }

    input:focus, select:focus{
        background-color:#fffef1;
    }

    .width30 {
        width: 30%;
    }

    .width50 {
        width: 50%;
    }

    .width75 {
        width: 75%;
    }

    .btnSalvar {
        background-color:#1ab394;
        border: 1px solid #e7eaec;
        outline: none;
        color: white;
        border-radius: 5px;
        width: 120px;
        margin: 0 10px;
        font-weight: bold;
    }

    .btnSalvar:hover {
        background-color:#1d987f;
    }

    .btnCancelar {
        background-color:#ed5565;
        border: 1px solid #e7eaec;
        outline: none;
        color: white;
        border-radius: 5px;
        width: 120px;
        margin: 0 10px;
        font-weight: bold;
    }

    .btnCancelar:hover {
        background-color:#e93d4f;
    }

    
</style>