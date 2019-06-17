import React from 'react';
import { withRouter } from 'react-router-dom';

import { Layout, Menu, Input, Checkbox, Dropdown, Icon, Radio, Row, Col } from 'antd';
import { filterOption } from 'rc-mentions/lib/util';

//this should be a form?

const CheckboxGroup = Checkbox.Group;
const { Sider } = Layout;
const { SubMenu } = Menu;

const optionsType = [ {label: "Preisausschreiben", value: "contest"}, {label: "Personen", value: "person"} ]
const optionsParticipants = [ 
                                {label: "TeilnehmerIn", value: "TeilnehmerIn"}, 
                                {label: "Jurymitglied", value: "Jurymitglied"}, 
                                {label: "ausschreibende Institution/Person", value: "ausschreibende Institution/Person"}, 
                                {label: "OrganisatorIn/RepräsentantIn", value: "OrganisatorIn/RepräsentantIn"},
                                {label: "InterpretIn", value: "InterpretIn"},
                                {label: "JournalistIn", value: "JournalistIn"},
                                {label: "KomponistIn/ArrangeurIn", value: "KomponistIn/ArrangeurIn"},
                                {label: "AutorIn", value: "AutorIn"},
                                {label: "MäzenIn", value: "MäzenIn"},
                                {label: "LehrerIn von TeilnehmerIn", value: "LehrerIn von TeilnehmerIn"},
                                {label: "Sonstige", value: "Sonstige"},
                            ]

const menuRoles = (
    <Menu>
        <Menu.Item key="0">TeilnehmerIn</Menu.Item>
        <Menu.Item key="1">Jurymitglied</Menu.Item>
        <Menu.Item key="2">ausschreibende Institution/Person</Menu.Item>
        <Menu.Item key="3">OrganisatorIn/RepräsentantIn</Menu.Item>
        <Menu.Item key="4">InterpretIn</Menu.Item>
        <Menu.Item key="5">JournalistIn</Menu.Item>
        <Menu.Item key="6">KomponistIn/ArrangeurIn</Menu.Item>
        <Menu.Item key="7">AutorIn</Menu.Item>
        <Menu.Item key="8">MäzenIn</Menu.Item>
        <Menu.Item key="9">LehrerIn von TeilnehmerIn</Menu.Item>
        <Menu.Item key="10">Sonstige</Menu.Item>
    </Menu>
);

function onChange(checkedValues) {
    console.log(checkedValues)
}

function handleSelect(e) {
    console.log(e.item.props.children);
} 

function FacetSider( props ) {

    let selectValue = props.searchType;
    //elasticsearch depended
    //let queryObj = {match: { _all: { query: /*props.query.match._all.query*/'', operator: /*props.query.match._all.operator*/"OR"} }};

    let strQueryObj = { simple_query_string: { query: props.query.simple_query_string.query, fields: ["_all"] } };
    
    let filterObj = { filter: []}

    return(
        <Sider>
            {/*<Input.Search 
                size="large"
                placeholder="Ihre Suche..."
                onSearch={ value => {
                            //if component is changed to a stateful component extending React.Component, use this.props.history.push(...)
                            let cleanedInput = value.toLowerCase();
                            queryObj.match._all.query=cleanedInput;
                            //let queryObj = {match: { _all: { query: cleanedInput, operator: props.query.match._all.operator} }};
                            props.history.push('/prosearch');
                            props.updateQuery({ input: queryObj, type: selectValue});
                            //props.updateInput(value);
                            //return console.log(value);
                            } 
                        }
                    />*/}
        <Input.Search 
            size="large"
            placeholder="Ihre Suche..."
            onSearch={ value => {
                        //if component is changed to a stateful component extending React.Component, use this.props.history.push(...)
                        let cleanedInput = value.toLowerCase();
                        strQueryObj = {simple_query_string: { query: cleanedInput, fields: ["_all"] } };
                        props.history.push('/prosearch');
                        props.updateQuery({ input: strQueryObj, strQueryObj: strQueryObj, type: selectValue});
                        //props.updateInput(value);
                        //return console.log(value);
                        } 
                    }
        />
        <Checkbox onChange={onChange}>Preisausschreiben</Checkbox>
        <Dropdown overlay={<Menu mode="vertical"><Menu.Item><CheckboxGroup options={optionsParticipants} onChange={onChange} /></Menu.Item></Menu>}><span>Rollen <Icon type="down" /></span></Dropdown>

        <Menu mode="inline">
                    <Menu.Item key="1">
                        
                    </Menu.Item>
                    <Menu.Divider >o</Menu.Divider>
                    <Menu.Item>Name</Menu.Item>
                    <SubMenu key="subRole" title="Rolle" multiple="true" onClick={handleSelect}>
                        <Menu.Item key="0">TeilnehmerIn</Menu.Item>
                        <Menu.Item key="1">Jurymitglied</Menu.Item>
                        <Menu.Item key="2">ausschreibende Institution/Person</Menu.Item>
                        <Menu.Item key="3">OrganisatorIn/RepräsentantIn</Menu.Item>
                        <Menu.Item key="4">InterpretIn</Menu.Item>
                        <Menu.Item key="5">JournalistIn</Menu.Item>
                        <Menu.Item key="6">KomponistIn/ArrangeurIn</Menu.Item>
                        <Menu.Item key="7">AutorIn</Menu.Item>
                        <Menu.Item key="8">MäzenIn</Menu.Item>
                        <Menu.Item key="9">LehrerIn von TeilnehmerIn</Menu.Item>
                        <Menu.Item key="10">Sonstige</Menu.Item>                   
                    </SubMenu>
                    
        </Menu>

            {/*<Menu theme="light" mode="inline" defaultOpenKeys={['sub1','sub2']}>
                <SubMenu key="sub1" title="Dokumenttypen">
                    <Menu.Item key="1"><Checkbox onChange={onChange}>Preisausschreiben</Checkbox></Menu.Item>
                    <Menu.Item key="2">Personen</Menu.Item>
                    <Menu.Item key="3">Körperschaften</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="Beteiligte">
                    <Menu.Item key="4"><Checkbox onChange={onChange}>Name</Checkbox></Menu.Item>
                    <Menu.Item key="5">Rolle </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title="Ort und Zeit" >

                </SubMenu>
                                </Menu>*/}
        </Sider>

    );
}

export default withRouter(FacetSider);