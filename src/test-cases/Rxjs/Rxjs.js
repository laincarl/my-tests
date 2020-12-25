import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import { Observable, from, interval, fromEvent, animationFrameScheduler } from 'rxjs';
import { map, withLatestFrom, scan } from 'rxjs/operators';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/takeUntil';
// import 'rxjs/add/observable/zip';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/fromPromise';
const observable = from([1, 2, 3, 4]);
observable.subscribe((num) => {
  console.log(num)
})
observable.subscribe((num) => {
  console.log(`a${num}`)
})
const docElm = document.documentElement;
const { clientWidth, clientHeight } = docElm;
function lerp(start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return {
    x: start.x + dx * 0.1,
    y: start.y + dy * 0.1,
  };
}

class Rxjs extends Component {
  componentDidMount() {
    const animationFrame$ = interval(0, animationFrameScheduler);

    const mouseMove = fromEvent(findDOMNode(this.outer), 'mousemove')
    const positions = mouseMove.pipe(map(event => ({ x: event.clientX, y: event.clientY })));
    const smoothMove$ = animationFrame$
      .pipe(withLatestFrom(positions, (frame, move) => move))
      .pipe(scan((current, next) => lerp(current, next)));

    smoothMove$.subscribe(({ x, y }) => {
      const inner = findDOMNode(this.inner)
      const rotX = (y / clientHeight * -50) - 25;
      const rotY = (x / clientWidth * 50) - 25;
      inner.style = `width: 100%; height:100%;background:red;transform: rotateX(${rotX}deg) rotateY(${rotY}deg);`;

      inner.innerHTML = `${x}, ${y}`
    })
  }

  render() {
    return (
      <div>
        Rxjs
        <div style={{ width: 500, height: 500 }} ref={(outer) => { this.outer = outer; }}>
          <div style={{ width: '100%', height: '100%', background: 'red' }} ref={(inner) => { this.inner = inner; }} />
        </div>
      </div>
    );
  }
}

Rxjs.propTypes = {

};

export default Rxjs;
