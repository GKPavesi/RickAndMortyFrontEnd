import { useState } from 'react'
import axios from 'axios'
import Header from './components/header/Header'
import Character_Grid from './components/character/Character-Grid'
import Loading_animation from './components/Loading-Animation'
import BlockScroll from './components/BlockScroll'
import Character_Modal from './components/character/character-modal/Character-Modal'
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
      let response = await axios.get(`http://localhost:5000/search/?name=${searchName}&page=${pageNumber}`)
      setSearchResult(response.data)
    }
    catch (e) {
      let alertMessage = e.response.data.error ? e.response.data.error : 'Something went wrong, please try again'
      alert(alertMessage)
    }
    finally {
      setShowLoadingAnimation(false)
      allowScroll()
    }
  }

  const handleOpenModal = async (character_id) => {
    blockScroll()
    try {
      let response = await axios.get(`http://localhost:5000/search/${character_id}`)
      setSelectedCharacter(response.data.character);
    }
    catch (e) {
      let alertMessage = e.response.data.error ? e.response.data.error : 'Something went wrong, please try again'
      alert(alertMessage)
    }
    finally {
      allowScroll()
    }
    blockScroll()
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
        <Character_Grid searchResult={searchResult} handleSearch={handleSearch} openModal={handleOpenModal}/>
      )}

      {selectedCharacter && (
        <Character_Modal character={selectedCharacter} closeModal={handleCloseModal} />
      )}
    </>
  )
}

export default App