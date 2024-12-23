import "@blocknote/mantine/style.css";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";

function App() {
  // const navigate = useNavigate();
  // const completedOnboarding = useUserStore(
  //   (state) => state.completedOnboarding
  // );

  // useEffect(() => {
  //   if (!completedOnboarding) {
  //     navigate("/registration");
  //   }
  // });

  return (
    <main className="flex h-screen bg-stone-50 dark:bg-stone-900 dark:text-stone-50 overflow-x-clip">
      <Sidebar />
      <div className="flex-1 p-8">
        <Editor />
      </div>
    </main>
  );
}

export default App;
