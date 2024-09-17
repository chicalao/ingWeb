Vue.createApp({
    data(){
        return{
            datos: [],
            juguetes: [],
            farmacia:[],
            productos_carrito:[],
            productos:[],
            contador:1,
            subtotalProducto:0,
            subtotalTotal:0,
            productosEnStorage:[],
            productosEnStorageFiltrados:[],
        }
    },
    created(){
        this.datos = productosData; // Ahora toma los datos desde el archivo local
        this.productos = productosData;
        this.productosEnStorage = JSON.parse(localStorage.getItem("carrito"));
        if (this.productosEnStorage) {
            this.productos_carrito = this.productosEnStorage;
        }
    },
    methods:{

        limiteCantidadMas(tarjeta){
            this.contador++
            tarjeta.stock--
            if(tarjeta.__v > tarjeta.stock){
                this.contador = tarjeta.stock
            }
        },

        limiteCantidadMenos(tarjeta){
            this.contador--
            tarjeta.stock++
            if (this.contador < 0){
                this.contador = 0
            }
        },

        añadirAlCarrito(tarjeta){
            tarjeta.__v ++
        
            this.subtotalProducto = tarjeta.precio * tarjeta.__v
            this.subtotalTotal += this.subtotalProducto

            if(!this.productos_carrito.includes(tarjeta) )
            {
                this.productos_carrito.push(tarjeta)
                localStorage.setItem("carrito",JSON.stringify(this.productos_carrito))
            }
        
        },

        quitarProductoCarrito(tarjeta){
            this.productos_carrito = this.productos_carrito.filter(tarj => tarj.nombre !== tarjeta.nombre)
            this.productosEnStorage = this.productos_carrito    
            localStorage.setItem("carrito",JSON.stringify(this.productos_carrito))
            
            this.subtotalTotal -= this.subtotalProducto

            if(this.productos_carrito.length == 00)
            {
                this.subtotalTotal = 0
            }
        }

    },
    computed:{
        renderTarjetasJuguetes(){
            this.juguetes = this.datos.filter(dato => dato.tipo == "Juguete")
            
        },
        renderTarjetasFarmacia(){
            this.farmacia = this.datos.filter(dato => dato.tipo == "Medicamento")
        }
    }
}).mount('#app')