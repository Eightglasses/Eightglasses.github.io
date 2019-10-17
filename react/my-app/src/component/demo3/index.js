import React, { Component } from 'react'
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() }
    }

    render() {
        return (
            <div>
                it is {this.state.date.toLocaleTimeString()}
            </div>
        )
    }
}

export default Clock