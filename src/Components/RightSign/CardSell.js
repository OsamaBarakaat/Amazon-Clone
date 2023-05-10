import React from 'react';
import { Col, Row } from 'react-bootstrap';
import "./CardSell.css"
class CardSell extends React.Component {
    render() {
        const { title } = this.props;
        return (


            <div className="card" id='cardBodyAll'>
                <Row >
                    <Col sm = {1}>
                        <img id='imgCardSell' src="https://m.media-amazon.com/images/G/01/sell/images/icon-check-blue-thick.svg" alt="" /> 
                        </Col >
                    <Col sm={11}>
                        <h6 className="card-title" id='CardSellTitleCard'>{title}</h6>
                    </Col>
                </Row>

            </div>

        );
    }
}

export default CardSell;