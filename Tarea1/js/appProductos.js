var appH = new Vue({
    el: '#app-Header',
    
    data: {
        marca: 'MegaDron',
        menuColor: 'lightblue',
        Ref :{
            url:'?'
        }
    }
})


var appP = new Vue({
    el: '#app-Product',
    
    data: {
        precio: "620",
        
        id:1,
        imagen: "https://ae01.alicdn.com/kf/Sc3cc58f2a441419f970cc01f9e5358fbw/Dron-LU3-MAX-GPS-8K-HD-profesional-con-c-mara-Dual-card-n-autoestabilizador-Motor-sin.jpg_Q90.jpg_.webp",
        nombre: "Dron LU3 MAX GPS 8K HD",
        descripcion: "Dron LU3 MAX GPS 8K HD profesional con", 
        descripcion1:"cámara Dual",
        descripcion2:",cardán autoestabilizador, Motor sin escobillas para evitar obstáculos, cuadricóptero plegable",
        
        colores: ["red", "blue", "black", "yellow"],
        
    }

})

var appF = new Vue({
    el: '#app-Footer',
    
    data: {
       footerColor:"slategrey"
    }
})