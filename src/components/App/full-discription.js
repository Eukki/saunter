import React, { Component } from 'react';
import GoogleMap from '../Map/map';

export default class FullDiscription extends Component {
  constructor(props) {
    super(props);

    this.addPrimary = this.addPrimary.bind(this);
    this.removePrimary = this.removePrimary.bind(this);
    this.removePath = this.removePath.bind(this);
  }
  
  addPrimary() {
    const paths = this.props.paths;
    let current = paths.indexOf(this.props.activePath);

    paths[current].isPrimary = true;
    this.props.updatePaths(paths);
  }

  removePrimary() {
    const paths = this.props.paths;
    let current = paths.indexOf(this.props.activePath);

    paths[current].isPrimary = false;
    this.props.updatePaths(paths);
  }

  removePath() {
    const paths = this.props.paths;
    let current = paths.indexOf(this.props.activePath);

    paths.splice(current, 1);
    this.props.updateActive(false);
    this.props.updatePaths(paths);
  }


  render() {
    const paths = this.props.paths;
    const activePath = this.props.activePath;
    const toReturn = !activePath ? '' :
            <div className="card mb-3 mt-3">
              <h3 className="card-header">{activePath.title}</h3>
              <div className="card-body">
                <h5 className="card-title">{activePath.length} km</h5>
                <p className="card-text">{activePath.full}</p>
                <div className="map">
                  <GoogleMap map={activePath.map} paths={paths} isAddPoint={false} fromFull={true} />
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-secondary" onClick={activePath.isPrimary ? this.removePrimary : this.addPrimary}>{activePath.isPrimary ? "Remove from primary" : "Add to primary"}</button>
                  <button type="button" className="btn btn-secondary text-danger" onClick={this.removePath}>Remove</button>
                </div>
              </div>
            </div>;

    return(
      toReturn
    );
  }
};