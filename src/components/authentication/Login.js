import React, { Component } from 'react';
// import { Form, Button, Container, Grid, Segment, Header, Message } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { loginUser } from '../auth/userManager';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link,Paper, Box, Grid, Typography} from '@material-ui/core'

export default class Login extends Component {

  state = {
    email: '',
    password: ''
  }

//   submit = () => {
//     loginUser(this.state.email, this.state.password)
//       .then((user) => {
//         this.props.onLogin(user);
//         this.props.history.push('/');
//       });
//   }
onSignInButtonClick = () => {
  // Open the Auth flow in a popup.
  window.open('http://localhost:8888/login', 'firebaseAuth', 'height=315,width=400');
};

    render() {
        return (
            <div>
                {/* <a href="http://localhost:8888/login"> */}
                    <button onClick={this.onSignInButtonClick}>Login to Spotify</button>
                {/* </a> */}
            </div>
        )
    }
}



{/* <Grid container component="main" className="root"> */}
            //     {/* <CssBaseline /> */}
            //     {/* <Grid item xs={false} sm={4} md={7} className="image" /> */}
            //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            //         <div className="paper">
            //         {/* <Avatar className="avatar">
            //             <LockOutlinedIcon />
            //         </Avatar> */}
            //         <Typography component="h1" variant="h5">
            //             Sign in
            //         </Typography>
            //         <form className="form" noValidate onSubmit={this.submit}>
            //             <TextField
            //             variant="outlined"
            //             margin="normal"
            //             required
            //             fullWidth
            //             id="email"
            //             label="Email Address"
            //             name="email"
            //             autoComplete="email"
            //             autoFocus
            //             onChange={(e) => this.setState({ email: e.target.value })}
            //             />
            //             <TextField
            //             variant="outlined"
            //             margin="normal"
            //             required
            //             fullWidth
            //             name="password"
            //             label="Password"
            //             type="password"
            //             id="password"
            //             autoComplete="current-password"
            //             onChange={(e) => this.setState({ password: e.target.value })}
            //             />
            //             <FormControlLabel
            //             control={<Checkbox value="remember" color="primary" />}
            //             label="Remember me"
            //             />
            //             <Button
            //             type="submit"
            //             fullWidth
            //             variant="contained"
            //             color="primary"
            //             className="submit"
            //             >
            //             Sign In
            //             </Button>
            //             <Grid container>
            //             {/* <Grid item xs>
            //                 <Link href="#" variant="body2">
            //                 Forgot password?
            //                 </Link>
            //             </Grid> */}
            //             <Grid item>
            //                 <Link href="/register" variant="body2">
            //                 {"Don't have an account? Sign Up"}
            //                 </Link>
            //             </Grid>
            //             </Grid>
            //             <Box mt={5}>
            //             {/* <MadeWithLove /> */}
            //             </Box>
            //         </form>
            //         </div>
            //     </Grid>
            // </Grid>