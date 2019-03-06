function align(source, target) {
  let placement = 'top';
  const {
    left, top, height, width,
  } = target.getBoundingClientRect();
  const targetHeight = source.offsetHeight;
  const targetWidth = source.offsetWidth;
  let Top = top - targetHeight;
  const Left = left + (width - targetWidth) / 2;
  // 上边放不下，就放下边
  if (Top < 0) {
    Top = top + height;
    placement = 'bottom';
  }
  // console.log(Left, Top);
  source.style.top = `${Top}px`;
  source.style.left = `${Left}px`;
  return placement;
}
function alignTop() {

}
function alignBottom() {

}
export default align;
