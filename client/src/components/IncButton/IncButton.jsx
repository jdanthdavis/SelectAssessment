import PulseLoader from 'react-spinners/PulseLoader';
import './IncButton.css';

/**
 * Standardized button
 * @param {*} param0
 * @returns
 */
const IncButton = ({ text, onClick, loading = false }) => {
  return (
    <button onClick={onClick}>
      {loading ? (
        <PulseLoader
          color={'white'}
          loading={loading}
          size={8}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        text
      )}
    </button>
  );
};

export default IncButton;
