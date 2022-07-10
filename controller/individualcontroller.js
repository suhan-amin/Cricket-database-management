const pool = require("../utils/db-config");


module.exports.fetch=async(req, res)=> {
    try {
        if (req.query.usn) {
            const indi = await pool.query("select s.usn,s.fname,s.lname, p.score ,p.wicket  from Performance p ,Student s where s.usn=p.usn and p.usn=$1 ",[req.query.usn])
  
            console.log(indi.rows);
            res.status(200).json(indi.rows);
            return;
        } 

        const all = await pool.query("select s.usn,s.fname,s.lname, sum(p.score) as totalscore,sum(p.wicket) as totalwicket, max(p.score) as score ,max(p.wicket) as wicket from Performance p ,Student s where s.usn=p.usn  group by s.usn,s.fname,s.lname")
       
        console.log(all.rows[0])
        return all.rows;
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}

module.exports.fetchvalue = async (req, res) => {
    try {
        if (req.query.usn) {
            const indi = await pool.query("select s.usn,s.fname,s.lname, p.score ,p.wicket,p.matchid  from Performance p ,Student s where s.usn=p.usn and p.usn=$1 ", [req.query.usn])

            console.log(indi.rows);
            return indi.rows;
           
        }

        
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}


module.exports.insertvalue = async (req, res) => {
    try {
        const body = req.body;
        console.log(123,body);
        await pool.query("insert into Performance values($1,$2,$3,$4)", [body.matchid, body.usn, body.score, body.wicket]);


        const highest = await pool.query("select max(score) as score ,max(wicket) as wicket from performance where usn=$1 ", [body.usn]);


        await pool.query("update Student set hscore=$1,hwicket=$2 where usn=$3 ",[highest[0].score,highest[0].wicket,body.usn])

        res.status(200).json();
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
}