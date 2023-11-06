import Navbar from "./Component/Navbar/Navbar";
import ForgotPassword from "./Component/Pages/FogotPassword";
import ProfilePage from "./Component/Profile/ProfilePage";
import SignUp from "./Component/Signup/Signup";
import {Routes , Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      
      <Route path='/' element={<SignUp/>}/>
      <Route path='/profilepage' element={<ProfilePage/>}/>
      <Route path="/fpassword" element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
