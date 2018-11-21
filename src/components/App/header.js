import React, { Component } from 'react';

function openModal() {
    document.getElementById('modal').classList.add('d-block');    
}

export const header = () => {
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">Saunter</div>
      <div className="form-inline my-2">
        <button id="addBtn" onClick={openModal()} className="btn btn-primary my-2 my-sm-0" type="button">Add path</button>
      </div>
    </nav>
}