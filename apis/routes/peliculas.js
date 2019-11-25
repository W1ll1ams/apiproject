var express = require('express');
var router = express.Router();
var mongo_Pelicula = require('../controllers/Peliculas.controller');
const redis_url = 'localhost';
var client = require('redis').createClient(6379, redis_url);

/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        const llavePelicula = 'p_todas';
        client.get(llavePelicula, async (error, rep) => {
            if (error) {
                return res.status(500).json({error:error});
            }

            if (rep) {
                return res.status(200).json(JSON.parse(rep));
            }
            else{
                const actualPeliculas = await mongo_Pelicula.obtenerPeliculas();
                client.setex(llavePelicula,35,JSON.stringify(actualPeliculas));
                return res.status(200).json(actualPeliculas);
            }
        })
        
    } catch (error) {
        console.log('Error :' + error);
    } 
});

// POST method route
router.post('/add', async (req, res) => {
    try {
        const { pelicula } = req.body;

        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }

        const actualPeliculas = mongo_Pelicula.insertarPelicula(pelicula);
        

        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.put('/update', async (req, res) => {
    try {
        const { pelicula } = req.body;
        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }
        const actualPeliculas = mongo_Pelicula.modificarPelicula(pelicula);
        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.delete('/del/:identificador', async (req, res) => {
    try {
        const { identificador } = req.params;
        const actualPeliculas = mongo_Pelicula.eliminarPelicula(identificador);
        return res.status(201).json(actualPeliculas);
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.get('/:identificador', async (req, res, next) => {
    try {
        const { identificador } = req.params;
        //const llavePelicula = 'p_todas';
        client.get(identificador, async (error, rep) => {
            if (error) {
                return res.status(500).json({error:error});
            }

            if (rep) {
                return res.status(200).json(JSON.parse(rep));
            }
            else{ 
                const actualPeliculas = await mongo_Pelicula.obtenerPelicula(identificador);
                client.setex(identificador,35,JSON.stringify(actualPeliculas));
                return res.status(200).json(actualPeliculas);
            }
        })
        
    } catch (error) {
        console.log('Error :' + error);
    } 
});

module.exports = router;
