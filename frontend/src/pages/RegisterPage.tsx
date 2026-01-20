import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useRef, useState } from "react"
import { BASE_URL } from "../constants/BaseUrl"
import { useAuth } from "../context/auth/AuthContext"





const RegisterPage = () => {
    const [error,seterror] = useState<string>("")
    const firstNameRef=useRef<HTMLInputElement>(null)
    const lastNameRef=useRef<HTMLInputElement>(null)
    const emailRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)

    const {login} = useAuth();

    const onsubmit=async ()=>{
        const firstName=firstNameRef.current?.value
        const lastName=lastNameRef.current?.value
        const email=emailRef.current?.value
        const password=passwordRef.current?.value


        if(!firstName || !lastName || !email || !password){
            seterror("All fields are required")
            return
        }

        const response= await fetch(`${BASE_URL}/user/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({firstName,lastName,email,password})
        })

        if(!response.ok){
            seterror("Registration failed")
            return
        }

        const token = await response.json()

        if(!token){
            seterror("Invalid token received")
            return
        }

        login(email,token)
    }
    return (
        <Container>
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4">
                    Register Page
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, width: '300px' }}>
                    <TextField label="First Name" name="firstName" variant="outlined" inputRef={firstNameRef} />
                    <TextField label="Last Name" name="lastName" variant="outlined" inputRef={lastNameRef} />
                    <TextField label="Email" name="email" variant="outlined" inputRef={emailRef} />
                    <TextField label="Password" name="password" type="password" variant="outlined" inputRef={passwordRef} />
                    <Button variant="contained" onClick={onsubmit}>
                        Register
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )


}




export default RegisterPage