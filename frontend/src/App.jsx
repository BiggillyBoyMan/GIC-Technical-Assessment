import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CafesPage from './pages/CafesPage'
import EmployeesPage from './pages/EmployeesPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cafes"/>} />
        <Route path="/cafes" element={<CafesPage/>} />
        <Route path="/cafes/add" element={<CafesPage/>} />
        <Route path="/cafes/edit/:id" element={<CafesPage/>} />
        <Route path="/cafes/view/:id" element={<CafesPage/>} />
        <Route path="/employees" element={<EmployeesPage/>}/>
        <Route path="/employees/add" element={<EmployeesPage/>}/>
        <Route path="/employees/edit/:id" element={<EmployeesPage/>}/>
        <Route path="/employees/view/:id" element={<EmployeesPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
