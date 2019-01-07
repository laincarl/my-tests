import React from 'react';
import PropTypes from 'prop-types';

const styleTransform = (style, transform) => {
  style.transform = transform;
  style.WebkitTransform = transform;
};

const styleTranslateY = (style, offset) => {
  styleTransform(style, `translateY(${offset}px) translateZ(0)`);
};

/**
 * Stickyard, make your component sticky the easy way using render prop
 */
export default class Stickyard extends React.PureComponent {
  static defaultProps = {
    stickPosition: 'top',
  }

  constructor(props) {
    super(props);

    this.setContainerRef = this.setContainerRef.bind(this);
    this.setStickyRef = this.setStickyRef.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getStickyOffset = this.getStickyOffset.bind(this);
    this.getStickyOffsets = this.getStickyOffsets.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    this.container = null;
    this.stickers = [];
    this.lastStickyIndex = -1;
    this.updating = false;
  }


  componentDidMount() {
    this.purgeStickers();
    if (this.container) {
      this.container.addEventListener('scroll', this.updateState);
    }
  }

  componentDidUpdate() {
    this.purgeStickers();
  }

  componentWillUnmount() {
    if (this.container) {
      this.container.removeEventListener('scroll', this.updateState);
    }
  }

  setContainerRef(ref) {
    this.container = ref;
    if (ref) {
      // the postion should be either `relative` or `absolute`
      if (ref.style.position !== 'absolute') {
        ref.style.position = 'relative';
      }
      ref.style.overflowY = 'auto';
      ref.style.willChange = 'transform';
      ref.style.WebkitOverflowScrolling = 'touch';
    }
  }

  setStickyRef(ref) {
    if (ref) this.stickers.push(ref);
  }

  /**
   * 计算
   *
   * @param {*} sticker
   * @returns
   * @memberof Stickyard
   */
  getStickyOffset(sticker) {
    let { offsetTop, offsetParent } = sticker;
    // offsetParent和定位有很大关系，和top left等定位一样的规则，向上查找position不为static的父级
    // 所以这里算出固定元素相对于滚动元素的offsetTop，也就是固定元素据滚动区域的顶部距离。它是个定值
    // 在setContainerRef已经设置了container的positon为absolute或relative
    while (this.container && offsetParent !== this.container) {
      offsetTop += offsetParent.offsetTop;
      // eslint-disable-next-line prefer-destructuring
      offsetParent = offsetParent.offsetParent;
    }
    return offsetTop;
  }

  getStickyOffsets() {
    return this.stickers.map(this.getStickyOffset);
  }

  scrollTo(offset) {
    if (this.container) {
      this.container.scrollTop = offset;
    }
  }

  scrollToIndex(index) {
    if (index >= 0 && index < this.getStickyOffsets().length) {
      this.scrollTo(this.getStickyOffsets()[index]);
    }
  }

  updateState() {
    if (this.updating || !this.container || this.stickers.length === 0) return;

    this.updating = true;
    // 计算
    const { stickyIndex, sticker, translateY } = this.calulateIndexAndTransform();
    // 设置样式
    if (sticker) {
      styleTranslateY(sticker.style, translateY);
    }   

    const { stickyClassName, onSticky } = this.props;
    if (stickyIndex !== this.lastStickyIndex) {
      const lastSticker = this.lastStickyIndex >= 0 ? this.stickers[this.lastStickyIndex] : null;

      if (lastSticker) styleTransform(lastSticker.style, '');

      if (stickyClassName) {
        sticker && sticker.classList && sticker.classList.add(stickyClassName);
        lastSticker
          && lastSticker.classList
          && lastSticker.classList.remove(stickyClassName);
      }
      onSticky && onSticky(stickyIndex);
      this.lastStickyIndex = stickyIndex;
    }

    this.updating = false;
  }

  calulateIndexAndTransform = () => {
    let stickyIndex = 0;
    let translateY = 0;
    let sticker = null;
    const { stickPosition } = this.props;
    const { scrollTop, scrollHeight, offsetHeight } = this.container;
    if (stickPosition === 'top') {      
      const offsets = this.getStickyOffsets().concat(scrollHeight);
      
      while (scrollTop >= offsets[stickyIndex]) {
        stickyIndex += 1;
      }
      stickyIndex -= 1;

      sticker = stickyIndex >= 0 ? this.stickers[stickyIndex] : null;

      if (sticker) {
        if (scrollTop < offsets[stickyIndex + 1] - sticker.offsetHeight) {
          translateY = scrollTop - offsets[stickyIndex];
        } else {
          translateY = offsets[stickyIndex + 1] - offsets[stickyIndex] - sticker.offsetHeight;
        }
      }
    } else {
      const offsets = this.getStickyOffsets();
      // 计算当前应该固定哪个元素
      while (stickyIndex < this.stickers.length - 1
        && scrollTop >= offsets[stickyIndex] - offsetHeight + this.stickers[stickyIndex].offsetHeight) {
        stickyIndex += 1;
      }
      sticker = stickyIndex >= 0 ? this.stickers[stickyIndex] : null;
      if (sticker) {
        if (stickyIndex > 0 
          && offsetHeight - offsets[stickyIndex - 1] + scrollTop - this.stickers[stickyIndex - 1].offsetHeight < sticker.offsetHeight) {
          translateY = this.stickers[stickyIndex - 1].offsetHeight - offsets[stickyIndex] + offsets[stickyIndex - 1];
        } else {
          translateY = scrollTop + offsetHeight - sticker.offsetHeight - offsets[stickyIndex];
        }
      }
    }
    return {
      stickyIndex,
      sticker,
      translateY,
    };
  }

  purgeStickers() {
    this.stickers = this.stickers
      .filter(sticker => sticker && sticker.offsetHeight)
      .sort((a, b) => this.getStickyOffset(a) - this.getStickyOffset(b));

    this.updateState();
  }

  render() {
    const { children } = this.props;
    return children({
      registerContainer: this.setContainerRef,
      registerSticky: this.setStickyRef,
      updateState: this.updateState,
      getStickyOffsets: this.getStickyOffsets,
      scrollToIndex: this.scrollToIndex,
      scrollTo: this.scrollTo,
    });
  }
}

Stickyard.propTypes = {
  /**
   * Render whatever you want, it's called with an object
   */
  children: PropTypes.func.isRequired,
  /**
   * The className to be attached to the element when it's sticky.
   */
  stickyClassName: PropTypes.string,
  /**
   * It's called when a element becomes sticky, `-1` means there is no sticky element.
   */
  onSticky: PropTypes.func,
  stickPosition: PropTypes.oneOf(['top', 'bottom']),
};
