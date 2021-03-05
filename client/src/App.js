import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Movies, Series, Detail, Watchlist, Navbar } from './exporter'

function App() {
  return (
    <div className="App flex flex-row h-screen">
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/:type/:id">
            <Detail/>
          </Route>
          <Route path="/watchlist">
            <Watchlist/>
          </Route>
          <Route path="/tv">
            <Series/>
          </Route>
          <Route path="/movies">
            <Movies/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
