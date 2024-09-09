import { useState } from "react";

function Button({
    children,
    type = 'button',
    bgColor = 'blue',
    textColor = '',
    className = '',
    ...props
}) {
  return (
    <button id="mybtn" className={`text-white bg-${bgColor}-700 hover:bg-${bgColor}-800 focus:ring-4 focus:ring-${bgColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${bgColor}-600 dark:hover:bg-${bgColor}-700 focus:outline-none dark:focus:ring-${bgColor}-800${className} ${textColor}`} {...props}>
        {children}
    </button>
  )
}

export default Button;