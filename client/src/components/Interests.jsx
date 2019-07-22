import React, { useState, useEffect } from 'react';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const UserInfo = ({ id }) => {
  const [ genres, modGenres ] = useState([]);

  const [ subArr1, modSubArr1 ] = useState([]);
  const [ subArr2, modSubArr2 ] = useState([]);
  const [ subArr3, modSubArr3 ] = useState([]);

  const [ genre1, addGenre1 ] = useState(null);
  const [ genre2, addGenre2 ] = useState(null);
  const [ genre3, addGenre3 ] = useState(null);

  const [ subGenre1, addSubGenre1 ] = useState(null);
  const [ subGenre2, addSubGenre2 ] = useState(null);
  const [ subGenre3, addSubGenre3 ] = useState(null);

  const [ gender, editGender ] = useState(null);
  const [ preference, editPreference ] = useState(null);
  
  const [ bio, addBio ] = useState('')
  // const [ array, affectArray ] = useState([]);

  const handleChangeG = (event, func) => {
    event.preventDefault();
    const arr = genres.filter(e => {
      return e.name === event.target.value;
    })

    console.log('e', arr, arr[0].id);

    func(arr[0].id);
  };
  
  const handleChangeS = (event, func) => {
    event.preventDefault();
    console.log('etv', event.target.value);
    func(event.target.value);
  };

  // post user info to signup
  const interestSubmit = (data) => {
    // dont allow re-render until complete!
    // event.preventDefault();

    console.log(data);

    // return axios.patch(`/signup/${id}`, {
    //   interests: [ sub1, sub2, sub3 ],
    // }).then(() => console.log('greaattt success!!!'))
    //   .catch(err => console.warn(err));
  };

  useEffect(() => {
    // console.log(genre1, 'uf1');
    async function fetch() {
      const result = await axios.get(`/categories/${genre1}`);
      modSubArr1(result.data);
      // console.log('test uf1', subArr1);
    }
    fetch();
  }, [genre1])

  useEffect(() => {
    // console.log(genre2, 'uf1');
    async function fetch() {
      const result = await axios.get(`/categories/${genre2}`);
      modSubArr2(result.data);
      // console.log('test uf1', subArr2);
    }
    fetch();
  }, [genre2])

  useEffect(() => {
    async function fetch() {
      const result = await axios.get(`/categories/${genre3}`);
      modSubArr3(result.data);
      // console.log(result);
    }
    fetch();
  }, [genre3])

  useEffect(() => {
    let ignore = false;
    if(genres.length){
      ignore = true;
    }

    async function fetch() {
      const result = await axios.get('/categories');
      if (!ignore) {
        modGenres(result.data);
        // console.log(result);
      }
    }

    fetch();
    return () => ignore = true;
  }, []);

  return (
    <div>
      <Form onSubmit={interestSubmit}>

        <Form.Row>

          <Form.Group as={Col} controlId="formGender"> 
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" >
              <option value={null}>...   </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non Binary">NonBinary</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formPerfer"> 
            <Form.Label>Preference</Form.Label>
            <Form.Control as="select" >
              <option value={null}>...   </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non Binary">NonBinary</option>
            </Form.Control>
          </Form.Group>

        </Form.Row>

        <Form.Group controlId="formGender"> 
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" placeholder="Make it count!" >

          </Form.Control>
        </Form.Group>

        <Form.Group controlId="genre" className="1" >
          <Form.Label>1) Choose a Category!!</Form.Label>
          <Form.Control as="select"  onChange={(e) => handleChangeG(e, addGenre1)} >
          <option value={null}>...   </option>
            { 
              genres.map(e => {
                return (
                  <option key={e.id} >
                    {e.name}
                  </option>
                );
              }) 
            }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sub-genre" className="1" >
          <Form.Label>Now be More Specific</Form.Label>
          <Form.Control as="select" multiple onChange={(e) => handleChangeS(e, addSubGenre1) }>
          <option value={null}>...   </option>
            { 
              genre1 ? 
              subArr1.map(e => {
                return (
                  <option key={e.id} value={e.name}  >
                    {e.name}
                  </option>
                );
              }) 
              :
              <></>
            }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="genre" className="2" >
          <Form.Label>2) Choose a Category!!</Form.Label>
          <Form.Control as="select" onChange={(e) => handleChangeG(e, addGenre2) }>
          <option value={null}>...   </option>
            { 
              genres.map(e => {
                return (
                  <option key={e.id} >
                    {e.name}
                  </option>
                );
              }) 
            }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sub-genre" className="2" >
          <Form.Label>Now be More Specific</Form.Label>
          <Form.Control as="select" multiple onChange={(e) => handleChangeS(e, addSubGenre2) }>
          <option value={null}>...   </option>
            { 
              subArr2 == [] ? 
              <></>
              :
              subArr2.map(e => {
                return (
                  <option key={e.id} value={e.name}  >
                    {e.name}
                  </option>
                );
              }) 
            }
          </Form.Control>
        </Form.Group><Form.Group controlId="genre" className="3">
          <Form.Label>3) Choose a Category!!</Form.Label>
          <Form.Control as="select" onChange={(e) => handleChangeG(e, addGenre3) }>
          <option value={null}>...   </option>
            { 
              genres.map(e => {
                return (
                  <option key={e.id} >
                    {e.name}
                  </option>
                );
              }) 
            }
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sub-genre" className="3">
          <Form.Label>Now be More Specific</Form.Label>
          <Form.Control as="select" multiple onChange={(e) => handleChangeS(e, addSubGenre3)}>
          <option value={null}>...   </option>
            { 
              subArr3 == [] ? 
              <></>
              :
              subArr3.map(e => {
                return (
                  <option key={e.id} value={e.name} >
                    {e.name}
                  </option>
                );
              }) 
            }
          </Form.Control>
        </Form.Group>
      </Form>
      <Button /* variant="success" size="lg" */ block type="submit"> 
        Submit 
      </Button>
    </div>
  );  
}

export default UserInfo; 