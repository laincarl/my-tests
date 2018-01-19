import React from "react";
import ReactDOM from "react-dom";
import ReactCssTransitionGroup from "react-addons-css-transition-group";
import ReactTransitionGroup from 'react-addons-transition-group'
import "./ani.less";
var style = {
    position: "absolute",
    right: "100px",
    top: "20px"
};
export default class Animation extends React.Component {
    constructor() {
        super();
        this.state = {
            item: [{ test: "1212" }],
            show: false,
        };
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);

    }
    handleIncrease() {
        var arr = this.state.item;
        arr = [...this.state.item, { test: "1212" }];
        console.log(arr);
        this.setState({
            item: arr
        });
    }
    handleDecrease() {
        var arr = this.state.item;
        arr.splice(arr.length - 1, 1);
        console.log(arr);
        this.setState({
            item: arr
        });
    }
    render() {
        var it = this.state.item.map(function (item) {
            return <div className="baseStyle">{item.test}</div>;
        });
        console.log(it);
        return (
            <div>
                <ReactCssTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {it}
                </ReactCssTransitionGroup>
                <ReactCssTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.state.show ? <div style={{ width: 50, height: 50 }}>show</div> : null}
                </ReactCssTransitionGroup>
                <button onClick={() => {
                    this.setState({
                        show: !this.state.show
                    })
                }}>显示/隐藏</button>
                <button onClick={this.handleIncrease}>增加</button>
                <button onClick={this.handleDecrease}>减少</button>
            </div>
        );
    }
}

