import React, { Component } from 'react';
import axios from '../../AxiosFiles/axios.js';
import { Badge, Card, CardBody, CardHeader, Col, Button, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class Vencidas extends Component {

  
   // axios.get('colegios/',
     //   {headers: { "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken') }})
     state = {
    members: [],
    count:''
  }


  componentDidMount() {
    axios.get('miembros/membersOff', {
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
          
          members.push(
            <tr key={data[i]._id}>
                    <td><a href={'/#/Membresias/Detalle/'+data[i]._id}>{data[i].name} {data[i].last_name}</a></td> 
                    <td>{data[i].state}</td> 
                    <td>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                     <Button block color="dark" href={'/#/Membresias/Renovar/'+data[i]._id} >Renovar membresia</Button>
                                                 </Col>
                                                 
                                                </td>
                                              </tr>
          );
        }

        this.setState({ members: members });

      })
      .catch( res => {
       // console.log("esta jodido");
        console.log(res);
      })
  }





  render() {

   //let contenedor = this.state.vistas;



    return (
      <div className="animated fadeIn">
       <Card>
              <CardHeader>
                  
                <h3>{this.state.count} Membresias vencidas </h3>
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Nombres y Apellidos</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.members !== null)?this.state.members:(<tr><td></td></tr>) }
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
       

      </div>

    );
  }
}

export default Vencidas;