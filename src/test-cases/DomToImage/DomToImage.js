import React, { Component } from 'react';
import PropTypes from 'prop-types';
import domtoimage from 'dom-to-image';
import './DomToImage.css'
class DomToImage extends Component {
    generatePic = () => {
        domtoimage.toPng(document.getElementById('root'), { quality: 0.95 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }
    render() {
        return (
            <div id="pic-test">
                DomToImage.
                <button onClick={this.generatePic}>生成</button>
            </div>
        );
    }
}

DomToImage.propTypes = {

};

export default DomToImage;