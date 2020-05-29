import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Button, Card, CardBody, Alert, CardHeader, Col ,Container, Jumbotron, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Home extends Component {
   state = {
    members: [],
    count:''
  }


  componentDidMount() {
    axios.get('miembros', {
          headers: {
            "Authorization" : 'Bearer ' + sessionStorage.getItem('jwtToken') 
          }
        }
      )
      .then( res => {
        
        const data = res.data.members;
        let members = this.state.members;
        console.log(data);

        for(let i = 0; i < data.length ; i++){
          console.log(data[i]);
          const hoy = new Date();
          const venc = new Date(data[i].end);
          console.log(hoy);
          console.log(venc);
          if(data[i].state == "ACTIVO" ){
          if(hoy>venc ){
            const id = data[i]._id;
            const name = data[i].name;
            const last_name = data[i].last_name;
            const start = data[i].start;
            const end = data[i].end;
            const state = "VENCIDO"
          members.push(
                <Col xs="12" sm="6" md="4" key={data[i]._id}>
           <Card className="text-white bg-danger">
              <CardHeader>
                Membresia Vencida
              </CardHeader>
              <CardBody>
                <p>La Membresia de {data[i].name}  {data[i].last_name}  ha vencido .</p>
                <Row>
              <Col> <Button onClick={  () => {
                    const data = this.state;

                          let url = 'miembros/update';


                          const params = {
                            method: 'post',
                            url: url,
                            data: { memberId: id, name: name ,last_name: last_name, start: start, end: end, state: state },
                            headers: {
                              "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
                            }
                          };

                          axios(params) 
                          .then( (response) => {
                            

                            window.location.reload();  
                            
                            console.log(response);
                          })
                          .catch( (response) => {
                            //handle error
                            alert("Error");
                            console.log(response);
                          });
              } }>Desactivar miembro</Button></Col>

             <Col> <Button href={'/#/Membresias/Renovar/'+id}>Renovar membresia</Button></Col>
              </Row>

                
               
              </CardBody>
            </Card>
           </Col> 

          );
        }
      }
        }

        this.setState({ members: members });

      })
      .catch( res => {
       // console.log("esta jodido");
        console.log(res);
      })
  }



  render() {
    
    return (
      <div className="animated fadeIn">
    
      <Row>
          
          {this.state.members}
      </Row>
        <Row>
          <Col>
            <Card>
              
              <CardBody>
                <Jumbotron>
                  <h1 className="display-3">Bienvenido a su Sistema de  control de caja .</h1>
                  <p className="lead">Este sistema calcula el total de ingresos por persona que ingresa al gimnasio, ventas de mebresias, etc.</p>
                  <hr className="my-2" />
                 
                  
                  
                </Jumbotron>
              </CardBody>
            </Card>
          </Col>
          
        </Row>

      </div>
      
    );
  }
}

export default Home;
