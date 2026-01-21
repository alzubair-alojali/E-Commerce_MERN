import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URL } from "../constants/BaseUrl"
import { useAuth } from "../context/auth/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [error,seterror] = useState<string>("")
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)

    const {login} = useAuth();
    const navigate = useNavigate();

    const onsubmit=async ()=>{
        const email=emailRef.current?.value
        const password=passwordRef.current?.value


        if(!email || !password){
            seterror("All fields are required")
            return
        }

        const response= await fetch(`${BASE_URL}/user/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email,password})
        })

        if(!response.ok){
            seterror("Login failed")
            return
        }

        const token = await response.json()

        if(!token){
            seterror("Invalid token received")
            return
        }

        login(email,token)
        navigate("/")

    }
    return (
        <Container>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4">
                    Login Page
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, width: '300px' }}>
                    <TextField label="Email" name="email" variant="outlined" inputRef={emailRef} />
                    <TextField label="Password" name="password" type="password" variant="outlined" inputRef={passwordRef} />
                    <Button variant="contained" onClick={onsubmit}>
                        Login
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage