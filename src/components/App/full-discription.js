import React, { Component } from 'react';
import GoogleMap from '../map.js';

const paths = this.props.paths;
const activePath = this.props.activePath;
const modalMap = this.props.modalMap;

function removeActive() {
    let active = document.getElementsByClassName('active')[0];
    active.classList.remove('active');
}

function addToPrimary() {
    let divCurrentPath = document.getElementById(activePath.id).getElementsByClassName('min-w-15')[0];
    let toPrimary = paths.indexOf(activePath);

    paths[toPrimary].primary = true;
    this.props.updatePaths(paths)
}

function removePath() {
    let toRemove = paths.indexOf(activePath);

    paths.splice(toRemove, 1);
    removeActive();

    this.props.updatePaths(paths)
}

export const fullDiscription = (activePath, modalMap) => {
    return (
        <div className={activePath ? "card mb-3" : "hidden"}>
          <h3 className="card-header">{activePath.title}</h3>
          <div className="card-body">
            <h5 className="card-title">{activePath.length} km</h5>
            <p className="card-text">{activePath.full}</p>
          </div>
          <div className="map">
            <GoogleMap LatLng={modalMap.LatLng} />
          </div>
          <div className="card-body">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-secondary" onClick={addToPrimary()}>Add to primery</button>
              <button type="button" className="btn btn-secondary text-danger" onClick={removePath()}>Remove</button>
            </div>
          </div>
        </div>
    )
};