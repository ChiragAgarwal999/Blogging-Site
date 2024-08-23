const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const PostModel = require("./models/Post")
const multer = require("multer");
const UserModel = require("./models/User")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
// app.use(cors())
app.use(cors({ origin: 'http://127.0.0.1:5173', credentials: true }));
app.use(express.static('public'))
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/blog2')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/uploads/');
      },
    filename:(req, file, cb)=>{
      cb(
        null, `${Date.now()}_${file.originalname}`
      );
    },
  });

  var upload = multer({ storage: storage })

  app.post('/create', upload.single('file'), (req, res) => {
    PostModel.create({title: req.body.title, 
        description: req.body.description, 
        file: req.file.filename, 
        email: req.body.email})
    .then(posts => res.json(posts))
    .catch(err => res.json(err)) 
  })

  app.get('/getPost',(req,res)=>{
    PostModel.find({})
    .then(posts => res.json(posts))
    .catch(err => res.json(err)) 
  })
  
  app.get('/getPost/:id',(req,res)=>{
    const id = req.params.id
    PostModel.findById({_id:id})
    .then(posts => res.json(posts))
    .catch(err => res.json(err)) 
  })


  app.put('/editPost/:id',upload.single('file'),(req,res)=>{
    const id = req.params.id
    const updateData = {
      title: req.body.title,
      description: req.body.description,
  };
  if (req.file) {
    updateData.file = req.file.filename;
}
    PostModel.findByIdAndUpdate({_id:id},updateData,{ new: true })
    .then(posts => res.json(posts))
    .catch(err => res.json(err)) 
  })

  app.delete("/deletePost/:id", (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndDelete({ _id: id })
    .then(posts => res.json(posts))
    .catch(err => res.json(err)) 
})


app.post("/register", async(req,res)=>{
    const {name,age,email,password}=req.body;
    let existingUser = await UserModel.findOne({email})
    if(existingUser){
       return res.status(400).json("User Already Exists");
  }
      bcrypt.hash(password,10)
      .then(hash=>{
           UserModel.create({name,age,email,password:hash,isAdmin:false,isBlock:false})
          .then(user => {
            const token = jwt.sign({ email: user.email, name: user.name }, 'My-Secret-Key', { expiresIn: "1d" });
                        res.cookie('token', token, { httpOnly: true });
                        return res.json(user);
            // res.json(user)
          })
          .catch(err => res.json(err)) 
      }).catch(err => console.log(err.message))
})

app.post("/login", (req, res) => {
  const { email, password} = req.body;
  UserModel.findOne({ email: email })
      .then(user => {
          if (user) {
              bcrypt.compare(password, user.password, (err, result) => {
                  if (result) {
                      const token = jwt.sign({ email: user.email, name: user.name }, 'My-Secret-Key', { expiresIn: "1d" });
                      res.cookie('token', token, { httpOnly: true });
                      return res.json('Success');
                  } else {
                      return res.json('Password is incorrect');
                  }
              });
          } else {
              return res.json('User not exist');
          }
      })
      .catch(err => {
          return res.status(500).json(err);
      });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json('Success')
})   

app.get('/user',async(req,res)=>{

    await UserModel.find({})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.get('/user/:id',async(req,res)=>{
  const id = req.params.id;
    await UserModel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/user/:id',async(req,res)=>{
  const id = req.params.id;
    await UserModel.findByIdAndUpdate({ _id: id },{isAdmin: req.body.isAdmin,isBlock:req.body.isBlock})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.delete('/user/:id',async(req,res)=>{
  const id = req.params.id;
    await UserModel.findByIdAndDelete({ _id: id } )
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.get('/admin/:email',async(req,res)=>{
  const email = req.params.email;
    await UserModel.findOne({ email })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.listen(8080,()=>{
    console.log("Server is running at port 8080")
})