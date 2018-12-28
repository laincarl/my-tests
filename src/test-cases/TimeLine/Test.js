import React, { Component } from 'react';
import { Switch } from 'antd';
import TimeLine from './TimeLine';
import ResizeContainer from '../ResizeDivider/ResizeContainer';
import ShowProjects from './ShowProjects';

const { Section, Divider } = ResizeContainer;

class Test extends Component {
  state={
    isProject: false,
  }

  handleModeChange=() => {
    this.setState({
      isProject: !this.state.isProject,
    });
  }

  render() {
    const { isProject } = this.state;
    return (
      <div>
        <ResizeContainer type="vertical">
          <Section size={{
            height: 500,
            minHeight: 250,
          }}
          >
            <div style={{ padding: 20, height: '100%' }}>
              <Switch checked={isProject} onChange={this.handleModeChange} />
              <ShowProjects />
              {/* <TimeLine isProject={isProject} /> */}
            </div>
          </Section>
          <Divider />
          <Section size={{
            height: 500,
            minHeight: 50,
          }}
          >
            <div style={{
              flex: 1, height: '100%',
            }}
            >
              {'bottom'}
            </div>
          </Section>          
        </ResizeContainer>
      </div>
    );
  }
}

Test.propTypes = {

};

export default Test;
