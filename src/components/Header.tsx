import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="p-4 flex gap-2 bg-background text-foreground justify-between border-b border-border shadow-sm">
      <nav className="flex flex-row items-center">
        <div className="px-2 font-bold">
          <Link to="/" className="text-foreground hover:text-primary">Test Case Creator</Link>
        </div>
      </nav>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </header>
  )
}
