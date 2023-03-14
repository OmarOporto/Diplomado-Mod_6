<script setup>
import { RouterLink} from 'vue-router';

</script>

<template>
    <div class="login">
      <h1 class="title">Login in the page</h1>
      <form action class="form" @submit.prevent="login()">
        <label class="form-label" for="#email">Email:</label>
        <input
          v-model="email"
          class="form-input"
          type="string"
          id="email"
          required
          placeholder="Email"
        >
        <label class="form-label" for="#password">Password:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        >
        <div v-if="pivot" class = "pivot">
            <!-- <p v-if="error" class="error" >LOADING
                <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
            </p> -->
            <p v-if="!error" class="error">Usuario o Contraseña no Valido</p>
        </div>
        <input class="form-submit" type="submit" value="Login">
      </form>
      <p class="msg">¿No tienes cuenta?
        <router-link to="/client">Regístrate</router-link>
      </p>
    </div>
  </template>
  
  <script>
  //import auth from "@/logic/auth";
  import Rest from '@/classes/Rest'
  export default {
    data: () => ({
      personas:[],
      cartPivot:[],
      productos:[],
      payload : {
        name:'',
        price:0,
        cantidad:0
      },  
      email: "",
      password: "",
      error: false,
      pivot:false
    }),
    methods: {
    
        getPersonas(){
            Rest.get("http://localhost:5000/clients")
            .then((response) =>{
                this.personas = response.data
                //console.log(this.personas)
            })
            .catch(e=>console.log(e)) 
            
            },
        getCarrito(){
            Rest.get("http://localhost:5000/cartitems")
            .then((response) => {
                this.cartPivot = response.data
            })
            .catch(e=>console.log(e))
        },
        getProducto(){
            Rest.get("http://localhost:5000/products")
            .then((response) =>{
            this.productos = response.data
            //console.log(this.productos)
        })
        .catch(e=>console.log(e))    
        },
        login(){
            var idx = this.personas.map(x=> x.firstname).indexOf(this.email)
            var psx = this.personas.map(x=> x.rePassword).indexOf(this.password)
            //console.log(idx + "    "+ psx)
            if (idx && psx !=-1)
            {
                this.error = true
                this.pivot = true
                
                this.cartPivot.map(x=>{
                    var prod = this.productos.find(y=>y.id==x.idp)
                    console.log(x.id)
                    this.payload ={
                        name:prod.name,
                        price:prod.price,
                        cantidad: prod.cantidad + x.quantity
                    }
                    Rest.patch(`http://localhost:5000/products/${x.idp}`, this.payload)
                        .then(() => {
                            //console.log(response)
                            this.getProducto()
                        })        
                        .catch(e=>console.log(e))

                    Rest.delete(`http://localhost:5000/cartitems/${x.id}`)
                        .then((response) => {
                            this.getCarrito()
                        console.log( response)})
                        .catch(e=>console.log(e))
                })

                this.$router.push("/cart")
            }
            else
            {
                this.error = false
                this.pivot = true
            }    
            
        }
    },
    computed:{

    },
    mounted(){
        this.getPersonas();
        this.getCarrito();
        this.getProducto();
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .login {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(19, 35, 47, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
    &:first-of-type {
      margin-top: 0rem;
    }
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
    &:focus {
      outline: 0;
      border-color: #1ab188;
    }
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #0b9185;
    }
  }
  .error {
    margin: 1rem 0 0;
    color: #ff4a96;
  }
  .msg {
    margin-top: 3rem;
    text-align: center;
  }
  </style>  