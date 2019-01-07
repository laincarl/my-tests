import {
  observable, action, computed, toJS,
} from 'mobx';
import moment from 'moment';

function rnd(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

class PortfolioPlanViewStore {
    @observable HeightLightDuring = {
      start: null,
      end: null,
      offsetTop: 0,
    };
  
    @observable StickData = {
      singleWidth: 0,
      proId: null,
      range: { start: null, end: null },
      HeightLightDuring: {},  
      marks: [],
    };

    @observable currentModeType = 'WorkLoad';

    @observable targetScheduleBoardData = [{
      id: 1,
      name: 'CE',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `1_${t}_1`,
          proId: 1,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `1_${t}_2`,
          proId: 1,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]),
      }],
      marks: [{ key: 'plan_1', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼1.0版本' }],
    }, {
      id: 2,
      name: 'MIN',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `2_${t}_1`,
          proId: 2,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `2_${t}_2`,
          proId: 2,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]),
      }],
      marks: [{ key: 'plan_2', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼2.0版本' }],
    }, {
      id: 3,
      name: 'ZHI',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `3_${t}_1`,
          proId: 3,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `3_${t}_2`,
          proId: 3,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]),
      }],
      marks: [{ key: 'plan_3', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼3.0版本' }],
    },
    ];

    // @observable workLoadBoardData = 

    @observable scheduleData = [{
      id: 1,
      name: 'CE',
      boards: [{
        title: 'C7N面板 Team (2)',
        sprintsAndIssues: [
          {
            sprintId: 1,
            sprintName: 'sprint1',
            fromDate: moment().startOf('month'),
            toDate: moment().startOf('month').add(6, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 1,
              title: '自动化测试（前端）2',
              stageCode: 'code',
              stageName: '编码中',
              rowId: 1, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(6, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 1,
              title: '自动化测试（前端）',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 1, 
              fromDate: moment().startOf('month').add(7, 'days'),
              toDate: moment().startOf('month').add(15, 'days').endOf('day'),
            }],
          },
          {
            sprintId: 2,
            sprintName: 'sprint2',
            fromDate: moment().startOf('month').add(7, 'days').endOf('day'),
            toDate: moment().startOf('month').add(20, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试（前端）2',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 1, 
              fromDate: moment().startOf('month').add(20, 'days'),
              toDate: moment().startOf('month').add(25, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 2,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 2, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }],
          },
        ],
      }],
    }, {
      id: 2,
      name: 'MIN',
      boards: [{ 
        title: 'C7N面板 Team (3)',
        sprintsAndIssues: [
          {
            sprintId: 1,
            sprintName: 'sprint1',
            fromDate: moment().startOf('month'),
            toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 3, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(2, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 1,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 3, 
              fromDate: moment().startOf('month').add(6, 'days'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }],
          },
          {
            sprintId: 2,
            sprintName: 'sprint2',
            fromDate: moment().startOf('month').add(14, 'days').endOf('day'),
            toDate: moment().startOf('month').add(20, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试（前端）2',
              stageCode: 'code',
              stageName: '编码中',
              rowId: 4, 
              fromDate: moment().startOf('month').add(6, 'days'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 2,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 4, 
              fromDate: moment().startOf('month').add(20, 'days'),
              toDate: moment().startOf('month').add(27, 'days').endOf('day'),
            }],
          },
        ],
      }],
    },
    ];
  
    @observable workLoadData = [
      {
        id: 1,
        name: 'CE',
        boards: [{ 
          title: 'C7N面板 Team (3)',
          sprintWorkLoad: [
            {
              sprintId: 1,
              sprintName: '敏捷Sprint1',
              startDate: moment().startOf('month'),
              endDate: moment().startOf('month').add(13, 'days').endOf('day'),
              freeWorkLoad: 1.3,
              planWorkLoad: 31.2,
              blk: ['编码'],
              freeCapacity: ['编码', '数据库设计', '前后端调试', '页面开发', '页面设计'],
            }, {
              sprintId: 2,
              sprintName: '敏捷Sprint1',
              startDate: moment().startOf('month').add(14, 'days'),
              endDate: moment().startOf('month').add(20, 'days').endOf('day'),
              freeWorkLoad: 25,
              planWorkLoad: 25,
              blk: ['编码', '数据库设计'],
              freeCapacity: ['页面开发', '页面设计'],
            },
          ],
        },
        { 
          title: 'VQ Team',
          sprintWorkLoad: [
            {
              sprintId: 3,
              sprintName: '敏捷Sprint1',
              startDate: moment().startOf('month'),
              endDate: moment().startOf('month').add(6, 'days').endOf('day'),
              freeWorkLoad: 1.2,
              planWorkLoad: 18.8,
              blk: [],
              freeCapacity: ['数据库设计', '页面设计'],
            }, {
              sprintId: 4,
              sprintName: '敏捷Sprint1',
              startDate: moment().startOf('month').add(7, 'days'),
              endDate: moment().startOf('month').add(13, 'days').endOf('day'),
              freeWorkLoad: 20,
              planWorkLoad: 0,
              blk: [],
              freeCapacity: ['编码', '数据库设计', '前后端调试', '页面开发', '页面设计'],
            }, 
          ],
        }],
      },      
    ];

    @action setHeightLightDuring = (HeightLightDuring) => {
      // console.log(HeightLightDuring);
      this.HeightLightDuring = HeightLightDuring;
    }
  
    @action setStickData = (StickData) => {
      this.StickData = StickData;
    }
  
    @action setCurrentModeType = (data) => {
      this.currentModeType = data;
    }

    @action setTargetScheduleBoardData = (data) => {
      this.targetScheduleBoardData = data;
    }

    @action setScheduleData = (data) => {
      this.scheduleData = data;
    }

    @action setWorkLoadData = (data) => {
      this.workLoadData = data;
    }

    @computed get getHeightLightDuring() {
      return toJS(this.HeightLightDuring);
    }
  
    @computed get getStickData() {
      return toJS(this.StickData);
    }

    @computed get getCurrentModeType() {
      return this.currentModeType;
    }

    @computed get getTargetScheduleBoardData() {
      return toJS(this.targetScheduleBoardData);
    }

    @computed get getScheduleData() {
      return toJS(this.scheduleData);
    }

    @computed get getWorkLoadData() {
      return toJS(this.workLoadData);
    }
}
  
export default new PortfolioPlanViewStore();
