import HashLoader from 'react-spinners/HashLoader';
const LoadingSnip = () => {
    return (
        <div className='fixed top-1/2 left-1/2 z-30 transform-[translate(-50%, -50%)]'>
            <HashLoader color="#7843E6" />
        </div>
    );
};

export default LoadingSnip;