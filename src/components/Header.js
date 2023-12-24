import logo_light from "../assets/day.png";
import logo_dark from "../assets/night.png";

function Header({ theme, setTheme }) {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" class="rotate" />
      <h1>The React Quiz</h1>
      <img
        onClick={() => {
          toggle_mode();
        }}
        src={theme === "light" ? logo_dark : logo_light}
        alt=" "
        className="toggle-icon"
      />
    </header>
  );
}

export default Header;
