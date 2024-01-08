import AuthContextProvider from "./Component/Context/AuthContextProvider";
import Navbar from "./Component/Navbar/Navbar";
import ForgotPassword from "./Component/Pages/FogotPassword";
import ProfilePage from "./Component/Profile/ProfilePage";
import SignUp from "./Component/Signup/Signup";
import {Routes , Route} from 'react-router-dom';
function App() {
 // const authctx = useContext(AuthContext);
 
  return (
    <AuthContextProvider>
      <Navbar/>
      <Routes>
      <Route path='/' element= {<SignUp />} />
      <Route path='/profilepage' element={<ProfilePage/>}/>
      <Route path="/fpassword" element={<ForgotPassword/>}/>
      </Routes>
    </AuthContextProvider>
    
  );
}

export default App;
