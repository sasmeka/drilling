
CREATE TABLE province (
    id_province SERIAL PRIMARY KEY NOT NULL,
    name_province VARCHAR(50) NOT NULL
  );
  
  --===================================================================
  
  create table regency (
  id_regency SERIAL primary key not null,
  id_province int not null,
  name_regency varchar(255) not null,
  FOREIGN KEY (id_province) REFERENCES province (id_province)
  );
  
  --====================================================================
  
  create table subdistrict (
  id_subdistrict SERIAL primary key not null,
  id_regency int not null,
  name_subdistrict varchar(255) not null,
  FOREIGN KEY (id_regency) REFERENCES regency (id_regency)
  );
  
  --====================================================================
  
  create table village(
  id_village SERIAL primary key not null,
  id_subdistrict int not null,
  name_village varchar(255) not null,
  FOREIGN KEY (id_subdistrict) REFERENCES subdistrict (id_subdistrict)
  );
  
  --====================================================================
  
  create table genre(
  id_genre SERIAL primary key not null,
  name_genre varchar(255) not null
  );
  
  --====================================================================
  
  create table director(
  id_director SERIAL primary key not null,
  name_director varchar(255) not null
  );
  
  --====================================================================
  
  create table casts(
  id_cast SERIAL primary key not null,
  name_cast varchar(255) not null
  );
  
  --====================================================================
  
  create table movie(
  id_movie SERIAL primary key not null,
  id_director int,
  title varchar(255) not null,
  release_date varchar(255) not null,
  duration_hour int not null,
  duration_minute int not null,
  synopsis text not null,
  image text not null,
  FOREIGN KEY (id_director) REFERENCES director (id_director)
  );
  
  --====================================================================
  
  create table movie_cast(
  id_movie_cast SERIAL primary key not null,
  id_movie int not null,
  id_cast int not null,
  FOREIGN KEY (id_movie) REFERENCES movie (id_movie),
  FOREIGN KEY (id_cast) REFERENCES cast (id_cast)
  );
  
  --====================================================================
  
  create table movie_genre(
  id_movie_genre SERIAL primary key not null,
  id_movie int not null,
  id_genre int not null,
  FOREIGN KEY (id_movie) REFERENCES movie (id_movie),
  FOREIGN KEY (id_genre) REFERENCES genre (id_genre)
  );
  
  --====================================================================
  
  create table premier(
  id_premier SERIAL primary key not null,
  name_premier varchar(255) not null,
  image text not null,
  count_row_seat int not null,
  count_col_seat int not null
  );
  
  --====================================================================
  
  create table location(
  id_location SERIAL primary key not null,
  id_village int not null,
  street text not null,
  building text not null,
  FOREIGN KEY (id_village) REFERENCES village (id_village)
  );
  
  --====================================================================
  
  create table schedule (
  id_schedule serial primary key not null,
  id_movie int not null,
  id_location int not null,
  id_premier int not null,
  price int not null,
  date_start date not null,
  date_end date not null,
  FOREIGN KEY (id_movie) REFERENCES movie (id_movie),
  FOREIGN KEY (id_location) REFERENCES location (id_location),
  FOREIGN KEY (id_premier) REFERENCES premier (id_premier)
  );
  
  --====================================================================
  
  create table time_schedule (
  id_time_schedule serial primary key not null,
  id_schedule int not null,
  time_schedule time not null,
  FOREIGN KEY (id_schedule) REFERENCES schedule (id_schedule)
  );
  
  --====================================================================
  
  create table users(
  id_user serial primary key not null,
  first_name text not null,
  last_name text not null,
  phone varchar(15) not null,
  email text not null,
  pass text not null,
  status_verification char(1) DEFAULT '0',
  "role" varchar(6) NOT NULL DEFAULT 'user'::character varying
  );
  
  --====================================================================
  
  create table booking (
  id_booking serial primary key not null,
  id_time_schedule int not null,
  id_user int not null,
  seats varchar(10) not null,
  selected_date date not null,
  create_at timestamp not null DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_time_schedule) REFERENCES time_schedule (id_time_schedule),
  FOREIGN KEY (id_user) REFERENCES user (id_user)
  );