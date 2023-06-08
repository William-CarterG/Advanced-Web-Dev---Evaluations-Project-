import React from 'react';

const Checkbox = ({status}) => {

    return (
        <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <div class="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class={`w-5 h-5 ${status} sm:h-9 sm:w-9`} viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
            </div>
        </td>
    );
  };
    
export default Checkbox;