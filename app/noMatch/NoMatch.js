import React, { Component } from 'react';

class NoMatch extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <h1>404</h1>
                <h3>No match for <code>{location.pathname}</code></h3>
            </div>
        );
    }
}

export default NoMatch;