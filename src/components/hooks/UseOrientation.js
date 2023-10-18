import { useState, useEffect } from 'react';

const useOrientation = () => {
	const [isPortrait, setIsPortrait] = useState(
		window.matchMedia('(orientation: portrait)').matches
	);

	useEffect(() => {	
		const mediaQueryList = window.matchMedia('(orientation: portrait)');
		const orientationChangeHandler = (event) => {
			setIsPortrait(event.matches);
		};

		mediaQueryList.addEventListener('change', orientationChangeHandler);

		return () => {
			mediaQueryList.removeEventListener('change', orientationChangeHandler);
		};
	}, []);

	return isPortrait;
}

export default useOrientation;
