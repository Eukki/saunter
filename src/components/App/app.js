import React, { Component } from 'react';
import database from '../Firebase/firebase';

import { Header } from './header';
import { List } from './list';
import FullDiscription from './full-discription';
import Modal from './modal';

import './Style/bootstrap.min.css';
import './Style/style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paths: [],
      activePath: false,
      isShowModal: false,
      search: '',
      loading: false
    }

    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.showModal = this.showModal.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true})

    database.ref('paths').once('value').then(snapshot => {
      const val = snapshot.val();
      let paths = [];
      let activePath = false;
      
      if (val) val.forEach(path => paths.push(path))
      if (paths[0]) activePath = paths[0];

      this.setState({
        paths,
        activePath,
        loading: false
      })
    })
  }

  save(paths) {
    let savePaths = []
    paths.forEach(path => {
      let push = {
        map: [],
        title: path.title,
        short: path.short,
        full: path.full,
        isPrimary: path.isPrimary,
        length: path.length,
        id: path.id
      }

      if (path.map[0]) {
        path.map.forEach((point) => {
          push.map.push({
            lat: point.lat,
            lng: point.lng
          })
        })
      }
      savePaths.push(push)
    })

    database.ref('paths').set(savePaths)
  }

  update(paths) {
    this.setState({paths});
    this.save(paths);
  }

  updateActive(activePath) {
    this.setState({activePath})
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value,
      activePath: false
    })
  }

  showModal(isShowModal) {
    this.setState({isShowModal});
  }

  render() {
    const paths = this.state.paths;
    const activePath = this.state.activePath;
    const isShowModal = this.state.isShowModal;
    const loading = this.state.loading;
    return (
      <div>
        
        <Header showModal={this.showModal} />
        
        <div className="container">
          <div className="row">
            
            <div className="col-md-4 col-xs-12">
              
              <input className="form-control mr-sm-2 mt-3" type="text" placeholder="Search" onChange={this.updateSearch}></input>

              <div className="list-group mt-4">
                <div className="mh-700 overflow-auto">
                  <List paths={paths} activePath={activePath} updateActive={this.updateActive} search={this.state.search} />
                </div>
              </div>

            </div>

            <div className="col-md-8 col-xs-12">
              {activePath && !isShowModal && <FullDiscription paths={paths} activePath={activePath} updatePaths={this.update} updateActive={this.updateActive} />}
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              {loading && <h4 className="text-center">Loading...</h4>}
            </div>
          </div>
        </div>

        {isShowModal && <Modal paths={paths} updateActive={this.updateActive} updatePaths={this.update} showModal={this.showModal} isShowModal={this.state.isShowModal} />}

      </div>
    );
  }
}

export default App;