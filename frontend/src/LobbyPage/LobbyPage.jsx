import React, {useState} from 'react';
import Button from "../ui/Button";

const LobbyPage = () => {
	const [showHint, setShowHint] = useState(false);

	const handleClick = () => {
		setShowHint(!showHint)
		console.log(showHint)
	}


	return (
		<div className="d-flex flex-column justify-content-center w-100 h-100">
			<div className="d-flex flex-column justify-content-center align-items-center">
				<h1 className="text-white">Ты даришь подарок: Ване</h1>
				<h3 className="fw-light text-white">Придумай что-нибудь до 25 декабря!</h3><hr/>
				<p className="fw-light text-white">А если нет идей, то вот подсказка:</p>
				<button
					className="btn btn-outline-light"
					onClick={handleClick}
				>
					Открыть
				</button>

				{showHint ? <p className="fw-light text-white">Подсказка</p> : null}
			</div>
		</div>
	);
};

export default LobbyPage;