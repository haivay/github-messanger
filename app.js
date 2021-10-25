import express from 'express'
import path from 'path'
import querystring from 'querystring'
import jwt from "jsonwebtoken";
import pkg from 'lodash'
const { get } = pkg
import cookieParser from 'cookie-parser';
import cors from 'cors'
import axios from 'axios'

const app = express()
const port = 3000
const __dirname = path.resolve();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// app.use('/', express.static(path.join(__dirname, '/dist')));


const GITHUB_CLIENT_ID = '75691eac3da77485bbef';
const GITHUB_CLIENT_SECRET = 'd1e0f19f4135a0eb7d8cb45d37544d2ea7bfae3d';
const secret = "shhhhhhhhhhhh";
const COOKIE_NAME = "github-jwt";

async function getGitHubUser(code) {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      throw error;
    });

  const decoded = querystring.parse(githubToken);

  const accessToken = decoded.access_token;

  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user from GitHub`);
      throw error;
    });
}

app.get('/auth/callback', async (req, res) => {
  const code = get(req, "query.code");
  const path = get(req, "query.path", "/");

  if (!code) {
    throw new Error("No code!");
  }

  const gitHubUser = await getGitHubUser(code);

  const token = jwt.sign(gitHubUser, secret);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    domain: 'localhost'
  })

  res.redirect(`http://localhost:8080${path}`)
});

app.get('/api/me', (req, res) => {
  const cookie = get(req, `cookies[${COOKIE_NAME}]`);

  try {
    const decode = jwt.verify(cookie, secret)
    return res.send(decode)
  } catch (e) {
    return res.send(null)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})