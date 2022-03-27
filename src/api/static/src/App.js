import style from './App.module.scss';
import Header from './Components/Header';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';

function App() {
  return (
  <div className={ `${style.main_container}` }>
    <Header />
    <Sidebar />
    <Main />
  </div>
  );
}

export default App;
