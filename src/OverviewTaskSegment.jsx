import React from 'react';
import { Row, Col, Collapse, Drawer, Button, Badge, Tooltip } from 'antd';
import Markdown from 'markdown-to-jsx';

import OverviewSection from "./OverviewSection";
import Tasks from './Tasks';
import TaskTabs from './TaskTabs';

const Panel = Collapse.Panel;

export default function OverviewTaskSegment( props ) {

    const formalia = props.formalia;
    const comments = props.comments;
    const showDrawer = props.showDrawer;

    return(
        <Row>
            <Col>
                <OverviewSection occasion={props.occasion} duration={props.duration} place={props.place} tender={props.tender} series={props.series} pAmount={props.pAmount} taskTypes={props.taskTypes} />
                
                { comments && comments.length>0 ? <span style={{float: "right"}} ><Badge count={comments.length} ><Button type="normal" onClick={showDrawer} >Ergänzende Informationen</Button></Badge></span> : "" }

                { props.subcompetitions
                            ? <div style={{marginTop: 50}}><h2 style={{ color: "#4A5568"}}>Aufgaben nach Teilwettbewerb</h2><TaskTabs tasks={props.tasks} subcompetitions={props.subcompetitions} conditions={props.conditions} formalia={props.formalia} /></div>
                            : <div style={{marginTop: 50}}><h2 style={{ color: "#4A5568"}}>Aufgaben</h2><div style={{backgroundColor: "white", border: "1px solid #E2E8F0"}}><Tasks tasks={props.tasks} conditions={props.conditions} formalia={props.formalia} /></div></div> }

                { formalia && 
                    <Collapse bordered={false} style={{marginTop: 5, border: "1px solid #E2E8F0"}}>
                        <Panel header={"Formalia"} >
                                <Row>
                                    <Col span={20} offset={1}>
                                        <Markdown>{formalia}</Markdown>
                                    </Col>
                                </Row>
                        </Panel>
                    </Collapse>
                }
                { comments && comments.length>0 && <Drawer 
                        title="Ergänzende Informationen zum Preisausschreiben allgemein, zur Ausschreibung, zu Aufgaben, Formalia und zu den Teilnahmevorraussetzungen"
                        placement="right"
                        closable={false}
                        onClose={props.onClose}
                        visible={props.visible}
                        width="30%"
                        
                    >
                        {comments.map( (comment, index) => <p key={index}><Markdown>{comment.text}</Markdown></p> )}
                    </Drawer> }
            </Col>
        </Row>
    );

}