import React, {Component} from 'react';


import FrameView from './frame/frameView';
import Logo from './logo';

import {
    Grid,
    Row,
    Col,
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap';

import {
    HUFFMAN_COMP,
    HUFFMAN_UNCOMP,
    RLE_COMP,
    RLE_UNCOMP,
    LZW_COMP,
    LZW_UNCOMP,
    LOG_COMP,
    EXP_COMP,
    ORIGINAL
} from '../logic/transformations/types';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [
                [
                    ORIGINAL,
                    HUFFMAN_COMP,
                    HUFFMAN_UNCOMP
                ],
                [
                    EXP_COMP,
                    RLE_COMP,
                    RLE_UNCOMP
                ],
                [
                    LOG_COMP,
                    LZW_COMP,
                    LZW_UNCOMP
                ]
            ]
        };
        //console.log(this.state.rows);
    }

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
                <Grid>
                    {
                        this.state.rows.map((row) => {
                            return (
                                <Row key={this.state.rows.indexOf(row)}>
                                    {
                                        row.map((col) => {
                                            return (
                                                <Col xs={12} sm={4} key={col}>
                                                    <FrameView type={col} isOriginal={col === ORIGINAL}/>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {

    };
};

export default App;