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
  }, {
    id: 5,
    title: 'd',
  }, {
    id: 6,
    title: 'd',
  }, {
    id: 7,
    title: 'd',
  }, {
    id: 8,
    title: 'd',
  }];


  @action setList = (list) => {
    this.list = list;
    // this.list[3].title = Math.random();
  }

  @action addItem = () => {
    setTimeout(() => {
      Array(10).fill(0).forEach(() => {
        this.list.unshift({
          id: Math.random(),
          title: Math.random(),
        });
      });
    }, 300);
    
    // this.list[3].title = Math.random();
  }

  @computed get getList() {
    return this.list;
  }
}

export default new ListStore();
