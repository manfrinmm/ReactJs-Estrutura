import React, { Component } from "react";

// import { Container } from './styles';
import TechItem from "./TechItem";

export default class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  /**
   * Ciclos de vida
   */

  //Executado assim que o componente aparece em tela
  componentDidMount() {
    this.setState({ techs: JSON.parse(localStorage.getItem("techs")) || [] });
  }

  //Executado sempre que  houver alterações nas props ou estado
  componentDidUpdate(prevProps, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  //Executado depois que  houver alterações nas props ou estado
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  //Executado quando o componente deixa de existir
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleRemove = id => {
    this.setState({ techs: this.state.techs.filter(t => t !== id) });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.newTech}
            onChange={this.handleInputChange}
          />
        </form>
        {this.state.newTech && <h1>Name: {this.state.newTech}</h1>}

        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleRemove(tech)}
            />
          ))}
        </ul>
      </>
    );
  }
}
