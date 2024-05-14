import { NavLink } from "react-router-dom";

const MyNavBar = () => {
  return (
    <>
      <nav>
        <NavLink to="/subjects">Subjects</NavLink>
        <NavLink to="/subjects/create">Add Subjects</NavLink>
      </nav>
    </>
  );
};

export default MyNavBar;
