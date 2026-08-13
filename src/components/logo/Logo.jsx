import logo from './../../assets/svg/logo.svg';

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="логотип" />
      <span className="font-[Forum] text-6xl">Tria</span>
    </div>
  );
};
