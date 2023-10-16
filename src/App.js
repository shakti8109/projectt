import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Info from './Info';
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from './component/DataContext';

function App() {
  
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/info/:productId" element={<Info/>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
