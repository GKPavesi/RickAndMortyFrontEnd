import Modal_about from './Modal-About'
import Modal_Origin from './Modal-Origin'
import Modal_Current from './Modal-Current'
import residentsIcon from '../../../Assets/residents-icon.svg'


const Character_Modal = ({ character, closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-left-section">
                    <button onClick={closeModal} className='close-modal-button'>Close</button>
                    <div className='modal-left-image-countainer' >
                        <div className='blurry-image-modal' style={{ backgroundImage: `url(${character.image})` }}></div>
                    </div>
                    <div className='modal-character-card'>
                        <img src={character.image} alt={`Imagem do personagem ${character.name}`} />
                        <div className='modal-character-information'>
                            <h1>{character.name}</h1>
                            <h2>{character.species}</h2>
                        </div>
                    </div>
                </div>

                <div className="modal-right-section">
                    <Modal_about character={character}/>
                    <Modal_Origin origin={character.origin_location} residentsIcon={residentsIcon}/>
                    <Modal_Current current_location={character.current_location} residentsIcon={residentsIcon}/>
                </div>
            </div>
        </div>
    )
}

export default Character_Modal