import Dropdown from 'react-bootstrap/Dropdown';

function Quantity(props) {
    const {qty, num, handleClick} = props;
    const options = Array(qty);

    for (let i = 1; i <= qty; i++) {
        const item = <Dropdown.Item key={i} onClick={()=>{handleClick(i)}}>{i}</Dropdown.Item>
        options.push(item);
        
    }


  return (
    <Dropdown style={{width:'fit-content'}}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        qty {num}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Quantity;