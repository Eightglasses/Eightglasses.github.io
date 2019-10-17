import React, { Component } from "react"
import Demo1 from '../demo1/index'
class Demo2 extends Component {
    render() {
        return (
            <div>
                <Demo1 title='demo2引用' bbb={this.props.title1}/>
                <p> Demo2 {this.props.name}</p>
            </div>
        );
    }
}
export default Demo2;


