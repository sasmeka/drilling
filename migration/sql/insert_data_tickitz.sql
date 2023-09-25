truncate table booking,users,time_schedule,schedule,premier,location,village,subdistrict,regency,province,movie_cast,movie_genre,movie,casts,genre,director;

--=======================================================================================================================
--insert
INSERT INTO province (id_province, name_province) values (1, 'Jawa Timur');
INSERT INTO regency (id_regency, id_province, name_regency) values (1, 1, 'Surabaya'), (2, 1, 'Sidoarjo');
INSERT INTO subdistrict (id_subdistrict, id_regency, name_subdistrict) values (1, 1, 'Tegalsari'),(2, 1, 'Wonokromo');
INSERT INTO village (id_village, id_subdistrict, name_village) values (1, 1, 'Kedungdoro'), (2, 2, 'Wonokromo');
INSERT INTO location (id_location, id_village, street, building) values (1, 1, 'Jl. Jenderal Basuki Rachmat No.8-12', 'Tunjungan Plaza'), (2, 2, 'Jl. A Yani No. 16-18', 'Royal Plaza');
INSERT INTO director(id_director, name_director)VALUES(1, 'Eiichiro Oda'),(2, 'Manabu Ono'),(3, 'Masaki Yoshimura'),(4, 'Tomoya Tanaka'),(5, 'Haruo Sotozaki');
INSERT INTO premier (id_premier, name_premier, image, count_row_seat, count_col_seat) VALUES(1, 'ebv.id', 'logo_ebv_id.png', 7, 14),(2, 'cineone21', 'cineone21', 7, 14),(3, 'hiflix', 'hiflix', 7, 14);
INSERT INTO users (id_user, first_name, last_name, phone, email, pass, status_verification,role) values (1, 'admin', ' ', '087654321', 'admin@mail.com', '$2b$10$Z4qI9SysmdcMGlSjuypNxOSlk3TnQFJnSAaW6zJOvPyFxDPV7eoLG', '1','admin');

--==================== CRUD MOVIE =======================
insert into movie (id_movie,id_director, title, release_date, duration_hour, duration_minute, synopsis, image) values
(1,1,'One Piece','1999-10-20',2,30,'Gol D. Roger dikenal sebagai Raja Bajak Laut, ...','poster_one_piece.png'),
(2,2,'Dead Mount Death Play','2023-04-23',2,30,'Perseteruan antara pahlawan legendaris melawan dewa necromancer telah berlangsung ...','poster_dead_mount_death_play.png'),
(3,3,'My Home Hero','2023-04-02',2,30,'Tetsuo Tosu, seorang pegawai biasa, menemukan putrinya, Reika, telah disik...','poster_my_home_hero.png'),
(4,4,'Mashle','2023-04-08',2,30,'Magic and Muscles. Ini adalah dunia sihir. Keberadaan ilmu sihi...','poster_omashle.png'),
(5,5,'Kimetsu no Yaiba','2019-04-06',2,30,'Diceritakan ketika umat manusia diteror oleh iblis jahat yang melahap jiwa manu...','poster_kimetsu_no_yaiba.png');
--insert movie cast
INSERT into casts (id_cast, name_cast) values (1, 'Mayumi Tanaka'),(2, 'Kazuya Nakai'),(3, 'Akemi Okamura'),(4, 'Inori Minase'),(5, 'Yuuki Sakakihara'),(6, 'Yuuma Uchida'),(7, 'Kento Itou'),(8, 'Junichi Suwabe'),(9, 'Rumi Ookubo'),(10, 'Chiaki Kobayashi'),(11, 'Reina Ueda'),(12, 'Kaito Ishikawa'),(13, 'Natsuki Hanae'),(14, 'Akari Kitou'),(15, 'Hiro Shimono');
INSERT INTO movie_cast (id_movie_cast, id_movie, id_cast) VALUES(1, 1, 1),(2, 1, 2),(3, 1, 3),(4, 2, 4),(5, 2, 5),(6, 2, 6),(7, 3, 7),(8, 3, 8),(9, 3, 9),(10, 4, 10),(11, 4, 11),(12, 4, 12),(13, 5, 13),(14, 5, 14),(15, 5, 15);

--==================== CRUD GENRE =======================
insert into genre (id_genre,name_genre) values 
(1,'action'),(2,'comedy'),(3,'parody'),(4,'fantasy'),(5,'school'),(6,'shounen'),(7,'drama'),(8,'crime'),(9,'super power'),(10,'seinen');

INSERT INTO movie_genre (id_movie, id_genre) values (1, 1),(1, 2),(1, 7),(1, 6),(1, 9),(2, 1),(2, 4),(2, 10),(3, 7),(3, 8),(4, 1),(4, 2),(4, 3),(4, 5),(4, 6),(4, 4),(5, 1),(5, 4),(5, 6);

--==================== CRUD SCHEDULE =======================
insert into schedule (id_schedule, id_movie, id_location, id_premier, price, date_start, date_end) values
(1,1,1,3,50000,'2023-05-01','2023-05-02'),
(2,1,1,2,40000,'2023-05-01','2023-05-03'),
(3,1,2,2,40000,'2023-05-01','2023-05-02'),
(4,4,2,3,50000,'2023-05-01','2023-05-05'),
(5,4,1,1,35000,'2023-05-01','2023-05-05');

--insert time
INSERT INTO time_schedule (id_time_schedule,id_schedule, time_schedule) values
(1,1, '10:00:00'),(2,1, '14:00:00'),(3,1, '18:00:00'),
(4,2, '10:00:00'),(5,2, '14:00:00'),(6,2, '18:00:00'),
(7,3, '10:00:00'),(8,3, '14:00:00'),(9,3, '18:00:00'),
(10,4, '10:00:00'),(11,4, '14:00:00'),(12,4, '18:00:00'),
(13,5, '10:00:00'),(14,5, '14:00:00'),(15,5, '18:00:00');

--==================== CRUD BOOKING =======================

INSERT INTO booking (id_booking, id_time_schedule, id_user, seats, selected_date, create_at) values 
(1, 1, 1, '{"F6","F7"}', '2023-05-02', '2023-05-27 16:34:14.637');
