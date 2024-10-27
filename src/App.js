import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//Teacher Asking
import CreateAskingGame from './Component/Game/Asking/CreateAskingGame';
import PlayerScore from './Component/Game/Asking/PlayerScores';


//Teacher Main
import Create from './Component/Teacher/Create';
import Home from './Component/Teacher/Home';



function App() {
  return (

    <div>
      <header>

      <Router>
        <Routes>
          <Route path="/teacherhome" element={<Home />} />
          <Route path="/teacher/create" element={<Create />} />
          <Route path="/teacher/create/asking-game" element={<CreateAskingGame />} />
        </Routes>
      </Router>
        
        
      </header>
    </div>
  );
}

export default App;
