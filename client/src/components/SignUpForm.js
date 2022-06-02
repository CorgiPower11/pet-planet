import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

//import { createUser } from '../utils/API';
import Auth from '../utils/auth';
//TODO: set up ADD_USER reference from mutation.js file
import {ADD_USER} from '../utils/mutations';
//TODO: set up useMutation 
import {useMutation} from '@apollo/client';

//images not sure if it will work
import jarjar from "../assets/img/Jar-Jar.png";
import et from "../assets/img/ET.png";
import alien from "../assets/img/Alien.png"

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: "", email: "", password: "", petName: "", imgName: "", petType: "" });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  //TODO: set addUser mutation
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const { data2 } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data2);
  
      console.log(userFormData);
    //TODO: 
    try {
      //const response = await createUser(userFormData);
      //set up useMutation hook
      const {data} = await addUser({ variables: { ...userFormData }  });
      console.log(data);

      if (!data) {
        throw new Error("something went wrong!");
      }

      //pass in token recevied from mutation response
      Auth.login(data.addUser.token);
      //part of mutation use
      window.location.reload();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      petName: '',
      petType: ''
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='petName'>Pet Name</Form.Label>
          <Form.Control
            type='petName'
            placeholder='Name your pet name'
            name='petName'
            onChange={handleInputChange}
            value={userFormData.petName}
            required
          />
          <Form.Control.Feedback type='invalid'>Pet name is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='petType'>Pet Type</Form.Label>
          <Form.Control
            type='petType'
            placeholder='Your pet type'
            name='petType'
            onChange={handleInputChange}
            value={userFormData.petType}
            required
          />
          <Form.Control.Feedback type='invalid'>Pet type is required!</Form.Control.Feedback>
        </Form.Group>
        {/* not sure if this will work*/}
        <Form.Group>
          <Form.Check 
          inline
          label={alien}
          name="petType"
          type="radio"
          onChange={handleInputChange}
          value={userFormData.imgName}
          required
          />
          <Form.Check 
          inline
          label={et}
          name="petType"
          type="radio"
          onChange={handleInputChange}
          value={userFormData.imgName}
          required
          />
          <Form.Check 
          inline
          label={jarjar}
          name="petType"
          type="radio"
          onChange={handleInputChange}
          value={userFormData.imgName}
          required
          />
        </Form.Group>
        {/* not sure if this will work*/}

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;