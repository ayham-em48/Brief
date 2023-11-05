import { useState, useEffect } from 'react';
import './App.css'


export default function App() {
  var searchTitle ='';
  const [wikiContent, setWikiContent] = useState('')
  const [wikiLink , setWikiLink] = useState();

  function setTitle (){
    //var searchTitle = 'Berlin';
    searchTitle = document.getElementById('search').value
    if (searchTitle!=''&&searchTitle!=undefined&&searchTitle!=null)
    Content (searchTitle)
  }

  return (
    <div className='main'>
      <h1>.Brief</h1>
      <div className='searchContainer'>
        <input id='search' className='searchInput'/>
        <text onClick={setTitle} className='seachButton'>Search</text>
      </div>
      <div className='wikiContent'>
      <div dangerouslySetInnerHTML={{ __html: wikiContent }} />
      <a href={wikiLink} target="_blank" rel="noreferrer" id='show'>Click here for more</a>
      </div>
    </div>
  );

  function Content (title) {
    const getFirstPageExtract = jsonResponse => {
      if(jsonResponse.query!=undefined){
        // You should probably add some validathin here to make sure pages exists
        const pages = jsonResponse.query.pages;
        const pageIds = Object.keys(pages);
        // Here we only take the first response since we know there is only one.
        const firstPageId = pageIds.length ? pageIds[0] : null;
        return firstPageId ? pages[firstPageId].extract : null;
      }
      else
      return null
    };
    var content = ''  
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles="+title;
  
    async function getContent (){
      const response = await fetch(url);
      const jsonContent = await response.json();
      console.log(jsonContent)
      const extract = getFirstPageExtract(jsonContent);
      content = extract;
      if (content!=undefined&&title!='israel'&&title!='Israel'){
        setWikiContent(content)
        setWikiLink('https://en.wikipedia.org/wiki/'+title)
        document.getElementById('show').style.display = 'block'
      }
      else if (content!=null){
        setWikiContent('Not Found!!!!')
        document.getElementById('show').style.display = 'none'
      }
      else{
        setWikiContent('')
        document.getElementById('show').style.display = 'none'
      }
    };
    getContent ()
  }
}


