import {useAuth} from '../../context/AuthContext.jsx';
import { useState } from 'react';
import api from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';
import { TextField,Button,Box,Typography } from '@mui/material';

export default function Login(){
    const {login, setLoading}=useAuth();
    const navigate=useNavigate();
    const [fields,setFields]=useState({
        email:"",
        password:"",
    });
    const [error,setError]=useState("");

    const handleChange=(e)=>{
        setFields({
            ...fields,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const res=await api.post('/auth/login',fields);
            login(res.data.user,res.data.token);
            navigate('/');
            setFields({email:"",password:""})
        } catch (error) {
            setError(error.response?.data?.message || "Login Failed")
        }
    };

    return(
        <Box maxWidth={400} mx="auto" p={3} mt={6} borderRadius={2} boxShadow={3} bgcolor="#fff">
            <Typography variant='h5' mb={2}>Log In</Typography>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth margin='normal' label="Email" name='email' value={fields.email} onChange={handleChange}/>
                <TextField fullWidth margin='normal' label="Password" name='password' value={fields.password} onChange={handleChange}/>
                <Button type='submit' fullWidth variant='contained' sx={{mt:2}}>Log In</Button>
                {
                    error && 
                    <Typography color='error' mt={1}>
                        {error}
                    </Typography>
                }
            </form>
        </Box>
    )
}