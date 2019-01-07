import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import Project from '../Project/Project';
import PortfolioPlanViewStore from '../../PortfolioPlanViewStore';
import './ShowProject.scss';
import icon from '../../assets/test.png';
import Stickyard from '../../../StickDOM/stickyard';

moment.locale('zh-cn');
function rnd(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}
@observer
class ShowProjects extends Component {
  saveRef = name => (ref) => {
    this[name] = ref;
  }

  handleResize=() => {
    this.sticky.updateState();
  }

  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring = () => {
    PortfolioPlanViewStore.setHeightLightDuring({});
  }

  getProjectsData = () => {
    const currentModeType = PortfolioPlanViewStore.getCurrentModeType;
    if (currentModeType === 'TargetSchedule') {
      return PortfolioPlanViewStore.getTargetScheduleBoardData;
    }

    if (currentModeType === 'WorkLoad') {
      return PortfolioPlanViewStore.getWorkLoadData;
    }

    if (currentModeType === 'Schedule') {
      return PortfolioPlanViewStore.getScheduleData;
    }
  }

  render() {
    const StickData = PortfolioPlanViewStore.getStickData;
    const projects = this.getProjectsData();
    const { 
      singleWidth, proId, range, HeightLightDuring, marks,
    } = StickData;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <Stickyard stickPosition="bottom" ref={this.saveRef('sticky')}>
          {({ registerContainer, registerSticky }) => (
            <div className="Projects" onClick={this.resetHeightDuring} role="none" ref={registerContainer}>
              {projects.map((project, i) => <Project data={project} registerSticky={registerSticky} sticky />)}
            </div>               
          )}
        </Stickyard>
      </div>
    );
  }
}

ShowProjects.propTypes = {

};

export default ShowProjects;
