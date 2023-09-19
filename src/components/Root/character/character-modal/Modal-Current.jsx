const Modal_Current = ({ current_location, residentsIcon }) => {
    return (
        <div className="modal-location">
            <h2 className="modal-title">Location</h2>
            <span className="modal-type">{current_location !== null ? current_location.type : 'Unknown Planet'}</span>
            <h1 className="modal-planet-name">{current_location !== null ? current_location.name : 'Unknown'}</h1>
            <p className="modal-planet-dimension">{current_location !== null ? current_location.dimension : 'Unknown dimension'}</p>
            {current_location && (
                <div className='modal-residents'>
                    <img src={residentsIcon} alt="Residents Icon" />
                    <span>{current_location.residents_count} Residents</span>
                </div>
            )}
        </div>
    )
}

export default Modal_Current