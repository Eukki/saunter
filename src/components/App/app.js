import React, { Component } from 'react';
import GoogleMap from '../map.js';
import List from '../list.js';
import FullDiscription from '../full-discription.js';
import Modal from '../modal.js'

import '../bootstrap.min.css';
import '../style.css';

const paths = [];


class App extends Component {
  constructor() {
    super();

    this.state = {
      paths: paths || [],
      activePath: false,
      inputTitle: ''
    }

    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  update(paths) {
    this.setState({
      paths
    })
  }

  updateActive(path) {
    this.setState({
      activePath: path
    })
  }

  render() {
    const newModalMap = { LatLng: [] };
    const paths = this.state.paths;
    const activePath = this.state.activePath;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <input className="form-control mr-sm-2 mt-3" type="text" placeholder="Search"></input>

              <div className="list-group mt-4">
                <div className="mh-700 overflow-auto">
                  <List paths={paths} />
                </div>
              </div>

            </div>

            <div className="col-md-8 col-xs-12">
              <FullDiscription activePath={activePath} modalMap={newModalMap} />
            </div>
          </div>
        </div>

        <Modal modalMap={newModalMap} />

      </div>
    );
  }
}

export default App;
