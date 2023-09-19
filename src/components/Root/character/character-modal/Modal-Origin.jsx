const Modal_Origin = ({ origin, residentsIcon }) => {
    return (
        <div className="modal-origin">
            <h2 className="modal-title">Origin</h2>
            <span className="modal-type">{origin !== null ? origin.type : 'Unknown Planet'}</span>
            <h1 className="modal-planet-name">{origin !== null ? origin.name : 'Unknown'}</h1>
            <p className="modal-planet-dimension">{origin !== null ? origin.dimension : 'Unknown dimension'}</p>
            {origin && (
                <div className='modal-residents'>
                    <img src={residentsIcon} alt="Residents Icon" />
                    <span>{origin.residents_count} Residents</span>
                </div>
            )}
        </div>
    )
}

export default Modal_Origin