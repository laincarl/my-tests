import {
  observable, action, computed, toJS,
} from 'mobx';
import moment from 'moment';

class TimeLineStore {
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

  @action setHeightLightDuring = (HeightLightDuring) => {
    this.HeightLightDuring = HeightLightDuring;
  }

  @action setStickData = (StickData) => {
    this.StickData = StickData;
  }

  @computed get getHeightLightDuring() {
    return toJS(this.StickData);
  }

  @computed get getStickData() {
    return toJS(this.StickData);
  }
}

export default new TimeLineStore();
