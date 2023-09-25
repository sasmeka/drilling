  create table users(
  id_user serial primary key not null,
  full_name varchar(255) not null 
  );
  
  create table transactions (
  id_transaction serial primary key not null,
  id_user int not null,
  total int not null,
  date timestamp not null DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users (id_user)
  );