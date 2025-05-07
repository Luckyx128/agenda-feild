import Link from 'next/link';
import './sidebar.css'
import Image from 'next/image'
export default function Sidebar() {
	return (
		<div className="sidebar">
			<section className="sidebar-header">
				<Image
					className="dark:invert"
					src="/calendar-svgrepo-com.svg"
					alt="Next.js logo"
					width={40}
					height={40}
					priority
				/>
				<h3>Agenda Field</h3>
			</section>
			<nav className="sidebar-nav">
				<h2 className='sidebar-nav-label'>Agendas</h2>
				<ul className="sidebar-nav-list">
					<li className="sidebar-nav-item">
						<button className="sidebar-nav-button"><Link href='/calendario'>Calendario</Link></button>
					</li>
					<li className="sidebar-nav-item">
					   <button className="sidebar-nav-button">
							<Link href='/dia'>Dia</Link>
						</button>
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
