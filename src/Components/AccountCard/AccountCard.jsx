import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./AccountCard.css";
class AccountCard extends React.Component {
  render() {
    const { title, description, imageSrc } = this.props;
    return (
      <div className="card" id="cardBodyAll">
        <div className="card-body" id="cardBody">
          <Row>
            <Col className="imgg">
              {imageSrc && <img id="imgAccountCard" src={imageSrc} alt="" />}
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <h4 className="card-title" id="AccountCardTitleCard">
                {title}
              </h4>
            </Col>
            <Row>
              {description && (
                <p
                  className="card-description d-none d-md-block"
                  id="AccountCardTitleCardP"
                >
                  {description}
                </p>
              )}
            </Row>
          </Row>
        </div>
      </div>
    );
  }
}

export default AccountCard;
//   <div className="card" id="cardBodyAll">
//     <div className="card-body" id="cardBody">
//       <Row>
//         <Col xs={3}>
//           {imageSrc && <img id="imgAccountCard" src={imageSrc} alt="" />}
//         </Col>
//         <Col>
//           <h4 className="card-title" id="AccountCardTitleCard">
//             {title}
//           </h4>
//           {description && (
//             <p className="card-description" id="AccountCardTitleCardP">
//               {description}
//             </p>
//           )}
//         </Col>
//       </Row>
//     </div>
//   </div>
