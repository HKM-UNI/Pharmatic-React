function NavigationMenu() {
  return (
    <nav className="flex flex-col space-y-2">
      <a href="/" className="text-blue-500 hover:underline items-center">
        Home
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        About
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        Services
      </a>
      <a href="#" className="text-blue-500 hover:underline">
        Contact
      </a>
    </nav>
  );
}

export default NavigationMenu;
