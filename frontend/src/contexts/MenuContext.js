import React, { useContext, useState } from "react";

export const MenuContext = React.createContext({
  activeMenu: true,
});

const MenuContextProvider = (props) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  return (
    <MenuContext.Provider
      value={{ activeMenu, setActiveMenu , screenSize, setScreenSize}}
    >{props.children}</MenuContext.Provider>
  );
};

export default MenuContextProvider;
export const useMenuContext = () => useContext(MenuContext);
