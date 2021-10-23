import express from 'express';
import path from 'path'
import cors from 'cors'

const app = express()
const port = 3000
const __dirname = path.resolve();

const corsOptions ={
  origin: 'http://localhost:3000', 
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname, '/dist')));

app.get('/auth/github', (req, res) => {
  // res.redirect("http://localhost:8080")
  // console.log(res)
  // res.redirect('http://localhost:3000')
})

app.post('/auth/github', (req, res) => {
  // res.redirect('http://localhost:3000')
  // console.log(res)
})

app.get('http://localhost:3000/auth/callback', (req, res) =>  {
  console.log(req)
  res.redirect('http://localhost/3000')
})

// app.post('http://localhost:8080/auth/callback?code=6fac67f69a3f18877672', (req, res) => {
//   console.log(req)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})