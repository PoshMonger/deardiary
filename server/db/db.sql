-- for help use :   \?

-- \l  to see all databases

-- CREATE DATABASE <name of database>;

-- use ; to end statements

-- see all databases: \dl;

--See columns of a table: \d <TABLE NAME>

--See ENTRY of a table: TABLE <table name>
-- or: select * from <table name>

-- see current database: SELECT current_database();

 -- list all tables in a database:  \dt;

 --list all table columns in a table: \ds you_table-name;

 --change to database \c database_name

CREATE TABLE restaurants (

    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);z
select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;


    CREATE TABLE products (
        id INT,
        name VARCHAR(50),
        another TEXT,
        price INTEGER,
        onsale boolean

    );






    CREATE TABLE restaurants (
        id BIGSERIAL NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
    );


    INSERT INTO restaurants (

        id,name,location,price_range
    ) values (123,'chickfila','orlando',3);


    CREATE TABLE reviews(

        id BIGSERIAL NOT NULL PRIMARY KEY,
        restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
        name VARCHAR(50) not null,
        body TEXT NOT NULL,
        rating INT NOT NULL check(rating >= 1 and rating <=5)
    );


  
  CREATE TABLE albums(


    id BIGSERIAL NOT NULL PRIMARY KEY,
    album VARCHAR(50) NOT NULL,
    artist VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    genre VARCHAR(25) NOT NULL,
    patron_id uuid NOT NULL REFERENCES users(user_id),
    patron_name VARCHAR NOT NULL,
    description VARCHAR(100) NOT NULL
    
    


  );


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE USERS(

    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password text NOT NULL,
    user_online boolean NOT NULL


);

insert into users (user_name,user_email,user_password,user_online) values ('joe','jschlitzii@gmail.com','wahoff123',false);

insert into albums (album,artist,year,genre,patron_name,patron_id,description) values ('Abbey Road','The Beatles','1969','Rock/Pop/Psychedelic','Joe Schlitz',' 5bf4cbe7-75eb-4ef5-a9e2-c601fdaceb4b','great album');