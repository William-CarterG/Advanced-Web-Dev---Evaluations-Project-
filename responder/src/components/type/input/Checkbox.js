import React from 'react';

const Checkbox = ({status}) => {

    return (
        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${status} sm:h-9 sm:w-9`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0  " clipRule="evenodd" />
                </svg>
            </div>
        </td>
    );
  };
    
export default Checkbox;