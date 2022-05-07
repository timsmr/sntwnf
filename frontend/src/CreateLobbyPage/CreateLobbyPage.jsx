import React from 'react';
import './CreateLobbyPage.scss';
import GenerateRoomNumber from "../utils/GenerateRoomNumber";

const CreateLobbyPage = () => {
	return (
		<div className="d-flex flex-column justify-content-center w-100 h-100">
			<div className="d-flex flex-column justify-content-center align-items-center">
				<div className="form">
					<form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">Имя:</label>
							<input type="text" className="form-control" id="name"/>
						</div>

						<div className="mb-3">
							<label htmlFor="presentClue" className="form-label">Подсказки для подарка</label>
							<input type="text" className="form-control" id="presentClue"/>
						</div>


						<p>Номер комнаты: {GenerateRoomNumber()}</p>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateLobbyPage;

