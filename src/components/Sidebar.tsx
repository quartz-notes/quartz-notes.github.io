import Branding from "./Branding";
import NoteList from "./NoteList";

function Sidebar() {
  return (
    <div className="w-64 border-r border-stone-900/10 dark:border-stone-50/10 pt-10 pb-10 pl-5 pr-5">
      <Branding />
      <NoteList />
    </div>
  );
}

export default Sidebar;
