import Branding from "../components/Branding";
import RegistrationForm from "../components/RegistrationForm";

function RegistrationScreen() {
  return (
    <main className="h-screen bg-stone-50 dark:bg-stone-900 dark:text-stone-50 p-8">
      <div className="flex justify-center items-center">
        <Branding />
      </div>

      <div className="flex flex-col w-full justify-center items-center">
        <h1 className="text-4xl font-bold mb-4 p-2 text-center">
          <span className="bg-linear-90 from-pink-300 to-pink-100 text-transparent bg-clip-text">
            ваша
          </span>{" "}
          система организации знаний
        </h1>

        <RegistrationForm />
      </div>
    </main>
  );
}

export default RegistrationScreen;
