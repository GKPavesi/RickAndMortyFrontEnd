import Loading_card from '../Assets/loading-card.png'

const Loading_animation = () => {

    return (
        <>
            <div className='blur-background'></div>
            <div className='loading-animation'>
                <img src={Loading_card} alt="Loading Card" />
                <span>Loading</span>
            </div>
        </>
    )
}

export default Loading_animation