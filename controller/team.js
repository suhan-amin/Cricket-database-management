const pool = require("../utils/db-config");


module.exports.fetch = async (req, res) => {
    try {
       

        const all = await pool.query("select m.team1, t.teamname, count( m.team1) as win ,count(m.team2)+count(distinct m.team1) as total from match m,team t where t.teamid=m.team1  group by m.team1,t.teamname ")


        console.log(all.rows)
        return all.rows;
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}


module.exports.team = async (req, res) => {
    try {


        const all = await pool.query("select * from team")


        console.log(all.rows)
        return all.rows;
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}


module.exports.insertvalue = async (req, res) => {
    try {
        const body = req.body;
        await pool.query("insert into Match values($1,$2,$3)", [body.matchid, body.team1,body.team2]);
        
        

        

        res.status(200).json();
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}