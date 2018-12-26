import {
  observable, action, computed, toJS,
} from 'mobx';
import moment from 'moment';

class TimeLineStore {
  @observable HeightLightDuring = {
    start: null,
    end: null,
  };

  @action setHeightLightDuring = (HeightLightDuring) => {
    this.HeightLightDuring = HeightLightDuring;
  }

  @computed get getHeightLightDuring() {
    return toJS(this.HeightLightDuring);
  }
}

export default new TimeLineStore();
