<template>
    <div>
        <form class="form" @submit.prevent="crearProducto()">
            <input type="text" v-model="payload.name" placeholder="Nombre" >
            <input type="number" min="0" v-model="payload.precio" placeholder="Precio">
            <input type="number" min="0" v-model="payload.cantidad" placeholder="Cantidad">
            <button type="submit">Agregar</button>
        </form>
        <a><b>Filtro Agotados </b><button @click="buscar()">search</button> <button @click="getProducto()">undo</button></a>
        <br><br>
        <table class="table">
  <thead>
    <tr class="thead">
      <th scope="col">#</th>
      <th scope="col">NAME</th>
      <th scope="col">PRICE</th>
      <th scope="col">CANTIDAD</th>
    </tr>
  </thead>
  <tbody>
    <tr class="thead" v-for = "value of productos" :key="value +1">
      <th class="thead" scope="row">{{ value.id }}</th>
      <td class="thead" >{{ value.name }}</td>
      <td class="thead" >{{ value.precio }}</td>
      <td class="thead" >{{ value.cantidad }}</td>
      <button class="boton" type="delete" @click="borrar(value.id)">delete</button>
    </tr>
  </tbody>
</table>

<a><b>EDITAR: </b><input type="number" min="1" v-model="edit" required placeholder="Ingresa el #"><button @click="editar()">edit</button></a>
<br><br>
<div v-if="editpivot.val ==1">
    <a>Se esta editando el PRODUCTO: "{{ this.editpivot.name.name }}"</a>
    <form class="form2" @submit.prevent="editarProducto(edit)">
        <input type="text" v-model="payload2.name" placeholder="new Nombre" >
        <input type="number" v-model="payload2.precio" placeholder="new Precio">
        <input type="number" v-model="payload2.cantidad" placeholder="new Cantidad">
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
                productos :[],
                productos2 :[],
                payload : {
                    name:'',
                    price:0,
                    cantidad:0
                },
                payload2 : {
                    name:'',
                    price:0,
                    cantidad:0
                },
                edit:"",
                editpivot: {
                    val: 0,
                    name:"",
                }
            }
        },
        methods:{
            getProducto(){
                Rest.get("http://localhost:5000/products")
                .then((response) =>{
                this.productos = response.data
                console.log(this.productos)
            })
            .catch(e=>console.log(e))    
            },
            crearProducto(){
                Rest.post("http://localhost:5000/products", this.payload)
                .then((response) => {
                    this.getProducto()
                    console.log(response)})
                .catch(e=>console.log(e))
                this.payload = {
                    name:'',
                    price:'',
                    cantidad:''
                }
            },
            editarProducto(value){
                Rest.patch(`http://localhost:5000/products/${value}`, this.payload2)
                .then((response) => {
                    this.getProducto()
                    console.log(response)})
                .catch(e=>console.log(e))
                this.editpivot.val = 0
            },
            borrar(value){
                //console.log(value)
                Rest.delete(`http://localhost:5000/products/${value}`)
                .then((response) => {
                    this.getProducto()
                    console.log(value, response)})
                .catch(e=>console.log(e))
            },
            buscar(){  
                this.productos.map(x => {
                    if (x.cantidad==0)
                    {
                        this.productos2.push(x) 
                        //console.log(this.personas2)       
                    }
                }
                )
                this.productos = this.productos2
                this.productos2 = []
                console.log(this.personas2)
            },
            editar(){
                var ids = this.productos.map(x => x.id)
                if(ids.includes(this.edit))
                {
                    this.editpivot.val = 1
                    this.editpivot.name = this.productos.find(x => x.id == this.edit)
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
            this.getProducto();
        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>
.form {
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20%;
  min-width: 700px;
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