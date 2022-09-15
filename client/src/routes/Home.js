import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import AddEntry from "../components/AddEntry";
import EntryList from "../components/EntryList";

const Home = () => {
  const {theme,setTheme} = useContext(ThemeContext)
  return (
    <div className={theme.bg ==='dark' ? 'bg-dark text-light home':'bg-light text-dark home' }>
      <AddEntry/>
      <EntryList/>
    </div>
  );
} 

export default Home;