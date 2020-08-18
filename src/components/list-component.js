import React, { Component } from "react";
import TutorialDataService from "../services/service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
    
  }


  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        
        console.log(response.data)
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  
  
  render() {
    const {  tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Lista de Discursos</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.descricao}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Descrição:</strong>
                </label>{" "}
                {currentTutorial.descricao}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>click em um registro</p>
            </div>
          )}
        </div>
      </div>
    );
  }


}