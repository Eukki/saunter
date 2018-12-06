import React from 'react';

export const Header = ({ showModal }) => {
	const openModal = () => {
		showModal(true);
	}

	return (
	    <nav className="navbar navbar-light bg-light">
	      <div className="navbar-brand">Saunter</div>
	      <div className="form-inline my-2">
	        <button id="btnAdd" onClick={openModal} className="btn btn-primary my-2 my-sm-0" type="button">Add path</button>
	      </div>
	    </nav>
	)
};
