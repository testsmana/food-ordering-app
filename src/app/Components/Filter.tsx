import React from "react";

interface Props {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

function Filter({ setSelectedCategory }: Props) {
  const categories = [
    "France",
    "Nederland",
    "Italy",
    "United Kingdom",
    "Switzerland",
    "Greece",
    "Other",
  ];

  const [theme, setTheme] = React.useState("light-theme");

  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  return (
    
      <div className="filter__select">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All location</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      

      {/* <div className="theme-toggler">
        <input
          type="checkbox"
          id="theme-toggler__checkbox"
          className="theme-toggler__checkbox"
        />
        <label
          htmlFor="theme-toggler__checkbox"
          className="theme-toggler__label"
          onClick={changeTheme}
        >
          Toggle
        </label>
      </div> */}
    </div>
  );
}

export default Filter;