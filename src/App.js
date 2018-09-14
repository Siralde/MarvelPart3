import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import { connect } from 'react-redux';
import { addComicToMyList, deleteComicFromMyList, getCharacters, getComics} from './actions';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            value: '',
            selectedValue: '',
            characters: []
        };
        this.handleSelection = this.handleSelection.bind(this); //Esto maneja lo de la lista
        this.handleGetCharacters = this.handleGetCharacters.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectCharacter = this.handleSelectCharacter.bind(this);
        this.handleGetComics = this.handleGetComics.bind(this);
    } // Fin del constructor

    handleSelection(comicList, comicId) {
        if (comicList === 'allComics' && this.props.selected.indexOf(comicId) === -1) {
            this.props.addComicToMyList(comicId);
        } else {
            this.props.deleteComicFromMyList(comicId);
        }
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleGetCharacters(event){
        event.preventDefault();
        console.log('El usuario puso: ' + this.state.value);
        this.props.getCharacters(this.state.value)
    }

    handleSelectCharacter(event){
        // console.log(this.state.selectedValue);
        // this.setState({
        //     selectedValue: event.target.value
        // }, () => { console.log(this.state.selectedValue); });
        this.setState({
            selectedValue: event.target.value
        });
    }

    handleGetComics(){
        // event.preventDefault();
        console.log(this.state.selectedValue);
        this.props.getComics(this.state.selectedValue)
    }


    render() {

      // const comics = Comics().data.results;
      const comics = this.props.comics;
      const {selected} = this.props;
//Del array grande
      const selectedComics = comics.filter(comic => selected.indexOf(comic.id)!==-1);

      const option = this.props.characters.map(character =>
              <option key={character.id} value={character.id}>{character.name}</option>
          );

        return (
            <div>
                <div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />

                    <button type="submit" onClick={this.handleGetCharacters}>
                        Search Characters
                    </button>
                </div>

                <div>
                    <select value={this.state.selectedValue} onChange={this.handleSelectCharacter}>
                        {option}
                    </select>

                    <button type="submit" onClick={this.handleGetComics}>
                        Search Comics
                    </button>
                </div>


                <div className="store-container">
                    <h1>All Comics: {comics.length} Comics available</h1>
                    <List comics={comics}
                          selectedIds={selected}
                          onSelect={this.handleSelection.bind(this, 'allComics')}/>
                </div>
                <div className="owned-container">
                    <h1>My Comics: {selected.length} Comics selected</h1>
                    <List comics={selectedComics}
                          onSelect={this.handleSelection.bind(this, 'myComics')}/>
                </div>
            </div>
        );
    };// Fin del Render
} //Fin del componente App

//Este ejecuta los store
const mapStateToProps = state => {
    return {
        selected: state.selected,
        characters: state.characters,
        comics: state.comics
    };
};

// Este ejecuta las acciones
const mapDispatchToProps = dispatch =>({
    addComicToMyList: (comicId) => dispatch (addComicToMyList(comicId)),
    deleteComicFromMyList: (comicId)=> dispatch (deleteComicFromMyList(comicId)),
    getCharacters: (characterInitials)=> dispatch (getCharacters(characterInitials)),
    getComics: (comicId)=> dispatch(getComics(comicId))
});

export default connect (mapStateToProps, mapDispatchToProps) (App);
