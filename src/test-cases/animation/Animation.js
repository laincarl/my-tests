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
        if (arr.length === 0) {
            arr.push({ test: "1212" });
        } else {
            arr.splice(0, 1);
        }
        this.setState({
            item: arr
        });
    }
    handleDecrease() {
        var arr = this.state.item;

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
                <div style={{overflow:'hidden'}}>
                <ReactCssTransitionGroup
                    transitionName="example2"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.state.show ? <div className="ss">show</div> : null}
                </ReactCssTransitionGroup>
                </div>
                <button onClick={() => {
                    this.setState({
                        show: !this.state.show
                    })
                }}>显示/隐藏</button>
                <button onClick={this.handleIncrease}>显示/隐藏</button>

            </div>
        );
    }
}

