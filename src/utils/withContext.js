import React from 'react';

export default Component => (Context) => {
  class ContextedComponent extends React.Component {
    render() {
      const { Consumer } = Context; 
      return (
        <Consumer>
          {context => <Component {...this.props} context={context} />}
        </Consumer>
      );
    }
  }
 
  // ContextedComponent.displayName = `${Component.displayName || Component.name}`;
  ContextedComponent.childName = `${Component.displayName || Component.name}`;
  return ContextedComponent;
};
