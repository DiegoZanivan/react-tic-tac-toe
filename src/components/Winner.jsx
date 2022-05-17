import React, { useContext, useState } from "react";
import { AppContext } from "../App";

function Winner() {
    
    const { winner } = useContext(AppContext)

    return (
        <div>Congratulations <span>{winner}</span>, you WON!</div>
    )
}

export default Winner