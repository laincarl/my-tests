import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TabPane from './TabPane';

function filterActiveChildren(children, activeKey) {
  return children.filter(child => child.key === activeKey);
}
export function toArray(children) {
  // allow [c,[a,b]]
  const c = [];
  React.Children.forEach(children, (child) => {
    if (child) {
      c.push(child);
    }
  });
  return c;
}

export function getActiveIndex(children, activeKey) {
  const c = toArray(children);
  for (let i = 0; i < c.length; i += 1) {
    if (c[i].key === activeKey) {
      return i;
    }
  }
  return -1;
}
const Bar = props => (
  <div className="tab-bar" style={{ color: props.active && 'red' }}>
    {props.children}
  </div>
);

class TabBar extends Component {
  componentDidMount() {
    this.setInk();
  }

  componentDidUpdate() {
    this.setInk();
  }

  onTabClick = (key) => {
    console.log(key);
    this.props.onTabClick(key);
  };

  setInk = () => {
    const { activeTab } = this;
    this.ink.style.width = activeTab ? `${activeTab.offsetWidth}px` : 0;
    const left = activeTab.getBoundingClientRect().left
      - this.tab.getBoundingClientRect().left;
    this.ink.style.transform = `translate3d(${left}px,0,0)`;
  };

  saveRef(name) {
    return (node) => {
      this[name] = node;
    };
  }


  render() {
    const { panels, activeKey } = this.props;
    return (
      <div className="tab-bar-container" ref={this.saveRef('tab')}>
        <div
          className="tab-bar-ink"
          ref={this.saveRef('ink')}
        />
        <div className="tab-bars">
          {panels.map((panel) => {
            const refProps = {};
            if (activeKey === panel.key) {
              refProps.ref = this.saveRef('activeTab');
            }
            return (
              <div
                role="none"
                onClick={this.onTabClick.bind(this, panel.key)}
                {...refProps}
              >
                <Bar active={activeKey === panel.key}>{panel.props.tab}</Bar>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const Content = props => (
  <div
    className={
      props.active
        ? 'tab-content tab-content-active'
        : 'tab-content tab-content-inactive'
    }
  >
    {props.children}
  </div>
);

const TabContent = (props) => {
  const { children, activeKey } = props;
  const activeIndex = getActiveIndex(children, activeKey);
  const style = activeIndex >= 0 ? { marginLeft: `-${activeIndex * 100}%` } : {};
  // console.log(activeIndex, style);
  return (
    <div className="tab-contents" style={style}>
      {children.map(child => (
        <Content active={activeKey === child.key}>
          {' '}
          {child}
        </Content>
      ))}
    </div>
  );
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: this.props.defaultActiveKey || this.props.activeKey,
    };
  }

  onTabClick = (key) => {
    this.setState({
      activeKey: key,
    });
  };

  renderTabBar = () => <TabBar />;

  renderTabContent=() => <TabContent />;


  render() {
    const props = this.props;
    const contents = [
      React.cloneElement(this.renderTabBar(), {
        key: 'tabBar',
        onTabClick: this.onTabClick,
        panels: props.children,
        activeKey: this.state.activeKey,
      }),
      React.cloneElement(this.renderTabContent(), {
        activeKey: this.state.activeKey,
        children: props.children,
        onChange: this.setActiveKey,
        key: 'tabContent',
      }),
    ];
    return <div className="tab-container">{contents}</div>;
  }
}
Tabs.TabPane = TabPane;
export default Tabs;
