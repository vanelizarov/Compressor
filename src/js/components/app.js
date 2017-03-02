import React, {Component} from 'react';

// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';

import FrameView from './frameView';
import VirtualVideo from './virtualVideo';
import Logo from './logo';

import huffman from '../logic/huffman';


import {
    Grid,
    Row,
    Col,
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap';

import types from '../logic/types';

class App extends Component {

    render() {


        return (
            <div>
                <Navbar inverse={true} fluid={true}>
                    <Navbar.Header>

                        <Navbar.Brand>
                            <Logo />
                        </Navbar.Brand>

                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1}>Frames</NavItem>
                            <NavItem eventKey={2}>Analytics</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <VirtualVideo />
                <Grid>
                    <Row>
                        <Col xs={12} sm={6}>
                            <FrameView original={true}/>
                            <FrameView original={false}/>
                            <FrameView original={false}/>
                        </Col>
                        <Col xs={12} sm={6}>
                            <FrameView original={false} encodeFunc={huffman.encode} compType={types.HUFFMAN_COMP} uncompType={types.HUFFMAN_UNCOMP}/>
                            <FrameView original={false}/>
                            <FrameView original={false}/>
                        </Col>

                    </Row>
                    {/*{*/}
                        {/*this.state.rows.map((row) => {*/}
                            {/*return (*/}
                                {/*<Row key={this.state.rows.indexOf(row)}>*/}
                                    {/*{*/}
                                        {/*row.map((col) => {*/}
                                            {/*return (*/}
                                                {/*<Col xs={12} sm={4} key={col}>*/}
                                                    {/*<FrameView type={col} />*/}
                                                {/*</Col>*/}
                                            {/*)*/}
                                        {/*})*/}
                                    {/*}*/}
                                    {/*<Col xs={12} sm={4}/>*/}
                                {/*</Row>*/}
                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                </Grid>
            </div>
        );
    }

}

export default App;