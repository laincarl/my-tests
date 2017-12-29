import { observable, computed, action } from 'mobx';

// store('UserStoryStore');
class UserStoryStore {
  @observable userStoryData = [];

  @action
  setSprintModal(sprintModal) {
    console.log(sprintModal);
    this.sprintModal = sprintModal;
  }
  @computed
  get getStoryData() {
    return this.userStoryData.splice();
  }
}
const userStoryStore = new UserStoryStore();
export default userStoryStore;
