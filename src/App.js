/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from 'react';
import './App.css'
import ErrorModal from './ErrorModal';


export default function App() {

  let searchRef = useRef();
  const [errorMessageAppear, setErrorMessageAppear] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [wikiContent, setWikiContent] = useState('');
  const [wikiLink , setWikiLink] = useState();
  let url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles="

  // setting the title of the desired searched content
  function setTitle (evt){
    evt.preventDefault()
    const searchTitle = searchRef.current.value;
    if (searchTitle){
      if (searchTitle.toLowerCase()!='israel'){
        url += searchTitle;
        setWikiLink("https://en.wikipedia.org/wiki/"+searchTitle);
        getContent ()
      }else{
        setErrorMessageAppear(true);
        setErrorMessage('You mean Palestine?');
      }
    }
  }

  // getting content from wikipedia
  function getContent () {
    const getFirstPageExtract = jsonResponse => {
      if(jsonResponse.query!=undefined){
        // You should probably add some validathin here to make sure pages exists
        const pages = jsonResponse.query.pages;
        const pageIds = Object.keys(pages);
        // Here we only take the first response since we know there is only one.
        if(pageIds!=-1){
          const firstPageId = pageIds.length ? pageIds[0] : null;
          return firstPageId ? pages[firstPageId].extract : null;
        }else{
          setErrorMessageAppear(true);
          setErrorMessage('Not Found!!');
        }
      }
      else
      return null
    };
    async function fetchContent (){
      try{
        const response = await fetch(url);
        const jsonContent = await response.json();
        const extract = getFirstPageExtract(jsonContent);
        setWikiContent(extract)
      } catch(error){
        setErrorMessageAppear(true);
        setErrorMessage("error");
      }
    }
    try{
      fetchContent ()
    }catch(error){
      setErrorMessageAppear(true);
      setErrorMessage(error);
    }
    
  }

  const closeModal = () => {
    setErrorMessageAppear(false)
  }

  return (
    <>
    {errorMessageAppear?<ErrorModal closeModal={closeModal} errorMessage={errorMessage}/>:null}
    <div className='main'>
      <h1 data-test="main-header">.Brief</h1>
      <div className='searchContainer'>
        {/* <input ref={searchRef} id='search' className='searchInput' onKeyUp={() => {event.key==="Enter"?setTitle():null}}/>
        <text onClick={setTitle} className='mainButton'>Search</text> */}
        <form onSubmit={setTitle} className='actionFrom' data-test="search-form">
          <input data-test="search-input" ref={searchRef} id='search' className='searchInput'/>
          <button data-test="search-button" type='submit' className='mainButton'>Search</button>
        </form>
      </div>
      <div className='wikiContent'>
        {
          wikiContent? 
            <>
            <div data-test="search-results" className='results' dangerouslySetInnerHTML={{ __html: wikiContent }} />
            <a data-test="search-results-button" href={wikiLink} target="_blank" rel="noreferrer" id='show' className='mainButton'>Click here for more</a>
            </>
           :null
        }
      </div>
    </div>
    </>
  );
}


