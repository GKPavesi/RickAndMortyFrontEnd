const Modal_about = ({character}) => {

    const { name, gender, species, type, status, most_recent_episode } = character;
    const pronoun = gender === 'Male' ? 'He' : 'She';
    const statusPhrase = status === 'Alive' ? `${pronoun} is alive and well` : status === 'Dead' ? `${pronoun} is dead` : `It can't be told if ${pronoun.toLowerCase()} is alive or dead`;
    const lastSeen = most_recent_episode.air_date;

    const paragraph = `${name} is a ${gender.toLowerCase()} ${species.toLowerCase()}${type ? ` (${type})` : ''}. ${statusPhrase}. Last seen in ${lastSeen}.`;

    return (
        <div className="modal-about">
            <h2 className="modal-title">About</h2>
            <p className="modal-paragraph">{paragraph}</p>
        </div>
    );
}

export default Modal_about