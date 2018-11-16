import React, { Component } from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;
import './Anchor.css'
class Anchor2 extends Component {
    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
                <Anchor bounds={100}>
                    <Link href="#1" title="1" />
                    <Link href="#2" title="2" />
                    <div>22</div>
                    <Link href="#3" title="3">
                        <Link href="#4" title="4" />
                        <Link href="#Link-Props" title="Link Props" />
                    </Link>
                </Anchor>
                <div id="1" style={{height:500,width:500,border:'2px solid red'}}>1</div>
                <div id="2" style={{height:500,width:500,border:'2px solid red'}}>2</div>
                <div id="3" style={{height:500,width:500,border:'2px solid red'}}>3</div>
                <div id="4" style={{height:500,width:500,border:'2px solid red'}}>4</div>
            </div>
        );
    }
}

Anchor.propTypes = {

};

export default Anchor2;