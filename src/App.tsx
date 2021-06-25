//React e contexto
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';

//Pages
import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

//Css
import './styles/global.scss';

//Componente
export default function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch> 
          <Route path='/' exact component={Home}/>
          <Route path='/rooms/new' component={NewRoom}/>
          <Route path='/rooms/:id' component={Room}/>

          <Route path='/admin/rooms/:id' component={AdminRoom}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

/**
 * NOTE:
 *  Switch - Leva até a rota determinada, caso achar, não chama a próxima rota.
 *  Ex.: Ao acessar a rota '/rooms/new' por padrão o React Router DOM continuaria a chamar outra rotas, 
 *  como a  '/rooms/:id', porém o switch faz que ao achar a rota '/rooms/new' ele
*   fique satisfeito e pare de procurar outra rotas.
 */
