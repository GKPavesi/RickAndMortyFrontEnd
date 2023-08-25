import { useState } from 'react'
import axios from 'axios'
import Header from './components/Root/header/Header'
import Character_Grid from './components/Root/character/Character-Grid'
import Loading_animation from './components/Root/Loading-Animation'
import BlockScroll from './components/Root/BlockScroll'
import Character_Modal from './components/Root/character/character-modal/Character-Modal'
import './App.css'

function App() {

  const [searchName, setSearchName] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const [blockScroll, allowScroll] = BlockScroll();
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleSearch = async (pageNumber = 1) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    blockScroll()
    setShowLoadingAnimation(true)
    try {
      const cacheKey = `searchResults_${searchName}_${pageNumber}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        setSearchResult(JSON.parse(cachedData));

      } 
      else {

        const response = await axios.get(`https://rickandmortybackend-s7op.onrender.com/search/?name=${searchName}&page=${pageNumber}`);
        setSearchResult(response.data);

        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
      }
    } catch (e) {

      let alertMessage = e.response.data.error ? e.response.data.error : 'Something went wrong, please try again';
      alert(alertMessage);

    } finally {

      setShowLoadingAnimation(false);
      allowScroll();
    }
  };

  const handleOpenModal = async (character_id) => {
    blockScroll();

    try {
      const cacheKey = `characterDetails_${character_id}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        setSelectedCharacter(JSON.parse(cachedData));
      } 
      else {

        const response = await axios.get(`https://rickandmortybackend-s7op.onrender.com/search/${character_id}`);
        setSelectedCharacter(response.data.character);

        sessionStorage.setItem(cacheKey, JSON.stringify(response.data.character));
      }
    } catch (e) {

      let alertMessage = e.response.data.error ? e.response.data.error : 'Something went wrong, please try again';
      alert(alertMessage);
      allowScroll();

    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
    allowScroll()
  };

  return (
    <>
      <Header handleSearch={handleSearch} setSearchName={setSearchName} searchName={searchName} />

      {showLoadingAnimation && (
        <Loading_animation />
      )}

      {searchResult && (
        <Character_Grid searchResult={searchResult} handleSearch={handleSearch} openModal={handleOpenModal} />
      )}

      {selectedCharacter && (
        <Character_Modal character={selectedCharacter} closeModal={handleCloseModal} />
      )}
    </>
  )
}

export default App