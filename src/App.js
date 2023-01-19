import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Navbar/>
        <Alert message="This is an Alert"/>
        <div className="container">
          <Home/>
        </div>
      </NoteState>
    </>
  );
}

export default App;
