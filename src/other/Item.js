import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Line from './Line';
import banner from './u9.png';
const styles = {
  item: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '2px dashed #bebdbd',
    // borderImage: `${banner} 30 30 round`,
  },
  epic: {
    backgroundColor: '#f27788',
  },
  feature: {
    backgroundColor: '#ff9e4a',
  },
  story: {
    backgroundColor: '#fff9b2',
  },
};
export default class Item extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.config);
    this.state = {
      feature: this.props.config.feature,
    };
    this.addEpic = this.addEpic.bind(this);
    this.addFeature = this.addFeature.bind(this);
    this.addStory = this.addStory.bind(this);
    
    
  }
  addEpic() {
    console.log('add epic');
  }
  addFeature() {
    console.log('add feature',this.state.feature);
    this.setState({
      feature: this.state.feature+1,
    });
  }
  addStory() {
    console.log('add story');
  }
  render() {
    const config = this.props.config;
    return (
      <div style={styles.item}>
        <Line cardStyle={styles.epic} amount={config.epic} add={this.addEpic} />
        <Line
          cardStyle={styles.feature}
          amount={this.state.feature}
          add={this.addFeature}
        />
        <Line
          cardStyle={styles.story}
          amount={config.story}
          isChoosing={this.props.isChoosing}
          add={this.addStory}
        />
      </div>
    );
  }
}
