const Character_Card = ({ character, openModal }) => {
    return (
        <div className='character-card' onClick={() => openModal(character.id)}>
            <div className='character-information' style={{ backgroundImage: `url(${character.image})` }}>
                <div className='character-information-blur'>
                    <h1>{character.name}</h1>
                    <span>{character.species}</span>
                </div>
            </div>
            <img src={character.image} alt={`Imagem do personagem ${character.name}`} className={character.status === 'Dead' ? 'dead' : ''} />
        </div>
    )
}

export default Character_Card