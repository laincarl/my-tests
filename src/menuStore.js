class MenuStore {
  // @observable currentMenu=null;

  currentMenu() {
    return `/${location.hash.split('/')[1]}`;
  }
}
const menuStore = new MenuStore();
export default menuStore;
