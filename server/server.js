import express from 'express';
import cors from 'cors';
import db from './db/index.js'
import {dirname,join} from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import 'dotenv/config'

import albums from './routes/albums.js'
import users from './routes/users.js'



const port = process.env.PORT || 3001;
const corsOptions = {credentials:true,origin:process.env.URL || '*'};
const _dirname = dirname(fileURLToPath(import.meta.url))

//Initiation
const app = express();

//Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/apiInterface',express.static(join(_dirname,'public')));
app.use(bodyParser.json())

//Routes
app.use('/users',users)
app.use('/albums',albums)

//Opening port to listen
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)})









/*
// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  console.log(req.body.name)
  try {
    //const results = await db.query("select * from restaurants");
    const restaurantRatingsData = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id)  reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
     
        restaurants: restaurantRatingsData.rows,
      
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const restaurant = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
        [req.params.id]);
    // select * from restaurants wehre id = req.params.id
    const reviews = await db.query(
        "select * from reviews where restaurant_id = $1",
        [req.params.id])

console.log(restaurant)
    res.status(200).json({
      status: "success",
      restaurant: restaurant.rows[0],
      reviews:reviews.rows
    
      
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Restaurant

app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      
        restaurant: results.rows[0],
      
    });
  } catch (err) {
    console.log(err);
  }
});

// Update Restaurants

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
console.log(results)
    res.status(200).json({
      status: "success",
     
        retaurant: results.rows[0],
      
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, body, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.body, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

*/