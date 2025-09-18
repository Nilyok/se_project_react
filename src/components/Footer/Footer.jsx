import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__left">Developed by Magnum Nilyok</span>
      <span className="footer__right">{currentYear}</span>
    </footer>
  );
}

export default Footer;