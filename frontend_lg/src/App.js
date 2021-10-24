import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Cadastro from './cadastrar/Cadastrar';
import Listar from './listar/Listar';
import Editar from './editar/Editar'
import CadastrarPessoa from "./cadastro_pessoa/CadastrarPessoa";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>TODO</h1>        
          <Switch>
            <Route path="/cadastrar">
              <Cadastro/> 
            </Route>
            <Route exact path="/">
              <Listar/>
            </Route>
            <Route path="/editar/:id">
              <Editar/>
            </Route>
            <Route path="/cadastrarPessoa/">
              <CadastrarPessoa/>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
