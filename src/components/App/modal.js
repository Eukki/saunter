import React, { Component } from 'react';
import GoogleMap from '../map.js';

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
    div.innerHTML = 'Fill in the required field';
}

function removeError() {
    let div = document.getElementsByClassName('invalid-feedback')[0];
    div.innerHTML = '';
}

function closeModal() {
    document.getElementById('modal').classList.remove('d-block');
}

function handleInputChange(e) {
    let name = e.target.id;
    if (name === 'inputTitle') removeError();
}

function addPath(map) {
    let title = document.getElementById('inputTitle').value;
    let short = document.getElementById('shortTextarea').value;
    let full = document.getElementById('fullTextarea').value;

    if (title.length !== 0) {
      let paths = this.props.paths;
      let path = {
        map: map,
        title: title,
        short: short,
        full: full,
        isPrimary: false,
        length: 0,
        id: generateID()
      }

      paths.push(path);
      this.props.updatePaths(paths);

      removeValue();
      removeError();
      closeModal();
    } else {
      addError();
    }

}


export const modal = ({ modalMap }) => {
    <div className="modal overflow-auto" id="modal">
      <div className="modal-dialog mw-100 p-3" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add new path</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="container">
              <div className="row">

                <div className="col">

                  <div className="form-group has-danger">
                    <label className="col-form-label" htmlFor="inputTitle">Title</label>
                    <input type="text" className="form-control border pl-1 is-invalid" id="inputTitle" onChange={handleInputChange(e)}></input>
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
                  <GoogleMap LatLng={modalMap.LatLng} />
                </div>

              </div>
             <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={(e) => addPath(this.props.modalMap)}>Add path</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal()}>Close</button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}