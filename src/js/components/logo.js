import React, {Component} from 'react';

class Logo extends Component {
    render() {
        return (
            <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="logo--icon">
                    <path d="M 20.59375 2 L 16.34375 6.25 L 13.5 3.40625 L 12.09375 11.90625 L 20.59375 10.5 L 17.75 7.65625 L 22 3.40625 L 20.59375 2 z M 11.90625 12.09375 L 3.40625 13.5 L 6.25 16.34375 L 2 20.59375 L 3.40625 22 L 7.65625 17.75 L 10.5 20.59375 L 11.90625 12.09375 z"></path>
                </svg>
                <a href="#" className="logo--text">Compressor</a>
            </div>
        )
    }
}

export default Logo;