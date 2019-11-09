// Cargamos los modelos para usarlos posteriormente
var Pelicula = require('../models/peliculas');

// Conseguir datos de un usuario
exports.getPeliculas =  async function getTodasPeliculas(){

    return Pelicula.find()
        .then( peliculas => {
            return peliculas;
        })
}

// Conseguir datos de un usuario
exports.insertarPelicula =  async function addPeliculas(oPelicula){
    return Pelicula.create(
        oPelicula)
        .then( pelicula => {
            return Pelicula.find( { _id: pelicula._id }, null, { limit: 1 })
            
        })
}




