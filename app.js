// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();
const mongoose = require("mongoose");

const employee_data =require('./modals/employee')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://shifas:shifas369@cluster0.snkrm7g.mongodb.net/datasets?retryWrites=true&w=majority')

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


.then(() => {
    console.log("mongodb is connected successfully");

})
.catch((err) => {
    console.log("mongodb not connected" + err);
});




//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist", async (req, res) => {
    try {
        const data = await employee_data.find();
        console.log("data from get api or frontend= ", data);//to view in terminal
        res.send(data);//to view in postaman
    }


    catch (e) {
        console.log(`get error occured ${e}`);
    }
})



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req,res)=>{
    try{
        const data = await employee_data.findOne();
        console.log("data from get api using single api or frnt end= ",data);
        res.send(data);
    }
    catch (e){
        console.log(    `get error occured ${e}`);
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req, res) => {
    try {
        const item = req.body;//accessing incoming data
        console.log("data from postman or frontend= ", item);//to view in terminal
        const user = new employee_data(item);//compare data of postman with schema
        const savedUser = await user.save();//to save data
        res.send(savedUser);//to view in postaman
    }
    catch (e) {
        console.log(`post error occured ${e}`);
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id" , async(req,res)=>{
    try{
        
            const data = await employee_data.deleteOne(
                {
                     "_id": req.params.id
                     })
            console.log("data from delete api or frontend= ", data);//to view in terminal
            res.send(data);//to view in postaman
        }
        catch (e) {
            console.log(`delete error occured ${e}`);
        }
    })
    




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {

    try {
        const data = await employee_data.findByIdAndUpdate(
            {
                "_id": req.body._id,
            },
            {
                $set: {
                    "name": req.body.name,
                    "location": req.body.location,
                    "position": req.body.position,
                    "salary": req.body.salary
                }
            }
        );

        console.log("data from put api or frontend= ", data);//to view in terminal
        res.send(data);//to view in postaman


    }
    catch (e) {
        console.log(`update error occured ${e}`);
    }

})



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


const port = 3000;
app.listen(port, () => {
    console.log("server is sucessfully connected to port number 3000");
});
