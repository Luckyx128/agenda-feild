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
			</nav>
			<section className="sidebar-footer">
			</section>
		</div>
	);
}
