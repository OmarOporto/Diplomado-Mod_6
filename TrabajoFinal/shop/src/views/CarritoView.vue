<template>
    <div class="commerce-products">
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th class="col-price">Price</th>
            <th class="col-inventory">Inventory</th>
            <th class="col-addtocart"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td class="col-price">{{ product.precio }}</td>
            <td class="col-inventory">{{ product.cantidad }}</td>
            <td class="col-addtocart">
              <button :disabled="!product.cantidad" @click="addItemToCart(product)">Add to cart</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
<!-- --------------------------------------------------------------------------------------------------------------------------------- -->
    <div class="commerce-cart">
    <h3>Cart</h3>
    <div v-if="cItems==0"><i>Please add some products to cart.</i></div>
    <table v-if="cItems>0">
      <thead>
        <tr>
          <th>Name</th>
          <th class="col-price">Price</th>
          <th class="col-quantity">Quantity</th>
          <th class="col-price">Total</th>
          <th class="col-action"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartPivot" :key="item.title">
          <td>{{ item.title }}</td>
          <td class="col-price">{{ item.precio }}</td>
          <td class="col-quantity">
            <button  @click="add(item.id)">+</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button :disabled="item.quantity <= 0" @click="substract(item.id)">-</button>
          </td>
          <td class="col-price">{{ item.price * item.quantity }}</td>
          <td class="col-action">
            <button @click="removeItemFromCart(item)">x</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5"><strong>Total:</strong> TOTAL</td>
        </tr>
      </tfoot>
    </table>
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
                products :[],
                cartPivot:[],
                payload : {
                    name:'',
                    price:0,
                    cantidad:0
                },
                cartItems:{
                    title:'',
                    precio:0,
                    quantity:0,
                    idp:''
                },
                cItems:0
            }
        },
        methods:{
            getProducto(){
                Rest.get("http://localhost:5000/products")
                .then((response) =>{
                this.products = response.data
                //console.log(this.productos)
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
            addItemToCart(product){
                
                var ids = this.cartPivot.map(x=> x.idp)

                console.log(ids +"  "+ product.id)
                
                this.cItems = this.cItems+1
                
                if (ids.includes(product.id)){
                    console.log('INGRESO')
                    this.cartPivot.map(x=>{
                        if(x.idp == product.id)
                        {   
                            this.cartItems = {
                                title: product.name,
                                precio: product.precio,
                                quantity: x.quantity+1,
                                idp:product.id
                            }

                            Rest.patch(`http://localhost:5000/cartitems/${x.id}`, this.cartItems)
                            .then((response) => {
                                console.log(response)
                                this.getCarrito()
                            })        
                            .catch(e=>console.log(e))
                        }
                    })
                }
                else{
                    console.log('SALTO')
                    this.cartItems = {
                        title: product.name,
                        precio: product.precio,
                        quantity: 1,
                        idp:product.id
                    }
                    Rest.post("http://localhost:5000/cartitems", this.cartItems)
                    .then((response) => {
                        this.getCarrito()
                        console.log(response)
                    })
                    .catch(e=>console.log(e))
                }
                this.payload = {
                    name:product.name,
                    price:product.price,
                    cantidad: product.cantidad - 1
                },
                Rest.patch(`http://localhost:5000/products/${product.id}`, this.payload)
                    .then(() => {
                        //console.log(response)
                        this.getProducto()
                    })        
                    .catch(e=>console.log(e))
                     

            },
            add(id) {
                var p = this.cartPivot.find(x=> x.id==id)
                var prod = this.products.find(x=>x.id==p.idp)
                if (prod.cantidad>0){
                    this.payload = {
                        name:p.name,
                        price:p.price,
                        cantidad: prod.cantidad - 1
                    },
                    Rest.patch(`http://localhost:5000/products/${p.idp}`, this.payload)
                        .then(() => {
                            //console.log(response)
                            this.getProducto()
                        })        
                        .catch(e=>console.log(e))
                
                    this.cartItems = {
                        title: p.title,
                        precio: p.precio,
                        quantity: p.quantity + 1,
                        idp:p.idp
                    }
                    Rest.patch(`http://localhost:5000/cartitems/${id}`, this.cartItems)
                        .then((response) => {
                        this.getCarrito()
                        console.log(response)
                    })
                    .catch(e=>console.log(e))
                }    
            },
            substract(id) {
                var p = this.cartPivot.find(x=> x.id==id)
                var prod = this.products.find(x=>x.id==p.idp)
                if (p.quantity>0){

                    this.payload = {
                        name:p.name,
                        price:p.price,
                        cantidad: prod.cantidad + 1
                    },
                    Rest.patch(`http://localhost:5000/products/${p.idp}`, this.payload)
                        .then(() => {
                            //console.log(response)
                            this.getProducto()
                        })        
                        .catch(e=>console.log(e))

                    this.cartItems = {
                        title: p.title,
                        precio: p.precio,
                        quantity: p.quantity - 1,
                        idp:p.idp
                        }
                    Rest.patch(`http://localhost:5000/cartitems/${id}`, this.cartItems)
                    .then((response) => {
                        this.getCarrito()
                        console.log(response)
                    })
                    .catch(e=>console.log(e))
                }
            },
            removeItemFromCart(item){
                var prod = this.products.find(x=>x.id==item.idp)

                this.payload = {
                        name:prod.name,
                        price:prod.price,
                        cantidad: prod.cantidad + item.quantity
                    },
                    Rest.patch(`http://localhost:5000/products/${item.idp}`, this.payload)
                        .then(() => {
                            //console.log(response)
                            this.getProducto()
                        })        
                        .catch(e=>console.log(e))


                Rest.delete(`http://localhost:5000/cartitems/${item.id}`)
                .then((response) => {
                    this.getCarrito()
                    console.log( response)})
                .catch(e=>console.log(e))

            }
        },
        computed:{

        },
        mounted(){
            this.getProducto();
            this.getCarrito();
        },
        components: {

        }
    }
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #333;
}
table thead th {
  background: #333;
  color: #fff;
  padding: 5px 10px;
  text-align: left;
}
table tbody td {
  background: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}
table .col-price {
  width: 60px;
  text-align: right;
}
table .col-inventory {
  width: 60px;
  text-align: right;
}
table .col-addtocart {
  width: 90px;
  text-align: center;
}
</style>