import {
  observable, action, computed, toJS,
} from 'mobx';

class ListStore {
  @observable list = [{
    id: 1,
    title: 'a',
  }, {
    id: 2,
    title: 'b',
  }, {
    id: 3,
    title: 'c',
  }, {
    id: 4,
    title: 'd',
  }];


  @action setList = (list) => {
    this.list = list;
    // this.list[3].title = Math.random();
  }

  @computed get getList() {
    return this.list;
  }
}

export default new ListStore();
