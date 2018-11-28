import React from 'react';
import AnchorContext from './AnchorContext';

export default function withAnchor(Component) {
  // ...and returns another component...
  return function ThemedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <AnchorContext.Consumer>
        {anchor => <Component {...props} anchor={anchor} />}
      </AnchorContext.Consumer>
    );
  };
}
