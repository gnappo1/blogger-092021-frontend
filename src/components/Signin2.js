import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {UserContext} from '../context/user'
import {MessageContext} from '../context/message'
import {useContext, useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login';
import Cookies from 'universal-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const {login, user, setUser} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const history = useHistory()
    const [userObj, setUserObj] = useState({
        email: "",
        password: ""
    });
    const handleChange = ({target: {name, value}}) => {
        setUserObj({
            ...userObj,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const didItWork = await login(userObj)
        if (didItWork) {
            history.push("/profile")
        }
    };

    const responseGoogle = (response) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                // 'Authorization': `Bearer ${response.Zi.accessToken}`,
                'Content-Type': 'application/json',
                // 'access_token': `${response.Zi.accessToken}`
            },
            body: JSON.stringify(response)
        }
        fetch(`/api/v1/auth/google_oauth2/callback`, requestOptions)
        .then(res => {
          if (res.ok) {
            res.json().then(data => {
              setUser({...data.data.attributes, posts: data.data.relationships.posts.data})
              setMessage({message: "User successfully logged in", color: "green"})
            })
          }
          else {
            res.json().then(data => {
              setMessage({message: data.error, color: "red"})
            })
          }
        })
        .catch(err => setMessage({message: err.message, color: "red"}))
      }

    if (user) return <Redirect to="/profile" />

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userObj.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={userObj.password}
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div>
                <GoogleLogin height="10" width="500px" backgroundColor="#4285f4" clientId="82389295899-o8donpbsk9tqeafbkua37fk9o3f1qd6l.apps.googleusercontent.com" access="offline" scope="email profile" onSuccess={responseGoogle} onFailure={responseGoogle}/>
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}