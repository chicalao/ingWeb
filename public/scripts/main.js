const productosData = [
    { id: 1, nombre: 'Pelota de Juguete', tipo: 'Juguete', precio: "10.000", stock: 5, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Pelota ideal para perros pequeños." },
    { id: 2, nombre: 'Vitamina Canina', tipo: 'Medicamento', precio: "10.000", stock: 3, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Suplemento vitamínico para fortalecer el sistema inmune." },
    { id: 3, nombre: 'Antiparasitario para gatos', tipo: 'Medicamento', precio: "20.000", stock: 30, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Antiparasitario oral para gatos." },
    { id: 4, nombre: 'Suplemento para gatos', tipo: 'Medicamento', precio: "20.000", stock: 3, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Suplemento para mejorar la salud de los gatos." },

    { id: 9, nombre: 'Pelota de Juguete', tipo: 'Juguete', precio: "10.000", stock: 5, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Pelota resistente para el juego diario de perros." },
    { id: 10, nombre: 'Vitamina Canina', tipo: 'Medicamento', precio: "20.000", stock: 3, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Complejo vitamínico para perros de todas las edades." },
    { id: 11, nombre: 'Hueso de Juguete', tipo: 'Juguete', precio: "15.000", stock: 8, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Hueso de goma para masticar." },
    { id: 12, nombre: 'Antipulgas', tipo: 'Medicamento', precio: "35.000", stock: 10, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Antipulgas en formato de spray para perros." },
    { id: 5, nombre: 'Ratoncito de Juguete', tipo: 'Juguete', precio: "8.000", stock: 12, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Ratoncito para entretener a gatos por horas." },
    { id: 6, nombre: 'Shampoo Medicado', tipo: 'Medicamento', precio: "25.000", stock: 6, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Shampoo medicado para pieles sensibles." },
    { id: 7, nombre: 'Pelota de Goma', tipo: 'Juguete', precio: "12.000", stock: 15, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Pelota de goma para juegos intensos." },
    { id: 8, nombre: 'Spray Desparasitante', tipo: 'Medicamento', precio: "28.000", stock: 4, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Spray efectivo para desparasitar perros y gatos." },
    { id: 14, nombre: 'Pastillas Digestivas', tipo: 'Medicamento', precio: "18.000", stock: 5, imagen: '../assets/farmacia.jpeg', __v: 1, descripcion: "Pastillas para mejorar la digestión de los perros." },
    { id: 15, nombre: 'Cuerda de Nudos', tipo: 'Juguete', precio: "18.000", stock: 10, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Cuerda de nudos para tirar y masticar." },
    { id: 16, nombre: 'Pelota de Felpa', tipo: 'Juguete', precio: "9.000", stock: 10, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Pelota de felpa suave para perros pequeños." },
    { id: 17, nombre: 'Frisbee', tipo: 'Juguete', precio: "13.000", stock: 6, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Frisbee resistente ideal para perros activos." },
    { id: 13, nombre: 'Cuerda Interactiva', tipo: 'Juguete', precio: "16.000", stock: 7, imagen: '../assets/juguete.jpg', __v: 1, descripcion: "Juguete para gatos que promueve la interacción física." }
];

Vue.createApp({
    data() {
        return {
            datos: [],
            juguetes: [],
            farmacia: [],
            productos_carrito: [],
            productos: [],
            contador: 1,
            subtotalProducto: 0,
            subtotalTotal: 0,
            productosEnStorage: [],
            productosEnStorageFiltrados: [],
        };
    },
    created() {
        this.datos = productosData; // Cargar datos desde el archivo local
        this.productos = productosData;
        this.productosEnStorage = JSON.parse(localStorage.getItem("carrito"));
        
        if (this.productosEnStorage) {
            this.productos_carrito = this.productosEnStorage;
        }

        // Llamar las funciones para renderizar juguetes y farmacia
        this.renderTarjetasJuguetes();
        this.renderTarjetasFarmacia();
    },
    methods: {
        renderTarjetasJuguetes() {
            this.juguetes = this.datos.filter(dato => dato.tipo === "Juguete");
        },
        renderTarjetasFarmacia() {
            this.farmacia = this.datos.filter(dato => dato.tipo === "Medicamento");
        },
        limiteCantidadMas(tarjeta) {
            if (tarjeta.stock > 0) {
                tarjeta.__v++;
                tarjeta.stock--;
            }
        },
        limiteCantidadMenos(tarjeta) {
            if (tarjeta.__v > 1) {
                tarjeta.__v--;
                tarjeta.stock++;
            }
        },
        añadirAlCarrito(tarjeta) {
            if (!this.productos_carrito.includes(tarjeta)) {
                this.productos_carrito.push(tarjeta);
                localStorage.setItem("carrito", JSON.stringify(this.productos_carrito));
            }
        },
        quitarProductoCarrito(tarjeta) {
            this.productos_carrito = this.productos_carrito.filter(t => t.id !== tarjeta.id);
            localStorage.setItem("carrito", JSON.stringify(this.productos_carrito));
        }
    }
}).mount('#app');