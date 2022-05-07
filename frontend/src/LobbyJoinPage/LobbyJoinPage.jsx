import React from 'react';

const LobbyJoinPage = () => {
	return (
		<div className="d-flex flex-column justify-content-center w-100 h-100">
			<div className="d-flex flex-column justify-content-center align-items-center">
				<div className="form">
					<h1 className="text-white my-3">Войти в лобби</h1>
					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Номер лобби"/>
					</div>
					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Имя"/>
					</div>
						<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Предпочтения"/>
					</div>

				</div>
			</div>
		</div>
	);
};

export default LobbyJoinPage;