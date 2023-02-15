import { useState } from "react";

const InputWithButton = ({ address }) => {
    return (
        <div className="flex items-center">
            <p>{address}</p>
            <button>
                Удалить
            </button>
        </div>
    )
}

export default InputWithButton;