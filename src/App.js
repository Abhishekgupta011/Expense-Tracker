import { Provider } from "react-redux";
import Navbar from "./Component/Navbar/Navbar";
import ForgotPassword from "./Component/Pages/FogotPassword";
import ProfilePage from "./Component/Profile/ProfilePage";
import SignUp from "./Component/Signup/Signup";
import {Routes , Route} from 'react-router-dom';
import store from "./Component/Store/Store";
import { Diversity2 } from "@mui/icons-material";
function App() {
 // const authctx = useContext(AuthContext);
 
  return (
    <Provider store={store}>
      <Navbar/>
      <Routes>
      <Route path='/' element= {<SignUp />} />
      <Route path='/profilepage' element={<ProfilePage/>}/>
      <Route path="/fpassword" element={<ForgotPassword/>}/>
      </Routes>
    </Provider>
    
  );
}

export default App;
