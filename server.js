const app=require('express');
const server=app();
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const port=process.env.PORT || 3000;
const path=require('path');
var username='hi49';var userroll=0;var paper1='random';var paper2='random';var time1Info=undefined;var time2Info=undefined;var paper1Score=undefined;var paper2Score=undefined;var maths1Score=undefined;var maths2Score=undefined;var physics1Score=undefined;var physics2Score=undefined;var chemistry1Score=undefined;var chemistry2Score=undefined;var attemptedPaper1=undefined;var notAttemptedPaper1=undefined;var correctPaper1=undefined;var incorrectPaper1=undefined;var paper1response=[];var paper2response=[];var incorrectPaper2=undefined;var correctPaper2=undefined;var notAttemptedPaper2=undefined;var attemptedPaper2=undefined;var paper2Correct=undefined;var paper2Incorrect=undefined;
server.use(cors({}));
server.use(app.json());
server.use(app.urlencoded({extended:true}));
server.use(app.static(path.join(__dirname,'../public')));
mongoose.connect(process.env.DATABASE_URI).then((connection)=>console.log("Connection to database successful...")).catch((error)=>console.error(error));
const schemaForUser = new mongoose.Schema({
    name:{type:String,required:true},
    rollno:{type:Number,required:true}
});
const schemaForPaper= new mongoose.Schema({
    name:{type:String,required:true},
    rollno:{type:Number,required:true},
    paperChoice:{type:String,required:true}
});
const testSchema1= new mongoose.Schema({
    name:{type:String,required:true},
    id:{type:Number,required:true},
    paper1Score:{type:Number,required:true},
    maths1Score:{type:Number,required:true},
    physics1Score:{type:Number,required:true},
    chemistry1Score:{type:Number,required:true},
    attemptsPaper1:{type:Number,required:true},
    unattemptedPAper1:{type:Number,required:true},
    correctPaper1:{type:Number,required:true},
    incorrectPaper1:{type:Number,required:true},
    testresponsePaper1:{type:[mongoose.Schema.Types.Mixed],required:true},
    timePaper1:{type:Number,required:true}
});
const testSchema2= new mongoose.Schema({
    name:{type:String,required:true},
    id:{type:Number,required:true},
    paper2Score:{type:Number,required:true},
    maths2Score:{type:Number,required:true},
    physics2Score:{type:Number,required:true},
    chemistry2Score:{type:Number,required:true},
    attemptsPaper2:{type:Number,required:true},
    unattemptedPaper2:{type:Number,required:true},
    correctPaper2:{type:Number,required:true},
    incorrectPaper2:{type:Number,required:true},
    testresponsePaper2:{type:[mongoose.Schema.Types.Mixed],required:true},
    timePaper2:{type:Number,required:true}
});
const rankSchema= new mongoose.Schema({
    name:{type:String,required:true},
    id:{type:Number,required:true},
    score:{type:Number,required:true}
});
const paperDetails= new mongoose.model('paperDetails',schemaForPaper);
const userDetails= new mongoose.model('userDetails',schemaForUser);
const test1Details = new mongoose.model('test1Details',testSchema1);
const test2Details = new mongoose.model('test2Details',testSchema2);
const rankDetails = new mongoose.model('rankDetails',rankSchema);
server.post('/name',[check('name').trim().isLength({min:3}).withMessage('Name must be of a minimum length of 3.').custom((val)=>{
    if(!(/^[A-Za-z\s]+$/.test(val))){
        throw new Error('Name must contain only alphabets.');
    }else{
        return true;
    }
})], async (req,res)=>{
    const errors = validationResult(req);
    if(!(errors.isEmpty())){
        return res.status(400).json({error:errors.array()});
    }
    return res.status(200).json({ error: [] }); 
});
server.post('/roll',[check('roll').trim().isLength({min:10,max:10}).withMessage('Application Number must contain exactly 10 digits.').isNumeric().withMessage('Application Number must contain only digits.')], async (req,res)=>{
    const errors=validationResult(req);
    if(!(errors.isEmpty())){
        return res.status(400).json({error:errors.array()});
    }
    return res.status(200).json({ error: [] }); 
});
server.post('/proxy_url',async (req,res)=>{
    username = req.body.name;userroll = req.body.roll;
    try{
        let result= await userDetails.create({name:username,rollno:userroll});console.log("Document created successfully!:");
        return res.status(200).json({message:"Details stored!"});
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"server couldn't send the details to database..."});
    }
});
server.get('/proxy_url', async (req,res)=>{
    try{
        let details = await userDetails.find({rollno:userroll});
        console.log('Document found successfully!:');
        return res.status(200).json(details);
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"server couldn't fetch data from the database..."});
    }
});
server.post('/first_paper_details', async (req,res)=>{
    paper1=req.body.paperChoice;
    try{
        let result= await paperDetails.create({name:username,rollno:userroll,paperChoice:paper1});console.log('Document created successfully!:');
        return res.status(200).json({message:"paper details stored!"});
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"server couldn't send the details to the database..."});
    }
});
server.get('/first_paper_details', async (req,res)=>{
    try{
        let details= await paperDetails.find({name:username,rollno:userroll,paperChoice:paper1});
        if((details.length)==0){
            details= await paperDetails.find({name:username,rollno:userroll,paperChoice:paper2});
            console.log("Document found successfully!:",details);
            return res.status(200).json(details);
        }else if((details.length)!=0){
            console.log("Document found successfully!:",details);
            return res.status(200).json(details);
        }
    }catch(error){
        console.error(error);
        res.status(500).json({error:"server couldn't fetch data from the database..."});
    }
});
server.put('/first_paper_details', async (req,res)=>{
    paper2=req.body.paperChoice;
    try{
        let details = await paperDetails.findOneAndUpdate({name:username,rollno:userroll,paperChoice:paper1},{$set:{name:username,rollno:userroll,paperChoice:paper2}});
        console.log('Document updated successfully!');
        return res.status(200).json({message:'Successfully updated the database...'});
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"server couldn't update the database..."});
    }
});
server.post('/test_info1', async (req,res)=>{
    maths1Score=req.body.maths1Score;physics1Score=req.body.physics1Score;chemistry1Score=req.body.chemistry1Score;paper1Score=req.body.paper1Score;correctPaper1=req.body.paper1Correct;incorrectPaper1=req.body.paper1Incorrect;attemptedPaper1=req.body.attemptedPaper1;notAttemptedPaper1=req.body.unattemptedPaper1;time1Info=req.body.paper1Time;paper1response=req.body.paper1Response;
    try{
        let details= await test1Details.create({name:username,id:userroll,paper1Score:paper1Score,maths1Score:maths1Score,physics1Score:physics1Score,chemistry1Score:chemistry1Score,attemptsPaper1:attemptedPaper1,unattemptedPAper1:notAttemptedPaper1,correctPaper1:correctPaper1,incorrectPaper1:incorrectPaper1,timePaper1:time1Info,testresponsePaper1:paper1response});
        console.log('Document sent to database successfully!');return res.status(200).json({message:"Document sent to database successfully!"});
    }catch(error){
        console.error(error);return res.status(500).json({error:"Server couldn't send data to the database..."});
    }
});
server.get('/test_info1', async (req,res)=>{
    try{
        let result= await test1Details.find({name:username,id:userroll});
        console.log('Document fetched successfully!');
        return res.status(200).json(result);
    }catch(error){
        console.error(error);return res.status(500).json({error:"Server couldn't fetch the data from database..."});
    }
});
server.post('/test_info2', async (req,res)=>{
    maths2Score=req.body.maths2Score;physics2Score=req.body.physics2Score;chemistry2Score=req.body.chemistry2Score;paper2Score=req.body.paper2Score;correctPaper2=req.body.paper2Correct;incorrectPaper2=req.body.paper2Incorrect;attemptedPaper2=req.body.attemptedPaper2;notAttemptedPaper2=req.body.unattemptedPaper2;time2Info=req.body.paper2Time;paper2response=req.body.paper2Response;
    try{
        let details= await test2Details.create({name:username,id:userroll,paper2Score:paper2Score,maths2Score:maths2Score,physics2Score:physics2Score,chemistry2Score:chemistry2Score,attemptsPaper2:attemptedPaper2,unattemptedPaper2:notAttemptedPaper2,correctPaper2:correctPaper2,incorrectPaper2:incorrectPaper2,timePaper2:time2Info,testresponsePaper2:paper2response});
        console.log('Document sent to database successfully!');return res.status(200).json({message:"Document sent to database successfully!"});
    }catch(error){
        console.error(error);return res.status(500).json({error:"Server couldn't send data to the database..."});
    }
});
server.get('/test_info2', async (req,res)=>{
    try{
        let result= await test2Details.find({name:username,id:userroll});
        console.log('Document fetched successfully!');
        return res.status(200).json(result);
    }catch(error){
        console.error(error);return res.status(500).json({error:"Server couldn't fetch the data from database..."});
    }
});
server.listen(port,url,()=>{
    console.log(`server running on ${port}`);
});