import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Waiting from './Waiting';
import startFetch from './API';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Waiting/>
  </React.StrictMode>
);

const params = window.location.search;
const urlParams = new URLSearchParams(params);
const evToken = urlParams.get('ev_token');
let isReload = 0;

//localStorage.removeItem('tokenState');

let tokenState = localStorage.getItem('tokenState');
if (tokenState === null) {
  localStorage.setItem('tokenState', JSON.stringify({}));
  tokenState = {};
} else {
  tokenState = JSON.parse(tokenState); // Convertir la cadena de texto a un objeto
}

if (tokenState[evToken] === undefined) {
  tokenState[evToken] = { "index": null, "state": null, "correct": null };
}

let indexValue = tokenState[evToken]["index"]
let readyState = tokenState[evToken]["state"]

if (indexValue === null) {
  indexValue = -1;
} else {
  if (readyState === null && readyState !== 1) {
    indexValue = parseInt(indexValue) + 1;
    isReload = 1;
  }
  tokenState[evToken]["index"] = indexValue
  localStorage.setItem('tokenState', JSON.stringify(tokenState));
}

let matrixChoice = {0:false}
let fetchedevaluation
let fetchedfullName
let fetchedquestion
let ended = 0
let personTestId
if (evToken) {
  startFetch(`person-tests/?ev_token=${evToken}`, 'GET', null, function(data) {
    const personTest = data[0];
    const fetchedEvaluationId = personTest['evaluation'];
    const fetchedPersonId = personTest['person'];
    personTestId = personTest["id"]
    
    startFetch(`evaluations/${fetchedEvaluationId}`, 'GET', null, function(data) {
      fetchedevaluation = data;
      let groupId = data["group_id"]
      startFetch(`courses/${groupId}/`, 'GET', null, function(data) {
          let fontColor = String(data["text_font_color"])
          if (fontColor === "null"){
            fontColor = "#ffffff"
          }
          if (fontColor === "undefined"){
            fontColor = "#ffffff"
          }
          if (fontColor === ""){
            fontColor = "#ffffff"
          }
          let bgColor = String(data["background_color"])
          if (bgColor === "null"){
            bgColor = "#374151"
          }
          if (bgColor === "undefined"){
            bgColor = "#374151"
          }
          if (bgColor === ""){
            bgColor = "#374151"
          }
          startFetch(`courses/${groupId}/members/${fetchedPersonId}`, 'GET', null, function(data) {
            fetchedfullName = data["name"] + " " + data["last_name"];
            startFetch(`tests/${fetchedevaluation["test_id"]}`, 'GET', null, function(data) {
              fetchedquestion = data["questions"];
              if (isReload === 1){
                let body = {'answer_data': "n", "question":fetchedquestion[indexValue-1]["id"], "person_test":personTestId}
                startFetch(`person-tests/${personTestId}/answers/`, 'POST', JSON.stringify(body), function(data) {
                });
              }
              if ( data["questions"].length === parseInt(tokenState[evToken]["index"])){
                ended = 1
              } 
    
              root.render(
                <React.StrictMode>
                  <App fontColor={fontColor} bgColor={bgColor} matrixChoice={matrixChoice} indexValue={indexValue} fullName={fetchedfullName} evaluation={fetchedevaluation} questionsa={fetchedquestion} evToken={evToken} tokenState={tokenState} ended={ended} personTestId={personTestId}/>
                </React.StrictMode>
              );
              
            });
    
    
          });
          
        });
      });
  });
}


