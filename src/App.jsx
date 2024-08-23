import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Create from './components/Create';
import Show from './components/Show';
import Login from './components/Login';
import Register from './components/Register';
import UserEmailProvider from './components/UserEmailProvider';
import SinglePost from './components/SinglePost';
import Edit from './components/Edit';
import Admin from './adminDashboard/Admin';
import Error from './components/Error';
import Users from './adminDashboard/Users';
import Block from './components/Block';
import AdminList from './adminDashboard/AdminList';
import BlockList from './adminDashboard/BlockList';
import PostList from './adminDashboard/PostList';
import SingleUser from './adminDashboard/SingleUser';
import Welcome from './adminDashboard/Welcome';

function App() {
  
  return (
    <UserEmailProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainLayout />}>
            <Route path="login" element={<Login />} />
            <Route index element={<Home />} />
            <Route path="create" element={<Create />} />
            <Route path="show" element={<Show />} />
          <Route path="post/:id" element={<SinglePost/>}/>
            <Route path="edit/:id" element={<Edit />} />
            <Route path="register" element={<Register />} />
            <Route path="block" element={<Block />} />
            <Route path="*" element={<Error />} />
          </Route>

          <Route path="admin" element={<Admin />}>
            <Route index element={<Welcome />}/>
            <Route path="adminList" element={<AdminList />}/>
            <Route path="users" element={<Users />}/>
            <Route path="blockList" element={<BlockList/>}/>
            <Route path="postList" element={<PostList/>}/>
            <Route path="user/:id" element={<SingleUser/>}/>
            <Route path="*" element={<Error />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </UserEmailProvider>
  );
}

export default App;
