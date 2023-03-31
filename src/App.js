import './App.css'
import React, { useState } from 'react';
import {Pass1} from './Pass1.jsx';
import {Pass2} from './Pass2.jsx';
export default function App() {

  const [content, setContent] = useState('');
  const [sym, setSYM] = useState('');
  const [proglen, setProglen] = useState('');
  const handleFileRead = (e) => {
    const content = e.target.result;
    setContent(content);
    document.getElementById("output3").value = content
    console.log('file content',  content)
  };
  const handleFileChosen = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  function writeoutput1(){
    var result_pass1 = Pass1(content);
    console.log(result_pass1.SYMTAB)
    setSYM(result_pass1.SYMTAB)
    setProglen(result_pass1.proglen)
    var temp_result1 = JSON.stringify(result_pass1.SYMTAB);
    temp_result1 = temp_result1.replaceAll(',' , '\n').replaceAll('{','').replaceAll('}','');
    document.getElementById("output1").value = temp_result1;
  }
  function writeoutput2(){
    const SYMTAB = JSON.stringify(sym);
    var temp_result2 = JSON.stringify(Pass2(content,SYMTAB,proglen))
    temp_result2 = temp_result2.replaceAll(',' , '\n').replaceAll('[','').replaceAll(']','');
    //{Pass2(content,SYMTAB,proglen).map((result, i) => (
      //console.log(result)
    //))}
    document.getElementById("output2").value = temp_result2;
  }
  return (
    <div class = "intro">
      <h1 class = "title">SIC Assembler</h1>
      <div class = "flex-container">
        <div class = "flex-column">
          <input 
            id="input" type="file" accept=".txt,.asm" 
            onChange={(e) => handleFileChosen(e.target.files[0])}>
          </input>
          <button class = "button" onClick={writeoutput1}
            >PASS1</button>
          <button class = "button" onClick={writeoutput2}
            >PASS2</button>
          <textarea id="output3" type="text" disabled={true} class ="output3" ></textarea>
        </div>

        <textarea id="output1" type="text" disabled={true} class = "textbox"></textarea>
        <textarea id="output2" type="text" disabled={true} class = "textbox"></textarea>
      </div>

    </div>
  )
}


