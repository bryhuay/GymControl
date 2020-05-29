import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logoo.JPG'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment >
        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <center>
          <h1>GM GYM</h1>
          </center>
        </Nav>

        
        <Nav className="ml-auto" navbar>
          
              

          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
             <h6>Admin</h6>
             
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Cuenta</strong></DropdownItem>
              
              <DropdownItem onClick={ () => {
                                sessionStorage.setItem('jwtToken', null );
                                //props.action();
                                
                            } } href="/"><i className="fa fa-lock"></i> Cerrar Sesion</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
