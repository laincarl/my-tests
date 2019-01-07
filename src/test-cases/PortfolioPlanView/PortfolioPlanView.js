import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import './PortfolioPlanView.css';
import { observer } from 'mobx-react';
import ShowProjects from './PortfolioPlanViewComponent/ShowProject/ShowProjects';
import ResizeContainer from '../ResizeDivider/ResizeContainer';
import PortfolioPlanViewStore from './PortfolioPlanViewStore';

const { Section, Divider } = ResizeContainer;
const { Option } = Select;
const ModeOptions = [
  {
    modeTypeCode: 'TargetSchedule',
    name: '目标排期',
  },
  {
    modeTypeCode: 'WorkLoad',
    name: '工作量',
  },
  {
    modeTypeCode: 'Schedule',
    name: '排期',
  },
];

@observer
class PortfolioPlanView extends Component {
  componentDidMount() {
    console.log(PortfolioPlanViewStore);
  }

      
    saveRef = name => (ref) => {
      this[name] = ref;
    }
    
      handleResize=() => {
        this.ShowProjects.handleResize();
      }


      render() {
        const currentModeType = PortfolioPlanViewStore.getCurrentModeType;
        return (
          <div>
            <ResizeContainer type="vertical">
              <Section size={{
                height: 500,
                minHeight: 250,
              }}
              >
                <div style={{ height: '100%' }}>
                  <div style={{ display: 'flex', margin: 20 }}>
                    <div>模式：</div>
                    <Select
                      style={{ width: 100 }}
                      value={
                        currentModeType
                      }
                      onChange={(value) => {
                        PortfolioPlanViewStore.setCurrentModeType(value);
                      }}
                    >
                      {
                      ModeOptions.map(mode => <Option value={mode.modeTypeCode} key={mode.modeTypeCode}>{mode.name}</Option>)
                    }
                    </Select>
                  </div>
                  <ShowProjects ref={this.saveRef('ShowProjects')} />      
                </div>
              </Section>
              <Divider onResize={this.handleResize} />
              <Section size={{
                height: 200,
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

PortfolioPlanView.propTypes = {

};

export default PortfolioPlanView;
