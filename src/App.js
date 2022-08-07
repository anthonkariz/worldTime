import logo from './logo.svg';
import './App.css';
import Main from './Pages/Main';
import {store}  from'./Features/Store';
import {Provider} from'react-redux'

function App() {
  return (
    <Provider store={store}>
           <Main/>
    </Provider>
     
  );
}

export default App;
