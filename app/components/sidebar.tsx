import './sidebar.css'
import Image from 'next/image'
export default function Sidebar() {
	return (
		<div className="sidebar">
			<section className="sidebar-header">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>
				<h1>Nome APP</h1>
			</section>
			<nav className="sidebar-nav">
				<h2 className='sidebar-nav-label'>Agendas</h2>
				<ul className="sidebar-nav-list">
					<li className="sidebar-nav-item">
						<button className="sidebar-nav-button"></button>
					</li>
					<li className="sidebar-nav-item">
						<a href="/eventos">Eventos</a>
					</li>
					<li className="sidebar-nav-item">
						<a href="/relatorios">Relatórios</a>
					</li>
					<li className="sidebar-nav-item">
						<a href="/configuracoes">Configurações</a>
					</li>
				</ul>
			</nav>
			<section className="sidebar-footer">
				<div className="sidebar-footer-content">
					<p>Nome do usuário</p>
					<button className="sidebar-footer-button">Sair</button>
				</div>
			</section>
		</div>
	);
}
