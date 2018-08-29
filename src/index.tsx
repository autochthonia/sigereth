// tslint:disable-next-line no-import-side-effect
import '@babel/polyfill';

// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Store from './store';
import BrowserRouter from './routes';

// @DragDropContext(HTML5Backend, { window })
class App extends Component {
  render() {
    return (
      <Store>
        <BrowserRouter />
      </Store>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
