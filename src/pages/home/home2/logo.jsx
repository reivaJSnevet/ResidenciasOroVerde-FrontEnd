const Logo = () => {
  const logoPath = 'residenciasLogo.png'; // Replace with the actual filename of your logo image

  return (
    <img src={logoPath} alt="Company Logo"  className="w-auto h-20 text-black"  />
  );
};

export default Logo;
