class MiniMap {
  constructor(config = {}) {
    const {
      scrollElement = window,
      onScroll = () => { },
      selector = '*',
      renderElement,
    } = config;
    this.scrollElement = scrollElement;
    this.onScroll = onScroll;
    this.renderElement = renderElement;
  }

  render() {
    const div = document.createElement('div');
    div.innerHTML = 'test';
    this.renderElement.innerHtml = '';
    this.renderElement.appendChild(div);
  }
}
export default MiniMap;
