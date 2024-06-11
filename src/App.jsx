import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from './Pages/home/Add';
import View from './Pages/home/View';
import Edit from './Pages/home/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="/add" element={<Add />} />
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App