<template>

    <PanelPrincipal titulo="Cadastro de Normas">

        <form  v-on:submit.prevent="salvarNorma()">
            <label for="norma">Norma: </label><br/>
            <input type="text" v-model="norma" id="norma" name="norma" class="width30" required> <br/> <br/>

            <label for="titulo">Título: </label><br/>
            <input type="text" v-model="titulo"  id="titulo" class="width50"> <br/> <br/>

            <label for="tipodenorma">Tipo de Norma: </label><br/>
            <select v-model="tipoDeNorma" id="tipodenorma" class="width50">
                <option checked>Selecione:</option>
                <option value="AMBIENTAL">Ambiental</option>
                <option value="PRODUCAO">Produção</option>
                <option value="RISCOS">Riscos</option>
                <option value="SANITARIA">Sanitária</option>
            </select> <br/> <br/>

            <label for="url">Url da Norma: </label><br/>
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
    name: "CadastroDeNormas",
    props: ['id'],
    components: {
        PanelPrincipal,
    },
    methods: {
        cancelar : function (){
            if(confirm("Deseja cancelar?")){
                this.$router.push('/normas');
            }
        },
        salvarNorma : function (){       

            let obj = {};

            for (var property in this.$data){
                obj[property] = this.$data[property]
            }

            loading(true);

            if(this.$props.id){
                Http.put(`/gestaodenormas/normas/${this.$props.id}`, obj, {})
                .then((response) => response.data)
                .then((data) => {
                    this.$router.push('/normas');
                    loading(false);
                })
                .catch(error => {
                    console.log(error);
                    loading(false);
                });  
            } else {
                Http.post("/gestaodenormas/normas", obj, {})
                .then((response) => response.data)
                .then((data) => {
                    this.$router.push('normas');
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
            norma : '',
            titulo : '',
            tipoDeNorma : '',
            url : ''
        }
    },

    created() {
        
        if(this.$props.id){
            Http.get(`/gestaodenormas/normas/${this.$props.id}`)
                .then((response) => response.data)
                .then((data) => {
                    this.norma = data.norma;
                    this.titulo = data.titulo;
                    this.tipoDeNorma = data.tipoDeNorma;
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