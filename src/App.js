import React from 'react';
import logo from './bootstrap.svg';
import './assets/scss/App.scss';

function Navigation(props) {
  const links = []

  props.links.forEach(({ text, href }) => links.push((
    <li className="nav-item">
      <a href={href} className="nav-link" aria-current="page">{text}</a>
    </li>
  )))

  return (
    <ul className="navbar-nav">
      {links}
    </ul>
  )

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      navLinks: []
    };
  }

  componentDidMount() {
    fetch('/json/siteConfig.json')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            navLinks: result.navLinks
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, navLinks } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header bg-light text-dark d-flex flex-column align-items-center justify-content-start">
            <nav className="App-nav navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                  {/* Affiche le retour de la fonction Navigation(). */}
                  <Navigation links={navLinks} />
                </div>
              </div>
            </nav>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }
}

export default App;
