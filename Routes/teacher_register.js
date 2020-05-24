module.exports = (app,Swal, path, knex) => {
    app.post("/teacher_register", (req, res) =>{
        if (req.body.name === "" || req.body.email === "" || req.body.whats_app_number === "" || req.body.institute === "" || req.body.board_of_institute === ""){
            console.log({"suggetion": "please fill all contents!"});
            res.send({"suggetion": "please fill all contents!"})
        }else{
            knex
            .select('*').from('teacher_register')
            .where({"name": req.body.name, "email": req.body.email, "whats_app_number": req.body.whats_app_number, "institute": req.body.institute, "board_of_institute": req.body.board_of_institute})
            .then((data) =>{
                console.log(data);
                if (data.length<1){
                    knex('teacher_register')
                    .insert(req.body)
                    .then((result) =>{
                        knex
                        .select('*')
                        .from('teacher_register')
                        .where('email', req.body.email)
                        .then((data) =>{
                            console.log({"success": "signup successfully..."})
                            console.log({"data": data});
                            res.sendFile((path.join(__dirname, '../animadrive/submit.html')));
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    console.log({"exist": "this user alredy exists.."});
                    res.send({"exist": "this user alredy exists.."});
                    // Add notification (User already exist!)
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })
}