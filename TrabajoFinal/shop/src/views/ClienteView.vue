<template class="all">
    <div class="register">
        <h3><b>REGISTRE SU USUARIO</b></h3>
        <form class="form" @submit.prevent="crearPersona()">
            <input type="text" v-model="payload.firstname" required placeholder="NAME USER" >
            <!-- <input type="text" v-model="payload.lastname" placeholder="Apellido"> -->
            <input :type="passwordFieldType" v-model="payload.rePassword" required placeholder="PASSWORD">
            <button type="password" @click.stop.prevent="switchVisibility">show / hide</button>
            <button type="submit">Agregar</button>
        </form>
        <a><b>BUSCADOR:  </b><input type="text" v-model="filter"  required placeholder="" @input="buscar()"></a>
        <br><br>
        <table class="table">
    
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name User</th>
      <!-- <th scope="col">Last</th> -->
      <th scope="col">Password</th>
    </tr>
  </thead>
  <tbody class="thead">
    <tr v-for = "value of personas2" :key="value">
      <th scope="row" class="thead">{{ value.id }}</th>
      <td class="thead">{{ value.firstname }}</td>
      <!-- <td>{{ value.lastname }}</td> -->
      <td class="thead">{{ value.rePassword }}</td>
      <button class="boton" type="delete" @click="borrar(value.id)">delete</button>
    </tr>
  </tbody>
</table>
<a><b>EDITAR: </b><input type="number" min="1" v-model="edit" required placeholder="Ingresa el #"><button @click="editar()">edit</button></a>
<br><br>
<div v-if="editpivot.val ==1">
    <a>Se esta editando el USUARIO: "{{ this.editpivot.name.firstname }}"</a>
    <form class="form2" @submit.prevent="editarPersona(edit)">
        <input type="text" v-model="payload2.firstname" required placeholder="NEW user">
        <!-- <input type="text" v-model="payload.lastname" placeholder="Apellido"> -->
        <input :type="passwordFieldType" v-model="payload2.rePassword" required placeholder="NEW password">
        <button type="password" @click.stop.prevent="switchVisibility">show / hide</button>
        <button type="submit">Confirmar</button>
    </form>
</div>
<div v-if="editpivot.val ==2">
    <h3>Número de "id" NO ENCONTRADO</h3>
</div>
    </div>
</template>

<script>
    import Rest from '@/classes/Rest'
    export default {
        name: 'newView',
        props:[],
        emits:[],
        data(){
            return{
                personas :[],
                payload : {
                    firstname:'',
                    lastname:'',
                    rePassword:''
                },
                payload2 : {
                    firstname:'',
                    lastname:'',
                    rePassword:''
                },
                password: "",
                passwordFieldType: "password",
                filter:"",
                personas2: [],
                edit:"",
                editpivot: {
                    val: 0,
                    name:"",
                }
            }
        },
        methods:{
            getPersonas(){
            Rest.get("http://localhost:5000/clients")
            .then((response) =>{
                this.personas = response.data
                this.personas2 = response.data
                console.log(this.personas)
            })
            .catch(e=>console.log(e))    
            },
            crearPersona(){
                Rest.post("http://localhost:5000/clients", this.payload, this.password)
                .then((response) => {
                    this.getPersonas()
                    console.log(response)})
                .catch(e=>console.log(e))
                this.payload = {}
            },
            editarPersona(value){
                Rest.patch(`http://localhost:5000/clients/${value}`, this.payload2)
                .then((response) => {
                    this.getPersonas()
                    console.log(response)})
                .catch(e=>console.log(e))
                this.editpivot.val = 0
            },
            borrar(value){
                //console.log(value)
                Rest.delete(`http://localhost:5000/clients/${value}`)
                .then((response) => {
                    this.getPersonas()
                    console.log(value, response)})
                .catch(e=>console.log(e))
            },
            switchVisibility() {
                this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
            },
            buscar(){
                //console.log(this.personas)
                //this.getPersonas()
                this.personas2 = []   
                this.personas.map(x => {
                    if (x.firstname.toLowerCase().includes(this.filter))
                    {
                        this.personas2.push(x) 
                        //console.log(this.personas2)       
                    }
                }
                )
                console.log(this.personas2)
            },
            editar(){
                var ids = this.personas.map(x => x.id)
                if(ids.includes(this.edit))
                {
                    this.editpivot.val = 1
                    this.editpivot.name = this.personas.find(x => x.id == this.edit)
                    console.log(this.editpivot.name)
                }
                else
                {
                    this.editpivot.val = 2
                }
            }
        },
        computed:{
            
        },
        mounted(){
            this.getPersonas();
            //this.buscar();
        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>

.register {
  padding: 2rem;
  color: black;
}
.form {
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20%;
  min-width: 650px;
  max-width: 80%;
  background: rgba(19, 35, 47, 0.9);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.boton{
  background-image: linear-gradient(#f7f8fa ,#e7e9ec);
  border-color: #adb1b8 #a2a6ac #8d9096;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  box-shadow: rgba(255,255,255,.6) 0 1px 0 inset;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember",Arial,sans-serif;
  font-size: 14px;
  height: 29px;
  font-size: 13px;
  outline: 0;
  overflow: hidden;
  padding: 0 11px;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}
.thead{
    border: 3px solid black;
	padding: 8px;
}

</style>