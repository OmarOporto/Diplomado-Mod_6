var bus = new Vue({
    data: function() {
      return {
        select: '1',
        num:1
      }
    }, 
    methods: {
        updateTotals: function(sel) {
            this.select = sel
        },
        updateN: function(numero) {
            this.num = numero
        }
    }
  })

Vue.component('alert', {
    data: function () {
        return {
            amount: '',
            number: 1
        }    
    },
    template:`<button type="button" class="btn btn-primary" @click="handleColor">COMPRAR</button>`,
    methods: {
        handleColor() {
            this.amount = bus.select
            this.number = bus.num
            console.log(this.amount +"asdasdasd" +this.number);
            alert(`id:1 \n cantidad: ${this.number} \n color: ${this.amount}`)
          }
    },
})


Vue.component('bc', {  
    data: function () {
        return {
            cantidad: 1
        }    
    },
    template: `
    <div>
        <button v-on:click="restar()">-</button> {{cantidad}} <button @click="sumar()" >+</button>
    </div>
    `,
    methods: {
        restar() {
            this.cantidad = this.cantidad -1;
            if (this.cantidad <=1){
                this.cantidad =1}
            bus.$emit('value-changedN', this.cantidad);    
        },
        sumar(){
            this.cantidad++
            bus.$emit('value-changedN', this.cantidad);    
        }
    },
    created: function() {
        bus.$emit('value-changedN', this.cantidad);
    }
})


Vue.component('color', {  
    props: ['name'],
    data: function () {
        return {
            colores: ["red", "blue", "black", "yellow"],
            seleccionado: '1'
        }    
    },
    template: '<div><div class="color-box clic" v-for="color in colores" :style="`background: ${color}`" @click="seleccionar(`${color}`)"></div>{{seleccionado}}</div>',
    methods: {
        seleccionar(color) {
            this.seleccionado = color
            bus.$emit('value-changed', this.seleccionado);
        }
    },

    created: function() {
        bus.$emit('value-changed', this.seleccionado);
    }
})

var app = new Vue({
    el: "#app",
    created: function() {
        this.bus = bus;
        bus.$on('value-changed', bus.updateTotals);
        bus.$on('value-changedN', bus.updateN);
    }
  });

