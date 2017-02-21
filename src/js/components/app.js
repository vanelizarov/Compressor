import React, {Component} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import push from '../actions/push';

class App extends Component {

    constructor(props) {
        super(props);
    }

    onPushButtonClick() {
        this.props.pushItem();
    }

    render() {
        return (
            <div>
                <button onClick={this.onPushButtonClick.bind(this)}>Push</button>
                <ul>
                    {
                        this.props.listItems.map((item) => <li key={item.id}>{item.id}</li>)
                    }
                </ul>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        listItems: state.list.items
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        pushItem: push
    }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(App);