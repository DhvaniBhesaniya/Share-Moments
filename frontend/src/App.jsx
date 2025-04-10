import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import EventsPage from './components/events/EventsPage';
import useStore from './store/useStore';

// Layout component to wrap all pages
const Layout = ({ children }) => {
  const { theme } = useStore();
  
  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <main>{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          {/* Add more routes as you create new pages */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/register" element={<RegisterPage />} /> */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
