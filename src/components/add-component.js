import React, { Component } from "react";
import TutorialDataService from "../services/service";


export default class AddTutorial extends Component {
    constructor(props) {
      super(props);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.saveTutorial = this.saveTutorial.bind(this);
      this.newTutorial = this.newTutorial.bind(this);
  
      this.state = {
        id: null,
        descricao: "", 
        submitted: false
      };
    }
  
  
    onChangeDescription(e) {
      this.setState({
        descricao: e.target.value
      });
    }
  
    saveTutorial() {
      var data = {
        descricao: this.state.descricao
      };
  
      TutorialDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            descricao: response.data.descricao,
  
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    newTutorial() {
      this.setState({
        id: null,
        descricao: "",
  
        submitted: false
      });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Gravado com sucesso!</h4>
                <button className="btn btn-success" onClick={this.newTutorial}>
                  Adicionar
                </button>
              </div>
            ) : (
              <div>
    
                <div className="form-group">
                  <label htmlFor="descricao">Descricao</label>
                  <input
                    type="text"
                    className="form-control"
                    id="descricao"
                    required
                    value={this.state.descricao}
                    onChange={this.onChangeDescription}
                    name="descricao"
                  />
                </div>
    
                <button onClick={this.saveTutorial} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }


}
