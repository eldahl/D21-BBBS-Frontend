import 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Test from './components/Test';
import AdminLayout from './components/Admin/AdminLayout';
import Admin from './components/Admin/Admin'
import BookingLayout from './components/Booking/BookingLayout';
import Booking from './components/Booking/BookingFlow';
import OrderConfirmation from './components/Booking/OrderConfirmation';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <>
      <ErrorBoundary fallback={<ErrorPage/>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BookingLayout/>}>
              <Route index element={<Booking/>} />
              <Route path="test" element={<Test/>} />
              <Route path="summary/:order" element={<OrderConfirmation/>} />
              
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
              <Route index element={<Admin/>} />
              <Route path="test" element={<Test/>} />

            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App
