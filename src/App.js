//1. import area
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import APITable from './pages/APITable';
import UpdateAPI from './pages/UpdateAPI';

//2. defination aea
function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<APITable />}></Route>
        <Route path="/updateapi" element={<UpdateAPI />}></Route>
      </Routes>
     </BrowserRouter>
  );
}

//3. export area 
export default App;
