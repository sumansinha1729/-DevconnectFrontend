import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext.jsx';
import api from '../../utils/api.js';
import { useState } from 'react';
import {TextField,Box,Button,Typography,Avatar} from "@mui/material"

export default function Signup(){
    const {login,setLoading}=useAuth();
    const navigate=useNavigate();
    const [fields,setFields]=useState({
        name:"",
        email:"",
        password:"",
        avatar:""
    });
    const [error,setError]=useState("");

    const handleChange=(e)=>{
        setFields({...fields,
            [e.target.name]:e.target.value
        })
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res=await api.post('/auth/signup',fields);
            login(res.data.user,res.data.token);
            navigate('/');
            setFields({ name: "", email: "", password: "", avatar: "" });
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed")
        }
    };

    return(
        <Box maxWidth={400} mx="auto" p={3} mt={6} borderRadius={2} boxShadow={3} bgcolor="#fff">
          <Typography variant='h5' mb={2}>Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin='normal' label='Name' name='name' value={fields.name} onChange={handleChange} required/>
            <TextField fullWidth margin='normal' label='Email' name='email' value={fields.email} onChange={handleChange} required/>
            <TextField fullWidth margin='normal' label='Password' name='password' value={fields.password} onChange={handleChange} required/>
            <TextField fullWidth margin='normal' label='Avatar URL' name='avatar' value={fields.avatar} onChange={handleChange} required={false}/>
            <Button type='submit' fullWidth variant='contained' sx={{mt:2}} >Sign Up</Button>
            {
                error && 
                <Typography color='error' mt={1}>{error}</Typography>
            }
          </form>
        </Box>
    )
}