import React, { useState } from 'react'
import './Shorten.css';

function Shorten() {
  // Button Styles.
  const [btn, setBtn] = useState('copy-btn');
  const [btn1, setBtn1] = useState('copy-btn');
  const [btn2, setBtn2] = useState('copy-btn');
  // History div Style.
  const [historyStyle, setHistoryStyle] = useState('history');
  //History Div Links: Original Link, Shortened Link, Style.
  let [url, setURL] = useState(['https://www.frontendmentor.io', 'https://rel.ink/gxOXp9', 'link']);
  let [url1, setURL1] = useState(['https://www.frontendmentor.io', 'https://rel.ink/gxOXp9', 'link']);
  let [url2, setURL2] = useState(['https://www.frontendmentor.io', 'https://rel.ink/gxOXp9', 'link']);

  const [formInput, setFormInput] = useState('');
  const [loadingStyle, setLoadStyle] = useState('loading-done');
  //Keep track of # 0f history links being displayed.
  const [count, setCount] = useState(0);

  // retrieving variable from last temp sessionstorage (if any). 
  window.onload = () => {
    if (typeof (Storage) !== "undefined" && sessionStorage.getItem('url_input') !== null) {
      setHistoryStyle('history-open');
      setCount(parseInt(sessionStorage.getItem("count")) + 1);
      if (parseInt(sessionStorage.getItem("count")) + 1 === 3) setCount(0);
      setURL([sessionStorage.getItem('url_input'), sessionStorage.getItem("url_shorten"), sessionStorage.getItem("url_style")]);
      setURL1([sessionStorage.getItem("url1_input"), sessionStorage.getItem("url1_shorten"), sessionStorage.getItem("url1_style")]);
      setURL2([sessionStorage.getItem("url2_input"), sessionStorage.getItem("url2_shorten"), sessionStorage.getItem("url2_style")]);
    }
    sessionStorage.clear();
  }

  // handle form input
  function handleInput(event) {
    setFormInput(event.target.value);
  }

  //Radio-like behavoir for link buttons && Copy to ClickBoard.
  function change(button: number, Str: string) {
    let btn = document.getElementById(`${Str}`);
    let btn0 = document.getElementById('btn-0')!;
    let btn1 = document.getElementById('btn-1')!;
    let btn2 = document.getElementById('btn-2')!;

    if (btn?.innerHTML === 'Copy') {
      btn0.innerHTML = 'Copy';
      btn1.innerHTML = 'Copy';
      btn2.innerHTML = 'Copy';
      btn.innerHTML = 'Copyed!';
    }

    switch (button) {
      case 0:
        setBtn('copy-click');
        setBtn1('copy-btn');
        setBtn2('copy-btn');
        navigator.clipboard.writeText(url[1]);
        break;
      case 1:
        setBtn1('copy-click');
        setBtn('copy-btn');
        setBtn2('copy-btn');
        navigator.clipboard.writeText(url1[1]);
        break;
      case 2:
        setBtn2('copy-click');
        setBtn1('copy-btn');
        setBtn('copy-btn');
        navigator.clipboard.writeText(url2[1]);
        break;
    }
  }

  ///display form response to user, stores form response and user input. 
  function handleResponse(response) {

    const obj = JSON.parse(response);

    switch (count) {
      case 0:
        setURL(oldarry => {
          return [
            oldarry[0] = formInput,
            oldarry[1] = obj.result.short_link,
            oldarry[2] = 'link-open'
          ]
        });
        setCount(1);
        break;
      case 1:
        setURL1(oldarry => {
          return [
            oldarry[0] = formInput,
            oldarry[1] = obj.result.short_link,
            oldarry[2] = 'link-open'
          ]
        });
        setCount(2);
        break;
      case 2:
        setURL2(oldarry => {
          return [
            oldarry[0] = formInput,
            oldarry[1] = obj.result.short_link,
            oldarry[2] = 'link-open'
          ]
        });
        setCount(0);
        break;
    }

    if (typeof (Storage) !== "undefined") {
      sessionStorage.setItem("count", `${count}`);
      // URL
      sessionStorage.setItem("url_input", `${url[0]}`);
      sessionStorage.setItem("url_shorten", `${url[1]}`);
      sessionStorage.setItem("url_style", `${url[2]}`);
      // URL1
      sessionStorage.setItem("url1_input", `${url1[0]}`);
      sessionStorage.setItem("url1_shorten", `${url1[1]}`);
      sessionStorage.setItem("url1_style", `${url1[2]}`);
      // URL2
      sessionStorage.setItem("url2_input", `${url2[0]}`);
      sessionStorage.setItem("url2_shorten", `${url2[1]}`);
      sessionStorage.setItem("url2_style", `${url2[2]}`);
    }
  }

  // form submit to api &&  response capture;
  function handleSubmit(event) {
    if (formInput !== '' && formInput.includes('https://')) {
      event.preventDefault();
      setHistoryStyle('history-open');
      setLoadStyle('loading');

      let params = formInput;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", ` https://api.shrtco.de/v2/shorten?url=${params}`);
      xhr.onload = function (event) {
        setLoadStyle('loading-done');
        let target = event.target as any;
        handleResponse(target.response); // raw response
      };
      xhr.send();
    }
  }


  return (
    <div id='container'>

      <div id='form-container'>
        <form id='myForm'>
          <input type='url' placeholder='Shorten a link here..'
            onChange={handleInput} required />
          <button id='submit-btn' type='submit' value='submit'
            onClick={handleSubmit}>Shorten It!</button>
        </form>
      </div>

      <div id={historyStyle}>

        <div id={loadingStyle}>
          {/* loading anime from LoadingIO */}
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className={url[2]}>
          <p className='original-link'>{url[0]}</p>
          <div>
            <p className='shorten-link'>{url[1]}</p>
            <button onClick={() => { change(0, 'btn-0'); }}
              className={btn} id='btn-0'>Copy</button>
          </div>
        </div>

        <div className={url1[2]}>
          <p className='original-link'>{url1[0]}</p>
          <div>
            <p className='shorten-link'>{url1[1]}</p>
            <button onClick={() => { change(1, 'btn-1'); }}
              className={btn1} id='btn-1'>Copy</button>
          </div>
        </div>

        <div className={url2[2]}>
          <p className='original-link'>{url2[0]}</p>
          <div>
            <p className='shorten-link'>{url2[1]}</p>
            <button onClick={() => { change(2, 'btn-2'); }}
              className={btn2} id='btn-2'>Copy</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Shorten