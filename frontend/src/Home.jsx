import React from 'react';
import Button from "./ui/Button";


const Home = () => {
	return (
		<div className="d-flex flex-column justify-content-center w-100 h-100">
			<div className="d-flex flex-column justify-content-center align-items-center">
				<h1 className="fw-light text-white m-0">Сыграем в Тайного Санту?</h1>
				<div className="btn-group mt-5">
					<Button link={"/join"} styles={"btn btn-outline-light"} >Войти в лобби</Button>
					<Button link={"/create"} styles={"btn btn-outline-light"}>Создать лобби</Button>
					<Button link={"/lobby"} styles={"btn btn-outline-light"}>Тестовое лобби</Button>
				</div>
			</div>
		</div>
	);

};

export default Home;