import './header.scss';
import peepGif from '../../assets/img/pepo-g-peepo.gif';

export default function Header() {
	return (<>
		<header>
			<nav className="navigation">
				<h2 className="navigation__heading">Дела делишки</h2>
				<div className="nav">
					<a
						href="https://www.youtube.com/watch?v=EaqJgQOVZ9k"
						className="navigation__link"
					>
						<p className="navigation__link__description">Ответ на смысл жизни</p>
					</a>
					<a
						href="https://github.com/VolffS"
						className="navigation__link"
					>
						<img
							src="/github.svg"
							alt=""
							className="navigation__link__img"
						/>
						<p className="navigation__link__description">Github</p>
					</a>
				</div>
			</nav>
		</header>
			<div className="container container-header">
				<div className=" p-3 my-3 shadow-lg p-3 mb-5 text-center text-bg-success rounded-pill header-container">
					<img className="img-note" src={peepGif} alt=""/>
					<h1 className="h2 mb-0 text-white lh-1">Мой список дел</h1>
					<div className="img-note"></div>
				</div>
			</div>

		</>
	);
}
