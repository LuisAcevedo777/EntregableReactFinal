import axios from 'axios';
import React from 'react';
import {Form, Button} from "react-bootstrap"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const{register, handleSubmit}=useForm()
    const navigate= useNavigate()

    const submit=(data)=>{
axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login/", data)
.then(res=> { 

    localStorage.setItem('token', res.data.token)

    navigate('/')
    })
.catch(error=>{ 

if(error.response.status=== 401){

    alert('Password error!')
}else{
    alert('No se puedo ingresar a la cuenta')
    console.log(error)

}})
    }

    return (
        <div className='divLogin'>
        <Form  className='login' onSubmit={handleSubmit(submit)}>
            
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register('email')} type="email" placeholder="Enter email" defaultValue='john@gmail.com'/>
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...register('password')} type="password" placeholder="Password" defaultValue='john1234'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
    
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    );
};

export default Login;