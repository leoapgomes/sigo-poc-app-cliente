<template>
  <PanelPrincipal titulo="Gestão de Contratos">
    <button type="reset" class="btnIncluir" @click="incluirContrato"><i class="fas fa-plus"></i>&nbsp;&nbsp;Incluir novo contrato</button>

    <br /><br />
      <table id="table-normas">
        <tr>
          <th width="20%">Contrato</th>
          <th width="25%">Descrição</th>
          <th width="30%">Url Contrato</th>
          <th width="5%" class="th-acoes">&nbsp;</th>
        </tr>
        <tr v-for="contrato in contratos" :key="contrato.id" class="tr-dados">
          <td>{{contrato.contrato}}</td>
          <td>{{contrato.descricao}}</td>
          <td>{{contrato.url}}</td>
          <td>
            <button class="acoes" title="Alterar contrato" @click="alterarContrato(contrato.id)"><i class="far fa-edit fa-lg"></i></button>
            <button class="acoes" title="Excluir contrato" @click="excluirContrato(contrato.id)"><i class="fas fa-minus fa-lg"></i></button>             
          </td>
        </tr>
      </table>
  </PanelPrincipal>
</template>

<script>
import Http from "../httpClient";
import PanelPrincipal from "@/components/PanelPrincipal.vue";
import loading from  "../loading";

export default {
  name: "Consultorias",
  components: {
    PanelPrincipal,
  },
  methods: {

    incluirContrato : function(){
      this.$router.push(`/consultorias-form`);
    },
    alterarContrato : function(id){
      this.$router.push(`/consultorias-form/${id}`);
    },
    excluirContrato : function(id){
      if(confirm("Deseja excluir o registro?")){
        loading(true);
        Http.delete(`/consultoriaseassessorias/contratos/${id}`)
          .then((response) => {
            this.contratos = this.contratos.filter(contrato => contrato.id!==id);
            loading(false);
          });
      }
    }

  },
  data() {
    return {
      contratos : []
    }
  },
  created() {
    loading(true);

    Http.get("/consultoriaseassessorias/contratos")
      .then((response) => response.data)
      .then((data) => {
        this.contratos = data;
        loading(false);
      })
      .catch(error => {
        console.log(error);
        loading(false);
      }); 
  },
};
</script>

<style scoped>
#table-normas {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

#table-normas th {
  border: 1px solid #2f4050;
  padding: 8px;
}

#table-normas td {
  border: 1px solid #ddd;
  padding: 8px;
}



#table-normas tr:nth-child(even){background-color: #f2f2f2;}
#table-normas tr:hover {background-color: #fffef1;}

#table-normas th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #2f4050;
  color: white;
}

.acoes{
  width: 35px;
  height: 30px;
  line-height: 30px;
  border: 0px solid;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  color: #2f4050;
}

.th-acoes{
  min-width: 70px;
  max-width: 70px;
}


.btnIncluir {
    background-color:#1ab394;
    border: 1px solid #e7eaec;
    outline: none;
    color: white;
    border-radius: 5px;
    margin: 0 10px;
    font-weight: bold;
    font-size: 12px;
    padding: 8px 10px;
    border: 1px solid #e7eaec;
    outline: none;
    cursor: pointer;
}

.btnIncluir:hover {
    background-color:#1d987f;
}

</style>