<template>
    <div class="about">
        <h1>nueva pagina</h1>
        <router-link to = "/">About</router-link>
    </div>
</template>

<script>
    export default {
        name: 'newView',
        props:[],
        emits:[],
        data(){
            return{}
        },
        methods:{
            getPersonas(){
            this.axios.get("http://localhost:5000/users")
            .then((response) =>{console.log(response);})
            .catch(e=>console.log(e))    
            }
        },
        computed:{

        },
        mounted(){
            this.getPersonas();
        },
        components: {

        }
    }
</script>