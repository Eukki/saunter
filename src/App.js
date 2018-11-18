import React, { Component } from 'react';
import GoogleMap from './components/map.js';
import './components/bootstrap.min.css';
import './App.css';

const paths = [];

function generateID() {
    return Math.random().toString(36).substr(2, 9);
}

function removeValue() {
  let inputDiv = document.getElementsByClassName('form-control');
  for (var i = 0; i < inputDiv.length; i++) {
    inputDiv[i].value = '';
  }
}

function addError() {
  let div = document.getElementsByClassName('invalid-feedback')[0];
  console.log(div)
  div.innerHTML = 'Fill in the required field';
}

function removeError() {
  let div = document.getElementsByClassName('invalid-feedback')[0];
  div.innerHTML = '';
}

function removeActive() {
  let active = document.getElementsByClassName('active')[0];
  active.classList.remove('active');
}

class Map {



  addMarker(lat = 0, lng = 0) {
    let map = this.createMap();

    map.LatLng.push({lat: lat, lng: lng});
  }

}

class App extends Component {
  constructor() {
    super();

    this.state = {
      paths: paths || [],
      activePath: false,
      openModal: false,
      inputTitle: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addPath = this.addPath.bind(this);
    this.createMap = this.createMap.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setActive = this.setActive.bind(this);
    this.addToPrimary = this.addToPrimary.bind(this);
    this.removePath = this.removePath.bind(this);
  }

  openModal() {
    this.setState({
      openModal: true
    })
    document.getElementById('modal').classList.add('d-block');    
  }

  closeModal() {
    this.setState({
      openModal: false
    })
    document.getElementById('modal').classList.remove('d-block');
  }

  addPath(map) {
    let title = document.getElementById('inputTitle').value;
    let short = document.getElementById('shortTextarea').value;
    let full = document.getElementById('fullTextarea').value;

    if (title.length !== 0) {
      let paths = this.state.paths;
      let path = {
        map: map,
        title: title,
        short: short,
        full: full,
        primary: false,
        length: 0,
        id: generateID()
      }

      paths.push(path);
      this.setState({
        paths: paths
      })

      removeValue();
      removeError();
      this.closeModal();
    } else {
      addError();
    }
    
  }

  removePath() {
    let paths = this.state.paths;
    let currentPath = this.state.activePath;
    let toRemove = paths.indexOf(currentPath);

    paths.splice(toRemove, 1);
    removeActive();

    this.setState({
      paths: paths,
      activePath: false
    })
  }

  addToPrimary() {
    let paths = this.state.paths;
    let currentPath = this.state.activePath;
    let divCurrentPath = document.getElementById(currentPath.id).getElementsByClassName('min-w-15')[0];
    let toPrimary = paths.indexOf(currentPath);

    paths[toPrimary].primary = true;
    divCurrentPath.classList.remove('d-none');
    divCurrentPath.classList.add('d-inline-block');
    this.setState({
      paths: paths
    })
  }

  createMap() {
    return {
      LatLng: []
    };
  }

  handleInputChange(e) {
    let name = e.target.id;
    if (name === 'inputTitle') removeError();
  }

  setActive(e, path) {
    try {
      removeActive();
    } catch(e) {
      console.log('No active');
    }

    let target = e.currentTarget;
    target.classList.add('active');

    this.setState({
      activePath: path
    })
  }

  render() {
    let fullDiscription;
    let newModalMap = this.createMap();
    let paths = this.state.paths;
    let activePath = this.state.activePath;
    let createPaths = paths.map((path, i) => {
          return(
              <a href="#" id={path.id} className="list-group-item list-group-item-action flex-column align-items-start mh-150 overflow-hidden" onClick={(e) => this.setActive(e, path)} key={i}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1 overflow-hidden">
                    <div className="d-none min-w-15 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="far" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" viewBox="0 0 576 512">
                        <path xmlns="http://www.w3.org/2000/svg" fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path>
                      </svg>
                    </div>
                    {path.title}
                  </h5>
                  <small className="font-weight-bold">{path.length} km</small>
                </div>
                <p className="mb-1">{path.short}</p>
              </a>
          )
    })
    
    if (activePath) {
      fullDiscription = 
        <div className="card mb-3">
          <h3 className="card-header">{activePath.title}</h3>
          <div className="card-body">
            <h5 className="card-title">{activePath.length} km</h5>
            <p className="card-text">{activePath.full}</p>
          </div>
          <div className="map">
            <GoogleMap LatLng={newModalMap.LatLng} />
          </div>
          <div className="card-body">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary" onClick={this.addToPrimary}>Add to primery</button>
              <button type="button" className="btn btn-secondary text-danger" onClick={this.removePath}>Remove</button>
            </div>
          </div>
        </div>
    }

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">Saunter</div>
          <div className="form-inline my-2">
            <button id="addBtn" onClick={this.openModal} className="btn btn-primary my-2 my-sm-0" type="button">Add path</button>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <input className="form-control mr-sm-2 mt-3" type="text" placeholder="Search"></input>

              <div className="list-group mt-4">
                <div className="mh-700 overflow-auto">
                  {createPaths}
                </div>
              </div>

            </div>

            <div className="col-md-8 col-xs-12">
              {fullDiscription}
            </div>
          </div>
        </div>

        <div className="modal overflow-auto" id="modal">
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

                    <div className="col">

                      <div className="form-group has-danger">
                        <label className="col-form-label" htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control border pl-1 is-invalid" id="inputTitle" onChange={this.handleInputChange}></input>
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
                    </div>

                    <div className="col">
                      <GoogleMap LatLng={newModalMap.LatLng} />
                    </div>

                  </div>
                 <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={(e) => this.addPath(newModalMap)}>Add path</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
