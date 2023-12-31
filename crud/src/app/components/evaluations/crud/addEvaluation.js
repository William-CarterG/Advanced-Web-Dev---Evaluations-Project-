import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import startFetch from '../../../../API';

function AddEvaluation({ setEvaluations }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [EvaluationName, setEvaluationName] = useState('');
  const [idGroup, setIdGroup] = useState('');
  const [idTest, setIdTest] = useState('');
  const [textValue, setTextValue] = useState('');
  const [groups, setGroups] = useState(null);
  const [tests, setTests] = useState(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
  const [selectedDate, setSelectedDate] = useState(tomorrow); // Initialize with tomorrow's date

  // Assuming you have a state variable named 'currentPage' to track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Function to go to the next page
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleModelOpen = () => {
    setModelOpen(!modelOpen);
    if(modelOpen){
      setCurrentPage(1);
    }
  };

  const handleEvaluationSubmit = (e) => {
    // Be careful with when you submit Evaluation, because
    // there is a back button!!
    setCurrentPage(1);
    toggleModelOpen();
    e.preventDefault();
    let body = {"name": EvaluationName, "limit_date":selectedDate, "general_instructions":textValue, "test": idTest, "group": idGroup}
    startFetch(`evaluations/`, 'POST', JSON.stringify(body), function(data) {
      startFetch(`evaluations/`, 'GET', null, function(data) {
        setEvaluations(data);
      });
    });
  };

  useEffect(() => {
    startFetch(`tests/`, 'GET', null, function(data) {
      setTests(data);
    });
    startFetch(`courses/`, 'GET', null, function(data) {
      setGroups(data);
    });
  }, []);

  return (
    <div className="mt-4">
      <button
        onClick={toggleModelOpen}
        className="button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Crear Evaluacion
      </button>

      {modelOpen && (
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
          />
            {currentPage === 1 && (
                <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                  <div className="flex items-center justify-between space-x-4">
                    <h1 className="text-xl font-bold text-gray-800">
                      Añadir nueva evaluacion
                    </h1>

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

                  <p className="mt-2 text-sm text-gray-500">
                    Crear un nuevo grupo, en el cual debes incluir una evaluacion.
                  </p>

                  <form className="mt-5">
                    <div>
                      <label
                        htmlFor="Evaluation name"
                        className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                      >
                        Nombre de la evaluacion
                      </label>
                      <input
                        placeholder="Desarrollo Web Avanzado - Prueba 1"
                        type="text"
                        value={EvaluationName}
                        onChange={(e) => setEvaluationName(e.target.value)}
                        className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Evaluation Test"
                        className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                      >
                        Test
                      </label>
                      <div className="dropdown">
                        <select
                          value={idTest}
                          onChange={(e) => setIdTest(e.target.value)}
                          className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                        >
                          <option value="">Selecciona una opción</option>
                          {tests.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="Evaluation Group"
                        className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                      >
                        Grupo
                      </label>
                      <div className="dropdown">
                        <select
                          value={idGroup}
                          onChange={(e) => setIdGroup(e.target.value)}
                          className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                        >
                          <option value="">Selecciona una opción</option>
                          {groups.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button onClick={goToNextPage}
                      className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                        Siguiente Pagina
                        <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>
                      </button>
                    </div>
                  </form>
    
                </div>
            )}
            {currentPage === 2 && (
                <div className="inline-block w-full max-w-xl p-8 my-20 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl 2xl:max-w-2xl">
                  
                  <div className="flex items-center justify-between space-x-4">
                    <h1 className="text-xl font-bold text-gray-800">
                      Añadir nueva evaluacion
                    </h1>

                    <div className=''>
                      <button
                        onClick={goToPreviousPage}
                        className="mr-3 text-gray-600 focus:outline-none hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 16l-6-6 6-6"/>
                          <path d="M20 21v-7a4 4 0 0 0-4-4H5"/>
                        </svg>
                      </button>

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
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Crear un nuevo grupo, en el cual debes incluir una evaluacion.
                  </p>

                  <form onSubmit={e => e.preventDefault()} className="mt-5">
                    <div onClick={e => e.preventDefault()}>
                      <label
                        htmlFor="Submission Deadline"
                        className="font-medium block text-sm text-gray-700 capitalize dark:text-gray-200"
                      >
                        Tiempo de entrega
                      </label>
                      <DatePicker
                        minDate={tomorrow}
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className="block w-4/12 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Evaluation Test"
                        className="font-medium mt-2 block text-sm text-gray-700 dark:text-gray-200"
                      >
                        Instrucciones Generales
                      </label>
                      <textarea
                      placeholder="Esta prueba trata sobre el contenido de CSS y HTML que hemos visto en clase. La prueba tendrá 5 preguntas en formato de Verdadero o Falso. ¡Buena suerte!"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      className="block w-full h-44 px-4 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
                      />
                    </div>

                    <div className="flex justify-end mt-6">
                      <button href="*"
                      onClick={handleEvaluationSubmit}
                      className="pressed-button flex items-center justify-center px-3 py-2 space-x-2 text-sm tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Crear
                      </button>
                    </div>
                  </form>
    
                </div>
            )}
          </div>
  
 
        </div>
      )}
    </div>
  );
}

export default AddEvaluation;
