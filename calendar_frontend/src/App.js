import logo from './logo.svg';
import './App.css';
import { Routes,Route,useNavigate , useLocation} from "react-router-dom"
import { useEffect ,useState} from 'react';
import Calendar from "./components/calendar";
import Login from "./components/login";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  //change
  let [appStore, setAppStore] = useState({
    firstname: "",
    lastname: "",
    commercials: [],
    email:"",
    env:{
      'localhost':'local',
      'calendar.kpognon.eu':'prod',
    },
    baseUrl:{
      local:"http://localhost:9002",
      prod:`${window.location.protocol}//calendar.kpognon.eu/api`
    },
  })
  const baseUrl = appStore.baseUrl[appStore.env[window.location.hostname]]
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login  baseUrl={baseUrl} appStore={appStore} setAppStore={setAppStore} /> } />
        <Route path="/calendar" element={<Calendar  baseUrl={baseUrl} appStore={appStore} setAppStore={setAppStore} />} />
        </Routes>
    </div>
  );
}

export default App;
