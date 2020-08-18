import React, { Component } from "react";
import TutorialDataService from "../services/service";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        descricao: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeDescription(e) {
    const descricao = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        descricao: descricao
      }
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  updateTutorial() {
    console.log(this.state.currentTutorial
      );
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Alterado com sucesso!"
        });
        setTimeout(() => {
          this.props.history.push('/tutorials')
        }, 1000);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="descricao">descricao</label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  value={currentTutorial.descricao}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p></p>
          </div>
        )}
      </div>
    );
  }

}