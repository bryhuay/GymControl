import React, {Component} from 'react';
import { Badge, Card, CardBody ,CardHeader,  Fade,  Form,  FormGroup,  FormText,  FormFeedback,  Input,  InputGroup,  InputGroupAddon,  InputGroupText,  Label,Col, Button ,Nav, NavItem, NavLink,  TabContent, TabPane, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import classnames from 'classnames';
import axios from '../../AxiosFiles/axios.js';

class Buscar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.reportToday = this.reportToday.bind(this);
    this.reportByday = this.reportByday.bind(this);
    this.handleAttribute = this.handleAttribute.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      records:[],
      recordsd:[],
      datee:'',
      total:'',
      totald:'',
      day:'',
      month:'',
      year:''
    }
  }
  handleAttribute(e){
    var attr = e.target.value;
    var attrName = e.target.id;
    this.setState({ [attrName]: attr });
  }
  reiniciar = () => {
    this.setState({ recordsd : [] , totald: ''})
  }

  reportToday = () => {
    const data = this.state;

   // let url = 'usuarios/';
   let hoy = new Date();
  
    let day = hoy.getDate();
    let month = hoy.getMonth();
    let year = hoy.getFullYear();
   
   


    const params = {
      method: 'post',
      url: 'registros/recordsByDay',
      data: { year:year , month:month, day:day},
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };

    axios(params) 
    .then( (response) => {

      const dataa = response.data.records;
      let records = this.state.records;
      
       
        
        console.log("ventas");
        console.log(dataa);
      let total = 0; 

        for(let i = 0; i < dataa.length ; i++){
          console.log(dataa[i]);
          total += dataa[i].price;
          


          records.push(
                   <tr key={dataa[i]._id}>
                    <td>{dataa[i].description}</td> 
                    <td>{dataa[i].price}</td> 
                     </tr>

          );
        }
      
        this.setState({ records: records , total: total });
    })
    .catch( (response) => {
      //handle error
      alert("Error");

      console.log(response);
    });

  }

 reportByday = () => {
     const data = this.state;

   // let url = 'usuarios/';
 
   //let dia =  new Date(data.year, data.month, data.day);
  
    //let day = dia.getDate();
    //let month = dia.getMonth();
    //let year = dia.getFullYear();
    
    

    const params = {
      method: 'get',
      url: 'registros/',
    
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    };
    //console.log(dia);
    console.log(params);

    axios(params) 
    .then( (response) => {

      const dataa = response.data.records;
      let recordsd = this.state.recordsd;
      
       
        
        console.log("ventas");
        console.log(dataa);
      let total = 0; 

        for(let i = 0; i < dataa.length ; i++){
          console.log(dataa[i]);
          total += dataa[i].price;
          


          recordsd.push(
                   <tr key={dataa[i]._id}>
                    <td>{dataa[i].description}</td> 
                    <td>{dataa[i].price}</td> 
                     </tr>

          );
        }
      
        this.setState({ recordsd: recordsd , totald: total });
    })
    .catch( (response) => {
      //handle error
      alert("Error");

      console.log(response);
    });
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    const today = new Date();
    return (
      <>
        <TabPane tabId="1">
           <Button type="button" color="primary" onClick={this.reportToday} ><i className="fa fa-search"></i> Reporte de hoy  </Button>
            <br/>
            <br/>
            <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Descripcion</th>
                    <th>Precio</th>
                   
                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.records !== null)?this.state.records:(<tr><td></td></tr>) }
                  </tbody>

                </Table>
                <Table responsive bordered>
                  
                  <tbody>
                 <tr>
                  <td><strong>Total------</strong></td>
                  <td>{this.state.total}</td>
                 </tr>
                  </tbody>
                  
                </Table>
        </TabPane>
        <TabPane tabId="2">
          <Button type="button" color="primary" onClick={this.reportByday} ><i className="fa fa-search"></i> Total de ingresos  </Button>
            
                   <br/>
            <br/>
                    <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Descripcion</th>
                    <th>Precio</th>
                   
                  </tr>
                  </thead>
                  <tbody>
                  { (this.state.recordsd !== null)?this.state.recordsd:(<tr><td></td></tr>) }
                  </tbody>

                </Table>
                <Table responsive bordered>
                  
                  <tbody>
                 <tr>
                  <td><strong>Total------</strong></td>
                  <td>{this.state.totald}</td>
                 </tr>
                  </tbody>
                  
                </Table>
        </TabPane>
       
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Reporte de hoy 
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Reporte total 
                </NavLink>
              </NavItem>
              
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
          
          
        </Row>
       
         
      </div>
    );
  }
}

export default Buscar;
