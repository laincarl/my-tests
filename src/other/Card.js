import { Icon } from 'antd';
import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import UserStoryStore from './Store';
const styles = {
  cardstyle: {
    width: '131px',
    height: '70px',
    // overflow: 'hidden',
    padding: '10px',
    // border: '1px solid #000',
    margin: '10px',
    position: 'relative',
    cursor: 'pointer',
  },
  content: {
    maxHeight: '100%',
    overflow: 'hidden',
    color: '#333',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    userSelect: 'none',
  },
  icon: {
    color: '#00a854',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
    background: 'white',
    borderRadius: '50%',
    fontSize: '40px',
    position: 'absolute',
  },
  menus: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.7)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  menuicon: {
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    color: 'gray',
    width: '30px',
    height: '30px',
    fontSize: '20px',
    lineHeight: '30px',
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
  },
};
@observer
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosen: false,
    };
    this.choose = this.choose.bind(this);
  }
  choose() {
    if (this.props.isChoosing) {
      this.setState({
        choosen: !this.state.choosen,
      });
    }
  }
  render() {
    return (
      <div
        className={`cardContainer ${!this.state.choosen && this.props.isChoosing
          ? 'cardanimation'
          : ''}`}
        style={{ ...styles.cardstyle, ...this.props.style }}
        onClick={this.choose}
      >
        <div style={styles.content}>
          PKP 是防止中间人攻击和恶意 CA 的一种证书核查机制。Google 工程师给出的理由 PKP 普及率低和存在技术挑战。Google
          计划在明年 5 月 29 日发布 Chrome 67 正式版时移除对 PKP 的支持。
        </div>
        {this.props.isChoosing ? (
          <div>
            <Icon
              type="check-circle"
              style={{
                ...styles.icon,
                ...{ display: this.state.choosen ? 'block' : 'none' },
              }}
            />
          </div>
        ) : (
          <div className="hoverMenu" style={styles.menus}>
            <Icon className="menu" type="edit" style={styles.menuicon} />
            <Icon
              className="menu"
              type="delete"
              style={{
                ...styles.menuicon,
                ...{ backgroundColor: '#f04134', color: 'white' },
              }}
            />
            <Icon
              className="menu"
              type="right"
              style={styles.menuicon}
              onClick={this.props.add}
            />
          </div>
        )}
      </div>
    );
  }
}
