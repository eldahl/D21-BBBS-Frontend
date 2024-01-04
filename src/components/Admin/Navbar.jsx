import Profile from './Profile';

// Navbar.jsx
const Navbar = () => {
    return (
      <nav className="bg-gray-300 border-b-2 py-2 px-4 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Schedule</li>
          <li className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Foreclose</li>
          <li className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Manage Rooms</li>
          <li className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Manage Additional Services</li>
          <li className="font-medium text-gray-700 hover:text-gray-900 cursor-pointer">Add Booking</li>
        </ul>
        <Profile />
      </nav>
    );
  };
  
  export default Navbar;