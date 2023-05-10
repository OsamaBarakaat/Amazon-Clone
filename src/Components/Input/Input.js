import { useState } from "react";
import "./input.css";
const Input = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInputToInput">
            <label id="formInputToInputLable">{label}</label>
            <input id="formInputToInputInput"
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span id="formInputToInputSpan">{errorMessage}</span>
        </div>
    );
};

export default Input;
