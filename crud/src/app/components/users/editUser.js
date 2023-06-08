import React, { useState } from 'react';

function EditUser({ closeEditUserModal }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(true);
  const [IsEvaluator, setIsEvaluator] = useState(true);
  const [IsVisualizer, setIsVisualizer] = useState(false);

  const toggleModelOpen = () => {
    closeEditUserModal(); // Call the closeEditUserModal function to close the modal
  };

  return (
   
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center md:items-center sm:block sm:p-0">
            <div
              onClick={toggleModelOpen}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-40"
              aria-hidden="true"
            ></div>

            <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
              <div className="flex items-center justify-between space-x-4">
                <h1 className="text-xl font-medium text-gray-800 ">Edit user</h1>

                <button
                  onClick={toggleModelOpen}
                  className="text-gray-600 focus:outline-none hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-500 ">
                Modify the privileges of user.
              </p>

              <form className="mt-5">

                <div className="mt-4">
                  <h1 className="text-xs font-medium text-gray-400 uppercase">Permissions</h1>

                  <div className="mt-4 space-y-5">
                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => setIsAdmin(!IsAdmin)}
                    >
                      <div
                        className={`relative w-10 h-5 transition duration-200 ease-linear rounded-full ${
                          IsAdmin ? 'bg-blue-400' : 'bg-gray-300'
                        }`}
                      >
                        <label
                          htmlFor="show"
                          className={`absolute left-0 w-5 h-5 mb-2 transition duration-100 ease-linear transform bg-white border-2 rounded-full cursor-pointer ${
                            IsAdmin ? 'translate-x-5 bg-indigo-500' : 'translate-x-0 bg-gray-300'
                          }`}
                        ></label>
                        <input
                          type="checkbox"
                          name="show"
                          className="hidden w-full h-full rounded-full appearance-none active:outline-none focus:outline-none"
                        />
                      </div>

                      <p className="text-gray-500">Manage users and their roles (Admin)</p>
                    </div>

                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => setIsEvaluator(!IsEvaluator)}
                    >
                      <div
                        className={`relative w-10 h-5 transition duration-200 ease-linear rounded-full ${
                          IsEvaluator ? 'bg-blue-400' : 'bg-gray-300'
                        }`}
                      >
                        <label
                          htmlFor="show"
                          className={`absolute left-0 w-5 h-5 mb-2 transition duration-100 ease-linear transform bg-white border-2 rounded-full cursor-pointer ${
                            IsEvaluator ? 'translate-x-5 bg-indigo-500' : 'translate-x-0 bg-gray-300'
                          }`}
                        ></label>
                        <input
                          type="checkbox"
                          name="show"
                          className="hidden w-full h-full rounded-full appearance-none active:outline-none focus:outline-none"
                        />
                      </div>

                      <p className="text-gray-500">Manage groups, tests and evaluations (Evaluator)</p>
                    </div>

                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => setIsVisualizer(!IsVisualizer)}
                    >
                      <div
                        className={`relative w-10 h-5 transition duration-200 ease-linear rounded-full ${
                          IsVisualizer ? 'bg-blue-400' : 'bg-gray-300'
                        }`}
                      >
                        <label
                          htmlFor="show"
                          className={`absolute left-0 w-5 h-5 mb-2 transition duration-100 ease-linear transform bg-white border-2 rounded-full cursor-pointer ${
                            IsVisualizer ? 'translate-x-5 bg-gray-300' : 'translate-x-0 bg-gray-300'
                          }`}
                        ></label>
                        <input
                          type="checkbox"
                          name="show"
                          className="hidden w-full h-full rounded-full appearance-none active:outline-none focus:outline-none"
                        />
                      </div>

                      <p className="text-gray-500">Access to results dashboards (Visualizer).</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                      onClick={ () => console.log("Added user.")}
                      className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white 
                      capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none 
                      focus:ring focus:ring-opacity-50">
                      
                      Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

  );
};

export default EditUser;