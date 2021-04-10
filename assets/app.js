import React from 'react';
import ReactDOM from "react-dom";
import './styles/app.css';
// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Switch,Route } from "react-router-dom";
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';
import LoginPage from './js/pages/LoginPage';

console.log("Hello World");
const App = () => {
    return (
    <HashRouter>
      <Navbar />
      <main className="container pt-5">
          <Switch>
          <Route Path="/login" component={LoginPage} />
              <Route Path="/invoices" component={InvoicesPage} />
              <Route Path="/customers" component={CustomersPage} />
              <Route path="/" component={HomePage} />

          </Switch>
     

      </main>
    </HashRouter>
    )};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />,rootElement);
