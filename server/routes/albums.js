import express, { response } from 'express';
import pool from '../db/index.js';
import { authenticateToken } from '../middleware/auth.js';


const router = express.Router();

router.get('/all', authenticateToken, async (req, res) => {
    try {
        const response = await pool.query('select * from albums')
        res.status(200).json({ albums: response.rows })
    }
    catch (error) {
        res.status(401).json({ error: error.message })
    }
})

router.get('/:id', authenticateToken, async (req, res) => {

    try {
        const id = req.params.id;
        const response = await pool.query('select * from albums where id =$1', [id])
        res.status(200).json({ album: response.rows[0] })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/add', authenticateToken, async (req, res) => {

    const user = req.user
    const patron_name = user.user_name
    const patron_id = user.user_id

    console.log(user)

    try {

        const response = await pool.query('insert into albums (album,artist,year,genre,description,patron_id,patron_name) values ($1,$2,$3,$4,$5,$6,$7) returning *',
            [req.body.album, req.body.artist, req.body.year, req.body.genre, req.body.description, patron_id, patron_name]);

        console.log(response.rows[0]);
        res.status(200).json({ album: response.rows[0] })




    } catch (error) {

        res.status(400).json({ error: error.message })

    }


})


router.put(`update/:id`, authenticateToken, async (req, res) => {

    const user = req.user
    const id = req.params.id

    try {
        const album = await pool.query('select * from albums where id = $1', [id]);

        if (user.user_id == album.rows[0].patron_id) {

            const updatedAlbum = pool.query('update albums set album = $1, artist = $2, year = $3, genre=$4,description=$5 returning *', [req.body.album, req.body.artist, req.body.year, req.body.genre, req.body.description])
            console.log(updatedAlbum)
            res.status(200).json({ updatedAlbum: updatedAlbum.rows[0] })
        }
        else{
            res.status(401).json({error:'You cannot edit this because you do not own this post'})
        }

    } catch {

        res.status(401).json({ error:'You cannot edit this because you do not own this post'})

    }



})
router.delete('/:id', authenticateToken, async (req, res) => {
    console.log('doing something')
    const id = req.params.id;
    const user = req.user

    try {
        const album = await pool.query('select * from albums where id = $1', [id])
        console.log('deleting')

        if (album.rows[0].patron_id == user.user_id) {
            console.log('considered a match')
            const response = await pool.query("delete from albums where id = $1 returning *", [id])
            console.log(response)
            res.status(200).json({ deletedAlbum: response.rows[0] })
        }
        else {

            res.status(401).json({ error: 'You do not own this post' })
        }


    } catch {
        res.status(401).json({ error: 'you dont own this post' })

    }

})




export default router