import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner} from 'reactstrap';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import swal from 'sweetalert';
import { set } from 'js-cookie';

let email;
let name;
const Support = (props) => {
  //const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  //const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const GET_SHOP = gql `
  {
    shop{
      name
      email
    }
  }
`;
const {loading, error, data} = useQuery(GET_SHOP);
  if(loading){return 'loading';}
  if(error){return 'error: ' + error.message}
  if(data){
    name = data.shop.name;
    email = data.shop.email;
  }


  function handleChange(event) {
    switch (event.target.id) {
      case "message":
        setMessage(event.target.value);
        break;
    }    
  }

  function handleSubmit(event){
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, phoneNumber: phone, email: 'miguel.moreno2512@gmail.com', message: message, toemail:email })
    }).then(response =>{
      if (response.status == 200) {
        swal("Well Done!", "A message has been sent to platform administrators. You will receive a response via email.", "success");
        setMessage("");
        setVisible(true);
      }
      
    });
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, phoneNumber: phone, email: 'adriandvillalobos@gmail.com', message: message, toemail:email })
    }).then(response =>{
      if (response.status == 200) {
      }
      
    });
    event.preventDefault();
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
{/*       <FormGroup>
        <Label for="FullName">Full Name:</Label>
        <Input type="text" className="form-control" value={name} onChange={handleChange} id="fullName" />
      </FormGroup>
      <FormGroup>
        <Label for="phoneNumber">Phone Number:</Label>
        <Input type="number" className="form-control" value={phone} onChange={handleChange} id="phoneNumber"/>
      </FormGroup>
      <FormGroup>
        <Label for="Email">Email:</Label>
        <Input type="email" className="form-control" value={email} onChange={handleChange} id="email"/>
      </FormGroup> */}
{/*       <FormGroup>
        <Label for="StoreName">Store Name:</Label>
        <Input type="select" className="form-control" name="select" id="storeName">
          <option>AbsoluteAnime.com</option>
        </Input>
      </FormGroup> */}
      <FormGroup>
        <Label for="Message">Message:</Label>
        <Input type="textarea" className="form-control" value={message} onChange={handleChange} id="message" />
      </FormGroup>
      <FormGroup className="text-right">
      <Button type="submit" className="btn btn-support">Send <span class="iconify" data-icon="mdi:send" data-inline="false"></span></Button>
      </FormGroup>
    </Form>
    </div>
    
  );
}

export default Support;
