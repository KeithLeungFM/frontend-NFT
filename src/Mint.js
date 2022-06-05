import * as React from 'react';
import {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { extractEventHandlers } from '@mui/base';

import {ethers} from 'ethers';
import BlockchainStories from "./contract/BlockchainStories.json"


const theme = createTheme();

export default function Edit() {
  const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS
  const [baseImg, setBaseImg] = useState('https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1497&q=80')
  const [draftImg, setDraftImg] = useState({
    uri: '',
    time: new Date()
  })
  const [fontColor, setFontColor] = useState('white')
  const [message, setMessage] = useState('')
  const [userAddress, setUserAddress] = useState('0xaddress')
  const [timer, setTimer] = useState(true)

  const [imageIsValid, setImageIsValid] = useState(true)

  const contractAddress = '0x0354dc7e46616d39c37907df45bcab86596acab8'


  const refreshUserAddress = async function(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask

    const signer = provider.getSigner();    
    const contract = new ethers.Contract(contractAddress, BlockchainStories.abi, signer)

    const connection = contract.connect(signer);
    const addr = await connection.address;
    setUserAddress(addr)
  }
  refreshUserAddress()



  const handleChangeMsg = function (event) {
    const updatedMsg = event.target.value;
    setMessage(updatedMsg)
  }

  const handleChangeBaseImg = function (event) {
    const updatedBaseImg = event.target.value;
    setBaseImg(updatedBaseImg)
  }

  const handleSetFontColorToBlack = function(event){
    console.log('blac')
    setFontColor('black')
  }
  const handleSetFontColorToWhite = function(event){
    console.log('whit')

    setFontColor('white')
  }
  const mintToken = async(callback1) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
    const signer = provider.getSigner();    
    const contract = new ethers.Contract(contractAddress, BlockchainStories.abi, signer)
    const connection = contract.connect(signer);
    const addr = await connection.address;
    console.log(addr)

    const randomNumber = Math.random().toString(36).slice(2)
    const result = await contract.payToMint(addr, randomNumber, "message", {
      value: ethers.utils.parseEther('0.05'),
    })
    if(result){
      console.log(result)
      callback1(userAddress)
    }else{
    }
  }

  const createImgPath = async function (userAddress){
    //Create a http url for the img
    const requestOptions = {
      method: 'POST',
      mode:'cors',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body: JSON.stringify({ "userAddress":userAddress, "msg": message
      })
    };
    fetch(`https://${backendAddress}/createImgPath`, requestOptions)
        .then((response) => {
          response.json().then(data=>{
            if(typeof(data)=='number'){
              let tokenId = data
              alert(tokenId)
            }else{
              console.log(data)
              alert("Error occured. Please try again later")
            }
          })
        })  
  }

  const handleSubmit = (event) => {
    console.log("Submit")
    event.preventDefault();
    mintToken(createImgPath)
  };

  const handleCreateImg = event => {
    if(timer){clearTimeout(timer)}
    setTimer(
      setTimeout(()=>{
        const requestOptions = {
          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
          body: JSON.stringify({ "baseImg": baseImg, "message": message, "userAddress":userAddress, "time":new Date().toDateString() + ' | '+ new Date().toLocaleTimeString(),
          "color":fontColor
        })
        };
        fetch(`https://${backendAddress}/createImg`, requestOptions)
            .then((response) => {
              response.json().then(data=>{
                if(data=="Success"){
                  setImageIsValid(true)
                  setDraftImg({uri:`https://${backendAddress}/draft/${userAddress}.png`,time: new Date()})
                }else{
                  setImageIsValid(false)
                  console.log("ERROR IN CREATING IMG")
                }
              })
            })  
        },1500)
    )
  }

  useEffect(()=>{
    handleCreateImg();
  },[message, baseImg, fontColor])


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{

            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            backgroundColor='grey'
          >

          <div>
            <img src={`${draftImg.uri}?${draftImg.time}`} height="360"></img> 
          </div>

            
          </Grid> 
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              Design your NFT
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                error={!imageIsValid}
                name="image"
                label={imageIsValid ? "Image Link" : "Invalid image link"}
                placeholder="Place your own image link here"
                type="Image Link"
                onChange={handleChangeBaseImg}

              />
              <TextField
                placeholder="Write a meaningful message that will appear in the blockchain!"
                multiline
                rows={12}
                maxRows={12}
                margin="normal"
                fullWidth
                label="Your message here"
                autoFocus
                name="message"
                value={message}
                onChange={handleChangeMsg}
              />

              <ButtonGroup variant="outlined" size="small" aria-label="">
                <Button variant="disabled" style={{color:"black", fontWeight:"700"}}>Font Color</Button>
                <Button style={{color:"black", fontWeight:"600"}} onClick={handleSetFontColorToBlack}>Black</Button>
                <Button style={{color:"grey", fontWeight:"600"}} onClick={handleSetFontColorToWhite}>White</Button>
              </ButtonGroup>
              <Button onClick={handleCreateImg}>Refresh Image</Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                MINT
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="../" variant="body2">
                    Go Back
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">

                  </Link>
                </Grid>
              </Grid>


            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}