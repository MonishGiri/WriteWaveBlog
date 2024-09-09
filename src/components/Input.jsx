import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 block mb-2 text-sm font-medium text-gray-900 ' 
            htmlFor={id}>
                {label}
            </label>}
            <input 
            type={type}  
            className={`block mb-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
});

export default Input;