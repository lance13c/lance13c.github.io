import React from 'react';
import { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ImageCard from './components/cards/image-card';
import pages from './pages';

console.log(pages);

export default function App() {
	const [currentTab, setCurrentTab] = useState('dashboard');

	return (
	  <Router>
		<div>
		  <nav>
			<ul className="row">
			  {pages.map(page => ( // with a name, and routes
				  <ImageCard key={page.name} className={ `
				  	${currentTab === page.name ? 'active' : ''} 
					col-xs-12
					col-sm-8
					col-md-6
					col-lg-4`}>
                    <Link to={page.routeProps.path} onClick={() => setCurrentTab(page.name)}>{page.name}</Link>
                  </ImageCard>
              ))}
			</ul>
		  </nav>
  
		  {/* A <Switch> looks through its children <Route>s and
			  renders the first one that matches the current URL. */}
			<Switch className="App-content">
				{pages.map(page => (
				<Route {...page.routeProps} key={page.name} />
				))}
			</Switch>
		</div>
	  </Router>
	);
  }
