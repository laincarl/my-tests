import React, { Component } from 'react';
import TimeLine from './TimeLine';
import ResizeContainer from '../ResizeDivider/ResizeContainer';

const { Section, Divider } = ResizeContainer;

class Test extends Component {
  render() {
    return (
      <div>
        <ResizeContainer type="vertical">
          <Section size={{
            height: 500,
            minHeight: 250,
          }}
          >
            <div style={{ padding: 20, height: '100%' }}>
              <TimeLine />
            </div>
          </Section>
          <Divider />
          <Section size={{
            height: 120,
            minHeight: 50,
          }}
          >
            <div style={{ flex: 1, height: '100%' }}>
              bottom
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
