const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}


]
app.get('/api/courses',(req,res)=>{
res.send(courses);

});

app.get('/api/courses/:id',(req,res)=>{
   const course=courses.find(c=>c.id===parseInt(req.params.id))
   if (!course){
    res.status(404).send('This course with the given ID not found'); 

   } 
       res.send(course); 
    });

app.post('/api/courses',(req,res)=>{
   // const result= validateCourse(req.body);
   //console.log(result.error);
    const {error}= validateCourse(req.body);
    if (error){
    res.status(400).send(error.details[0].message);
    }
   const course={
    id:courses.length+1,
    name:req.body.name
};
res.send(course);

})

app.put('/api/courses/:id',(req,res) => {
//If not exsisting , return 404 page not found
const course=courses.find(c=>c.id===parseInt(req.params.id))
if (!course) res.status(404).send('This course with the given ID not found'); 
     res.send(course); 

     const {error}= validateCourse(req.body);
     if (error){
     res.status(400).send(result.error);
     }
     course.name=req.body.name;
     res.send(course);
 });


function validateCourse(course){
    const schema = Joi.object({ name: Joi.string() .min(3) .required(),
    });
    
    const result=schema.validate(course);
    return result;
}
//PORT
const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`Listenig port ${port}`));