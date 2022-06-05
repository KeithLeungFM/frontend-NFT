import * as React from 'react';
import {useState, useEffect} from 'react';


import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();



export default function Album() {

const navToMint = function(event){
  window.location.href='/mint'
}
const navToOpensea = function(event){
  window.location.href='https:opensea.io'
}

/*
numberOnDisplay: number


get the last 20?
number + 20

display:

*/
/*
    const [queryStartToken, setQueryStartToken] = useState(0)
    const [gallery, setGallery] = useState([])
    const queryGallery = ()=>{
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
            body: JSON.stringify({
                queryStartToken: queryStartToken,
                numberOfTokens: 20
            })
          };
          fetch('http://localhost:5000/gallery', requestOptions)
              .then((response) => {
                response.json().then(data=>{
                    setGallery(data)
                })

              })
    }

    queryGallery(queryStartToken,20)
    */
   
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Blockchain Stories
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              BLOCKCHIAN STORIES 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Own a moment in time on the blockchain! Great for birthday gifts, celebrations, and much more!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={navToMint}>Mint Now</Button>
              <Button variant="outlined" onClick={navToOpensea}>View on Opensea</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}

        </Container>
      </main>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
}