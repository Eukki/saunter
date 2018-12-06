import React, { Component } from 'react';
import GoogleMap from '../Map/map';

const generateID = () => {
  return Math.random().toString(36).substr(2, 9);
}

const removeValue = () => {
  let inputDiv = document.getElementsByClassName('form-control');
  for (var i = 0; i < inputDiv.length; i++) {
    inputDiv[i].value = '';
  }
}

const addError = (type) => {
  let divs = document.getElementsByClassName('invalid-feedback');
  
  if (type === 'title') {
    divs[0].innerHTML = 'Fill in the required field';
  }

  if (type === 'map') {
    divs[1].innerHTML = 'Add more then one marker';
  }
}

const removeError = (type) => {
  let divs = document.getElementsByClassName('invalid-feedback');
  
  if (type === 'title' || type === 'all') {
    divs[0].innerHTML = '';
  }

  if (type === 'map' || type === 'all') {
    divs[1].innerHTML = '';
  }
}

const handleChange = (e) => {
  let name;
  try {
    name = e.target.id;
  } catch(e) {
    console.log()
  }

  if (name === 'inputTitle') removeError('title');
  if (e === 'error-map') removeError('map');
}

export default class Modal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        map: [],
        length: 0,
        isAddPoint: false
      }

      this.closeModal = this.closeModal.bind(this);
      this.addPath = this.addPath.bind(this);
      this.updateLength = this.updateLength.bind(this);
      this.updateMap = this.updateMap.bind(this);
      this.toggleAddPoint = this.toggleAddPoint.bind(this);
    }

    closeModal() {
      this.setState({
        map: [],
        length: 0,
        isAddPoint: false
      })
      this.props.showModal(false);
    }

    addPath() {
      const title = document.getElementById('inputTitle').value;
      const short = document.getElementById('shortTextarea').value;
      const full = document.getElementById('fullTextarea').value;
      const map = this.state.map;

      if (title.length !== 0 && map[1]) {
        const paths = this.props.paths;
        const path = {
          map: map,
          title: title,
          short: short,
          full: full,
          isPrimary: false,
          length: this.state.length,
          id: generateID()
        }

        paths.push(path);
        this.props.updatePaths(paths, true);
        this.props.updateActive(path);

        removeValue();
        removeError('all');
        this.closeModal();
      } else {
        if (title.length === 0) {
          addError('title');
        } else {
          removeError('title');
        }
        
        if (!map[1]) {
          addError('map');
        } else {
          removeError('map'); 
        }
      }
    }

    updateMap(map) {
      this.setState({map});
      if (map[1]) handleChange('error-map');
    }

    updateLength(length) {
      this.setState({length});
    }

    toggleAddPoint() {
      this.setState({isAddPoint: !this.state.isAddPoint});
    }

    render() {
      const paths = this.props.paths;
      const map = this.state.map;
      const length = this.state.length;
      const show = this.props.isShowModal;
      const isAddPoint = this.state.isAddPoint;

      const toReturn = !show ? '' :
        <div className="modal d-block overflow-auto" id="modal">
          <div className="modal-dialog mw-100 p-3" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Add new path</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="container">
                  <div className="row">

                    <div className="col-md-6 col-xs-12">

                      <div className="form-group has-danger">
                        <label className="col-form-label" htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control border pl-1 is-invalid" id="inputTitle" onChange={(e) => handleChange(e)}></input>
                        <div className="invalid-feedback"></div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="shortTextarea">Short discription</label>
                        <textarea className="form-control border pl-1 pt-1" id="shortTextarea" maxLength="160" rows="2"></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="fullTextarea">Full discription</label>
                        <textarea className="form-control border pl-1 pt-1" id="fullTextarea" rows="4"></textarea>
                      </div>

                      <h5>Length: {length} km</h5>
                    </div>

                    <div className="col-md-6 col-xs-12">
                      <div className="map">
                        <button type="button" className="btn btn-primary btn-map btn-sm" id="btn-addPoint" onClick={this.toggleAddPoint}>{!isAddPoint ? 'Add marker' : 'Stop'}</button> 
                        <GoogleMap map={map} paths={paths} updateMap={this.updateMap} updateLength={this.updateLength} updatePaths={this.props.updatePaths} isAddPoint={isAddPoint} />
                        <div className="invalid-feedback error-map"></div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-primary" id='btnAddPath' onClick={this.addPath}>Add path</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
              </div>

            </div>
          </div>
        </div>;
        
      return (
        toReturn
      )
    }
}