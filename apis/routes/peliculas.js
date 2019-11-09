var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const actualPeliculas = await RW.openfile();
    return res.status(200).json(actualPeliculas);
});

// POST method route
router.post('/add', async (req, res) => {
    try {
        const { pelicula } = req.body;
        const actualPeliculas = await RW.openfile();
        if (!pelicula) {
           return res.status(500).json({error:"pelicula invalida"});
        }

        actualPeliculas.push(pelicula);

        await RW.savefile(actualPeliculas);

        return res.status(201).end();
    } catch (error) {
        console.log('Error :' + error);
    }
});

router.put('/update', async (req, res) => {
    try {
        const { pelicula } = req.body;
        const actualPeliculas = await RW.openfile();
        if (!pelicula) {
            return res.status(500).json({error:"pelicula invalida"});
        }

        this.state.data.filter(pelicula => pelicula.id === movie)[0];

        actualPeliculas.push(pelicula);

        await RW.savefile(actualPeliculas);

        return res.status(201).end();
    } catch (error) {
        console.log('Error :' + error);
    }
});

module.exports = router;
