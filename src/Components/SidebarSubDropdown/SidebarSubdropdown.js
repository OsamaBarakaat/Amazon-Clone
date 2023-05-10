import React from 'react'

function SidebarSubdropdown(props) {
    console.log(props);
    return (
        <div>
            <div className="sub-container" style={props.state === "entering" ? { animation: "moveSubContainer .3s forwards" } :
                props.state === "entered" ? { transform: "translateX(0px)" } : { animation: "moveSubContainer .3s reverse backwards" }}>
                <div className="sub-header">
                    <i class="fas fa-chevron-left"></i> MAIN MENU
                </div>
            </div>
        </div>
    )
}

export default SidebarSubdropdown