import express from 'express';
import pool from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers.js'
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

router.get('/', authenticateToken,  async (req, res) => {

    console.log(req.user)
    try {
        const users = await pool.query('SELECT * FROM users')
        res.json({ users: users.rows })
    }
    catch (error) {
        res.status(500).json({ error: error.message })


    }

})



router.post('/create', async (req, res) => {

    console.log(req.body);


    try {

        const userExists = await pool.query('select * from users where user_email =($1)', [req.body.email])

        if (userExists.rows[0] === undefined) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await pool.query('insert into users (user_name,user_email,user_password,user_online) values ($1,$2,$3,$4) returning *', [req.body.name, req.body.email, hashedPassword, false])
            res.json({ user: newUser.rows[0],message:'User succesfully created' })

        }
        else {
            console.log('This email has already beenr registered');
            res.json({ error: "User Email is unavailable" })
        }



    }
    catch (error) {

        res.status(500).json({ error: error.message })

    }
})

router.post('/login', async (req, res) => {


    try {
        //Search for User Email
        const users = await pool.query('select * from users where user_email =($1)', [req.body.email])
        //IF No email exists
        if (users.rows.length === 0) return res.status(400).json({ error: "Email is in incorrect" })
        //IF email exists, check password with BCRYPT
        const validPassword = await bcrypt.compare(req.body.password, users.rows[0].user_password)
        if (!validPassword) return res.status(401).json({ error: 'incorrect password' });

        //IF password is CORRECT
        else {
  
    
            //Set user_online to true
            let loggedInUser = await pool.query('update users set user_online = true where user_email = $1 returning *', [users.rows[0].user_email])
            loggedInUser = loggedInUser.rows[0]
            let tokens = jwtTokens(loggedInUser)
            res.cookie('refresh_token',tokens.refreshToken)

            return res.status(200).json({ message: "Login Successful",loggedInUser,tokens} )
        }


    }
    catch (error) {

        res.status(401).json({ error: error.message })

    }

})

router.get('/refresh_token',(req,res)=>{


    try{

        const refreshToken = req.cookies.refresh_token
        if(refreshToken === null) return res.status(401).json({error:'refreshToken Null'})
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (error,user)=>{

            if(error) return res.status(403).json({error:error.message})
            let tokens = jwtTokens(user)
            res.cookie('refresh_token',tokens.refreshToken)
            res.json(tokens)

        })
        console.log(refreshToken)

    } catch(error) {
        res.status(401).json({ error: error.message })

    }
})


router.delete('/refresh_token',(req,res)=>{


try{

    res.clearCookie('refresh_token')
    return res.status(200).json({message:'refresh_token deleted'})

}catch(error){
    res.status(401).json({ error: error.message })


}

})



export default router

