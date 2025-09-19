import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directions from './pages/Directions';
import Universities from './pages/Universities';
import CareerTest from './pages/CareerTest';
import Statistics from './pages/Statistics';
import Subjects from './pages/Subjects';
import DataExport from './pages/DataExport';
import SubjectTest from './pages/SubjectTest';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
                  <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:id" element={<SubjectTest />} />
          <Route path="/test" element={<CareerTest />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/data-export" element={<DataExport />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;