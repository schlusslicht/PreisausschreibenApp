//React Component for the application layout
import React from 'react';
import { Route, Link } from 'react-router-dom';

import { Layout, Menu, Row, Col, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import SearchPage from './SearchPage';
import SearchBanner from './SearchBanner';
import SearchRow from './SearchRow';
import SeriesPage from './SeriesPage';
import ErrorBoundary from './ErrorBoundary'
import CreditsPage from './CreditsPage';
import DocViewSwitch from './DocViewSwitch';

import withPromise from './withPromise';

const SearchPageWithPromise = withPromise( SearchPage );
const SeriesPageWithPromise = withPromise( SeriesPage );

export default class Layout_Container extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            searchInput: "suche...",
            searchCollection: "preisausschreiben",
            requestData: null
        };

        this.updateInput = this.updateInput.bind(this);
    }

    getTitle() {
        return this.state.header.header_title;
    }
    
    updateInput( value ) {
        this.setState(
            { searchInput: value.input, searchCollection: value.collection }
        );
    }

    render() {
        return(
            <Layout>
                <Header style={{borderBottom: '1px solid #E7EAEA' }} >
                    <div className="header--title" style={{
                                                        width: '200px',
                                                        float: 'left'
                                                    }}>
                        <Link to="/">Beta-Version Home</Link>
                    </div>              
                    <Menu mode="horizontal" style={{ lineHeight: '78px', fontFamily: "'Source Sans Pro', sans", letterSpacing: '0.04em', fontSize: '17px', fontWeight: '40', float: 'right' }} theme="light" >
                        <SubMenu title={<span>Suche</span>} >
                        <Menu.Item key="1">Preisausschreiben</Menu.Item>
                        <Menu.Item key="2">Personen</Menu.Item>
                        <Menu.Item key="3">Körperschaften</Menu.Item>
                        <Menu.Item key="4">Themen und Schlagworte</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span>Forschung</span>} >
                            <Menu.Item key="5">Grundriss</Menu.Item>
                            <Menu.Item key="6">Methodik</Menu.Item>
                            <Menu.Item key="7">Bibliographie</Menu.Item>
                            <Menu.Item key="8">Publikationen</Menu.Item>
                            <Menu.Item key="9">Visualisierungen und Analysen</Menu.Item>
                        </SubMenu>
                        <SubMenu title={<span>Über das Projekt</span>}>
                            <Menu.Item key="10">
                                <Link to="/about">Forschungsvorhaben</Link>
                            </Menu.Item>
                            <Menu.Item key="11">Mitarbeiter</Menu.Item>
                            <Menu.Item key="12">
                                <Link to="/credits">Credits</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>

                <Row>
                            <Route path="/search" render={ (props) => <SearchRow updateInput={this.updateInput} searchCollection={this.state.searchCollection} {...props} /> } />
                            <Route path="/" exact render={ (props) => <SearchBanner updateInput={this.updateInput} searchCollection={this.state.searchCollection} {...props} />  } />
                            {/*below is just a quick hack to get to landing page, when opening the index.html in couchdb*/}
                            <Route path="/index.html" exact render={ (props) => <SearchBanner updateInput={this.updateInput} searchCollection={this.state.searchCollection} {...props} />  } />
                            {/*
                                                <Route path="/person/:docId" render={ (props) => <ErrorBoundary><ResultPage {...props} /> </ErrorBoundary> } ></Route>*/}
                            {/* can I use :docId to put the value into a prop, so the Result page can render a document from the url alone? yes!*/}
                            
                            <Route path="/overview" render={ (props) => <ErrorBoundary><SeriesPageWithPromise query="none" collection="overview_competitions" {...props} /></ErrorBoundary> } />
                            <Route path="/about" component={AboutPage} />
                            <Route path="/credits" component={CreditsPage} />
                </Row >
                <Row type="flex" justify="center" style={{ paddingLeft: "60px", paddingRight: "60px", paddingBottom: "120px"}}>
                <Route path="/" exact component={LandingPage} />
                {/*below is just a quick hack to get to landing page, when opening the index.html in couchdb*/}
                <Route path="/index.html" exact component={LandingPage} />
                <Route path="/dokumente/:docId" render={ (props) => {const DocViewSwitchWithPromise = withPromise( DocViewSwitch ); return(<ErrorBoundary><DocViewSwitchWithPromise query={props.match.params.docId} {...props}/></ErrorBoundary>);} } ></Route>
                {/*<Route path="/dokumente/:docType/:docId" render={ (props) => <ErrorBoundary><ResultPage {...props} /> </ErrorBoundary> } ></Route>*/}
                <Route path="/search" render={ (props) => <ErrorBoundary> <SearchPageWithPromise query={this.state.searchInput} collection={this.state.searchCollection} {...props} /> </ErrorBoundary> } />
                <div class="ModalHolder">
                </div>
                </Row>
                <Footer style={{textAlign: 'center'}}>
                    Musikalische Preisausschreiben ©2018
                </Footer>

            </Layout>
        );
    }
}

