
import './app.css';
import Header from './components/Header';
import Routes from './components/Routes';

export function App() {


  return (
    <div className="app">
      <Header/>
      <div className="app-content">
        <Routes/>
      </div>
    </div>
  )
}
