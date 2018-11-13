import React, { Component } from 'react';
import './components/model.js';
import './components/bootstrap.min.css';
import './App.css';

var config = {
            apiKey: "AIzaSyCQPedrIosBo1uxLaIDZxQO0KEsCjlzgyU",
            authDomain: "testmap-1542091002597.firebaseapp.com",
            databaseURL: "https://testmap-1542091002597.firebaseio.com",
            projectId: "testmap-1542091002597",
            storageBucket: "",
            messagingSenderId: "2934956787"
    };
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();

    this.state = {
      openModal: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">Saunter</div>
          <div className="form-inline my-2">
            <button id="addBtn" onClick={this.openModal} className="btn btn-secondary my-2 my-sm-0" type="button">Add path</button>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-4">
              <input className="form-control mr-sm-2 mt-3" type="text" placeholder="Search"></input>
            </div>

            <div className="col">
            </div>
          </div>
        </div>

        <div className="modal" id="modal">
          <div className="modal-dialog modal-lg" role="document">
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

                      <div className="form-group">
                        <label className="col-form-label" htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control border pl-1" id="inputTitle"></input>
                      </div>

                      <div className="form-group">
                        <label htmlFor="shortTextarea">Short discription</label>
                        <textarea className="form-control border pl-1 pt-1" id="shortTextarea" rows="2"></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="fullTextarea">Full discription</label>
                        <textarea className="form-control border pl-1 pt-1" id="fullTextarea" rows="4"></textarea>
                      </div>
                      
                      <button type="button" className="btn btn-primary">Add path</button>
                    </div>

                    <div className="col">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>
      </div>
    );
  }
}

export default App;
