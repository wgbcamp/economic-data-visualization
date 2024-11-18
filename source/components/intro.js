import React from 'react'
import "../css/main.css";
import { Dropdown, Container, Row, Col, Form, Button } from 'react-bootstrap';

const intro = () => {

    return(
        <div className='splash fadeOut'>
            <Container className="growUp">
                <Row>
                    <div className="splashText">Interactive Economic</div>
                </Row>
                <Row>
                    <div className="splashText"> Data Visualization</div>
                </Row>
            </Container>
            
        </div>
    )
}

export default intro;