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
    </div>
  );
}

export default Filter;