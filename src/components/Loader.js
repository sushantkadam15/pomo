import logo from "./assets/pomodoro-clock.png";
const Loader = () => {
  return (
    <section className="h-screen w-screen min-w-[300px] flex flex-col justify-center items-center">
      <div>
        <img src={logo} alt="Pomo Logo" />
        <h1 className="text-5xl text-center font-semibold">POMO</h1>
      </div>
    </section>
  );
};

export default Loader;
