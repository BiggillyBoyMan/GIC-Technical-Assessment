import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import CafesPage from './pages/CafesPage'
import EmployeesPage from './pages/EmployeesPage'
import AddEditCafePage from './pages/AddEditCafePage'
import AddEditEmployeePage from './pages/AddEditEmployeePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/cafes"/>} />
        <Route path="/cafes" element={<CafesPage/>} />
        <Route path="/cafes/add" element={<AddEditCafePage/>} />
        <Route path="/cafes/edit/:id" element={<AddEditCafePage/>} />
        <Route path="/employees" element={<EmployeesPage/>}/>
        <Route path="/employees/add" element={<AddEditEmployeePage/>}/>
        <Route path="/employees/edit/:id" element={<AddEditEmployeePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
