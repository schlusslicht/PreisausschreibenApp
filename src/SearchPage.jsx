/*import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb, Menu, Table, Row, Col } from 'antd';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;


const columnsPersonen = [
    {
        title: <span>Nachname</span>,
        dataIndex: 'value.nachname',
        key: 'value.nachname',
        render: (text, record) => <Link to={"/dokumente/" + record.id}> {text} </Link>
    },
    {
        title: <span>Vorname</span>,
        dataIndex: 'value.vorname',
        key: 'value.vorname'
    },
    {
        title: <span>Alias</span>,
        dataIndex: 'value.alias',
        key: 'value.alias'
        //render: (text, record) => record.value.name.alias? <ul>{ record.value.name.alias.map( alias => {<li>alias</li>} ) }</ul> : ""
    }
]

const columnsPreisausschreiben = [
    {
        title: <span>Ausschreibung</span>,
        dataIndex: 'value.ausschreibung',
        key: 'value.ausschreibung',
        render: (text, record ) => <Link to={"/dokumente/" + record.id}> {text? text: "unbekannt"} </Link>
    },
    {
        title: <span>Ereignisse</span>,
        dataIndex: 'value.ereignisse',
        key: 'value.ereignisse',
        // will have to check, if the unique keys generated when the array is mapped are used in a meaningful way (index for unique keys not recommended)
        render: (text, record) => <ul> {record.value.ereignisse.map( ( ereignis, i ) => <li key={i} >  {(ereignis.zeit? ereignis.zeit.datum : "") + ", " + ereignis.ereignistyp + ", " + ( ereignis.ort? ereignis.ort.ortsname : "" )} </li>)} </ul>
    },
    {
        title: <span>Aufgaben</span>,
        dataIndex: 'value.aufgaben',
        key: 'value.aufgaben'
        //render: (text, record) => <div>{record.value.aufgaben.split( "," ).join(", ")}</div>
    }
]*/
/*
const columnsKoerperschaften = [
    {
        title: 'Bezeichnung',
        dataIndex: 'value.bezeichnung[0]',
        key: 'value.bezeichnung',
        render: (text, record ) => <Link to={"/dokumente/" + record.id}> {text} </Link>
    },
    {
        title: 'Ort',
        dataIndex: 'value.ort',
        key: "value.ort" 
    },
    {
        title: 'Art',
        dataIndex: 'value.art',
        key: 'value.art'
    }
]

const columnsSerien = [
    {
        title: 'Bezeichnung der Serie',
        dataIndex: 'value',
        key: "serienbezeichnung",
        render: (text, record) => <Link to={"/dokumente/" + record.id}> {text} </Link>
    }
]

// if the sider is added with a custom component the surrounding ant Layout component will be
// missing the ant-layout-has-sider class and not render sider and content correctly 
export default function SearchPage( props ) {

    let columns;

    let data;
    
    //the variables and forEach block filter the data so only unique ids remain in the array
    //can be taken out when using elasticsearch
    let dataIds = [];
    let dataUnique = [];

    console.log(dataUnique);

    props.requestData ? data = props.requestData : data = [] ;
    
    data.forEach( function( e ) {
        if( dataIds.indexOf( e.id ) === -1 ) {
            dataIds.push( e.id );
            dataUnique.push( e );
        }
    } );

    switch( props.collection ) {
        case "preisausschreiben": columns = columnsPreisausschreiben; break;
        case "personen": columns = columnsPersonen; break;
        case "koerperschaften": columns = columnsKoerperschaften; break;
        case "serien": columns = columnsSerien; break;
    }

    return(
        <Layout>

            <Content style={{ marginTop: "50px" }}>
            
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/search">Suchergebnisse</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                <Row><Col span={24}>
                    <p>Suchbegriff: {props.query}</p>
                    {
                         //as it is the id can be repeated, since results can be repeated in the view
                        //right now I use it as a cheap filter... but really shouldn't
                       // I keep it for now since elasticsearch should be able to filter results before sending the response object

                        //antd table component sets the word-break CSS property to "break-all"; solution below (changing it in the table component) does not work
                        <Table
                            bodyStyle={{ backgroundColor: "#ffffff" }}
                            columns={columns} 
                            dataSource={dataUnique} 
                            rowKey={ record => record.id }
                            //onRow={ (record) => {return { onClick: ()=>{alert("hello");} }; }  }
                            />
                    }
                </Col></Row>     
                </Layout>
               
            </Content>
        </Layout>
    );
}*/