
CREATE TABLE public.users (
	id serial4 NOT NULL,
	email text NOT NULL,
	pass text NOT NULL,
	fullname text NOT NULL,
	"role" int4 NOT NULL DEFAULT 1,
	create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
 CREATE TABLE public.posts (
	id_post serial primary key NOT NULL,
	user_id int not null, 
	title VARCHAR(255) not null,
  description text NOT NULL,
  create_at timestamp not null DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);