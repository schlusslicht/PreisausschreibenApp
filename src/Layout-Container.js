//React Component for the application layout
import React from 'react';
import { Route, Link } from 'react-router-dom';

import { Layout, Menu, Row, Col, Breadcrumb } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

import CouchDataStore from './CouchDataStore';

import LandingPage from './LandingPage';
import AboutPage from './AboutPage';
import SearchPage from './SearchPage';
import SearchBanner from './SearchBanner';
import SearchRow from './SearchRow';

import withPromise from './withPromise';

const apiUrl = 'http://www.mocky.io/v2/59e752d10f00003107ee99e7';
const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    };
// Bug in HOC withPromise
//const SearchPageWithPromise = withPromise( fetch(apiUrl, requestOptions), SearchPage );
const SearchPageWithPromise = withPromise( SearchPage );

export default class Layout_Container extends React.Component {
    constructor() {
        super();
        this.state = {
            data: CouchDataStore.getResults(),
            messages: [],
            searchInput: "suche...",
            searchCollection: "unspezifisch",
            requestData: null
        };

        this.updateInput = this.updateInput.bind(this);
    }

    componentWillMount() {
        CouchDataStore.subscribe( this.updateData );
    }

    componentDidMount() {
        //this.setState( {isFetching: true} );

        //not using the data store yet
        /*
        fetch( apiUrl, requestOptions )
            .then( response => response.json() )
            .then( data => this.setState( { requestData: data.rows, isFetching: false } ) )*/
    }

    updateData() {
        this.setState( {
            data: CouchDataStore.getResults()
        } );
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
        //console.log(this.state.searchInput);
        return(
            <Layout>
                <Header>
                    <div className="header--title" style={{
                                                        width: '200px',
                                                        float: 'left'
                                                    }}>
                        <Link to="/">Musikalische Preisausschreiben</Link>
                    </div>              
                    <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
                        <SubMenu title={<span>Über das Projekt</span>}>
                            <Menu.Item key="1">
                                <Link to="/about">Forschungsvorhaben</Link>
                            </Menu.Item>
                            <Menu.Item key="2">Mitarbeiter</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3">Publikationen</Menu.Item>
                        <Menu.Item key="4">Bibliographie</Menu.Item>
                        <Menu.Item key="5">Visualisierungen</Menu.Item>
                    </Menu>
                </Header>

                <Row>
                            <Route path="/" exact render={ (props) => <SearchBanner updateInput={this.updateInput} {...props} />  } />
                            <Route path="/search" render={ (props) => <SearchRow updateInput={this.updateInput} {...props} /> } />
                            <Route path="/about" component={AboutPage} />
                </Row>
                
                <Route path="/" exact component={LandingPage} />
                <Route path="/search" render={ (props) => <SearchPageWithPromise query={this.state.searchInput} collection={this.state.searchCollection} {...props} /> } />
                {/*<Route path="/search" render={ (props) => <SearchPage requestData={this.state.requestData} isLoading={this.state.isFetching} {...props} /> } />
                there is a bug in the usage of the higher order component
                <Route path="/search" render={ (props) => <SearchPageWithPromise {...props} /> } />*/}
                <Footer style={{textAlign: 'center'}}>
                    Musikalische Preisausschreiben ©2017
                </Footer>

            </Layout>
        );
        /*
        return(
            <div>
                <Header_Container getTitle={this.getTitle.bind(this)} />
                <Body/>
                <Sidebar navItems={["first", "second", "third"]} />
                <Footer/>
            </div>
        );
        */
    }
}

