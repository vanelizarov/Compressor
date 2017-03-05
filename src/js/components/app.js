import React, {Component} from 'react';

import FrameView from './frameView';
import VirtualVideo from './virtualVideo';
import Logo from './logo';

import huffman from '../logic/huffman';
import rle from '../logic/rle';
import lzw from '../logic/lzw';
import curved from '../logic/curved';

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
                <Navbar inverse={true}
                        fluid={true}>
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
                <Grid fluid={true}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <FrameView original={true}
                                       title={'Original'}/>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'Huffman encoded'}
                                       reformatFunc={huffman.adapt}
                                       compType={types.HUFFMAN_COMP}/>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'Huffman decoded'}
                                       encodeFunc={huffman.encode}
                                       decodeFunc={huffman.decode}
                                       compType={types.HUFFMAN_COMP}
                                       uncompType={types.HUFFMAN_UNCOMP}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'Logarithmic'}
                                       encodeFunc={curved.log}
                                       compType={types.LOG_COMP}/>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'RLE encoded'}
                                       reformatFunc={rle.adapt}
                                       compType={types.RLE_COMP}/>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'RLE decoded'}
                                       encodeFunc={rle.encode}
                                       decodeFunc={rle.decode}
                                       compType={types.RLE_COMP}
                                       uncompType={types.RLE_UNCOMP}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={4}>

                            <FrameView original={false}
                                       title={'Exponential'}
                                       encodeFunc={curved.exp}
                                       compType={types.EXP_COMP}/>

                        </Col>

                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'LZW encoded'}
                                       reformatFunc={lzw.adapt}
                                       compType={types.LZW_COMP}/>
                        </Col>
                        <Col xs={12} sm={4}>
                            <FrameView original={false}
                                       title={'LZW decoded'}
                                       encodeFunc={lzw.encode}
                                       decodeFunc={lzw.decode}
                                       compType={types.LZW_COMP}
                                       uncompType={types.LZW_UNCOMP}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default App;