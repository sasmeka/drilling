const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset, id_user }) => {
    id_user = id_user == "" ? "" : escape("WHERE a.id_user = %L", id_user)
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id_booking,b.seats, b.selected_date, b.create_at, a.user_name, c.times,m.title,pri.premier, s.price,d.full_location,array_length(seats,1) as count_seat, (s.price * array_length(seats,1)) as total_payment FROM public.booking b
        left join (select id_user, json_agg(jsonb_build_object('id_user',id_user,'first_name',first_name,'last_name',last_name)) as user_name from users group by id_user) as a on a.id_user=b.id_user
        left join (select ts.id_time_schedule,ts.id_schedule, json_agg(jsonb_build_object('id_time_schedule',ts.id_time_schedule,'time_schedule',ts.time_schedule)) as times from time_schedule ts group by ts.id_time_schedule) as c on c.id_time_schedule = b.id_time_schedule
        left join schedule s on s.id_schedule = c.id_schedule
        left join (
        select l.id_location ,json_agg(jsonb_build_object('id_location',l.id_location,'address',concat('(',l.building,'), ',street ,', ',v.name_village,', ',s.name_subdistrict,', ',r.name_regency,', ',p.name_province))) as full_location  from "location" l
        left join village v on v.id_village = l.id_village 
        left join subdistrict s on s.id_subdistrict =v.id_subdistrict 
        left join regency r on r.id_regency = s.id_regency 
        left join province p on p.id_province = r.id_province group by l.id_location
        ) as d on s.id_location=d.id_location
        left join (select id_movie, json_agg(jsonb_build_object('id_movie',id_movie,'title', title)) as title from movie group by id_movie) m on m.id_movie = s.id_movie
        left join (select id_premier, json_agg(jsonb_build_object('id_premier',id_premier,'name_premier', name_premier)) as premier from premier group by id_premier) pri on pri.id_premier = s.id_premier ${id_user}
        ORDER BY id_booking desc LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT b.id_booking,b.seats, b.selected_date, b.create_at, a.user_name, c.times,m.title,pri.premier, s.price,d.full_location,array_length(seats,1) as count_seat, (s.price * array_length(seats,1)) as total_payment FROM public.booking b
        left join (select id_user, json_agg(jsonb_build_object('id_user',id_user,'first_name',first_name,'last_name',last_name)) as user_name from users group by id_user) as a on a.id_user=b.id_user
        left join (select ts.id_time_schedule,ts.id_schedule, json_agg(jsonb_build_object('id_time_schedule',ts.id_time_schedule,'time_schedule',ts.time_schedule)) as times from time_schedule ts group by ts.id_time_schedule) as c on c.id_time_schedule = b.id_time_schedule
        left join schedule s on s.id_schedule = c.id_schedule
        left join (
        select l.id_location ,json_agg(jsonb_build_object('id_location',l.id_location,'address',concat('(',l.building,'), ',street ,', ',v.name_village,', ',s.name_subdistrict,', ',r.name_regency,', ',p.name_province))) as full_location  from "location" l
        left join village v on v.id_village = l.id_village 
        left join subdistrict s on s.id_subdistrict =v.id_subdistrict 
        left join regency r on r.id_regency = s.id_regency 
        left join province p on p.id_province = r.id_province group by l.id_location
        ) as d on s.id_location=d.id_location
        left join (select id_movie, json_agg(jsonb_build_object('id_movie',id_movie,'title', title)) as title from movie group by id_movie) m on m.id_movie = s.id_movie
        left join (select id_premier, json_agg(jsonb_build_object('id_premier',id_premier,'name_premier', name_premier)) as premier from premier group by id_premier) pri on pri.id_premier = s.id_premier
         WHERE b.id_booking=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = (id_user) => {
    id_user = id_user == "" ? "" : escape("WHERE id_user = %L", id_user)
    return new Promise((resolve, reject) => {
        db.query(`select count(id_booking) as count_data from booking ${id_user};`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.addData = ({ id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.booking (id_time_schedule, id_user, seats, selected_date) values ($1,$2,$3,$4);', [id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve('booking data successfully added.')
            }).catch(() => {
                reject('booking data failed to add.\'')
            })
    })
}

model.updateData = ({ id_booking, id_time_schedule, id_user, seats, selected_date }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.booking SET id_time_schedule=$2, id_user=$3, seats=$4, selected_date=$5 where id_booking = $1;', [id_booking, id_time_schedule, id_user, seats, selected_date])
            .then(() => {
                resolve('booking data successfully updated.')
            }).catch(() => {
                reject('booking data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_booking }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_booking=$1', [id_booking])
            .then(() => {
                resolve('booking data successfully deleted.')
            }).catch(() => {
                reject('booking data failed to delete.\'')
            })
    })
}

module.exports = model