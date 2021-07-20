
import './App.css';
import {Pocetna} from './Pocetna';
import {Oprema} from './Oprema';
import {Korisnik} from './Korisnik';
import {Lokacija} from './Lokacija';
import {Revers} from './Revers';
import {Navigation} from './Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Evidencija informatičke opreme
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Pocetna} exact/>
       <Route path='/Oprema' component={Oprema}/>
       <Route path='/Lokacija' component={Lokacija}/>
       <Route path='/Korisnik' component={Korisnik}/>
       <Route path='/Revers' component={Revers}/>
       

     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

