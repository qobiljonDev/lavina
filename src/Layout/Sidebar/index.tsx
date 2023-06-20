import React from "react";
import { NavLink, Link } from "react-router-dom";

import { useAppDispatch } from "store/hooks";
import { Icons } from "components";
import { storage } from "services";
import { LoginFailure } from "store/action/auth";

type TLink = { name: string; href: string; icon: React.ReactElement };

const Index = () => {
  const dispatch = useAppDispatch();

  const MenuLink: TLink[] = [
    { name: "Kitoblar", href: "/", icon: <Icons.Books /> },
  ];

  return (
    <aside>
      <div className="logo">
        <Link to="/">
          <Icons.Logo />
          <strong>Lavina</strong>
        </Link>
      </div>
      <ul className="menu-link">
        {MenuLink.map((item) => {
          return (
            <li key={item.href}>
              <NavLink className="link" to={item.href}>
                <div className="icon">{item.icon}</div>
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div
        className="logout cur-pointer mt-10"
        onClick={() => {
          storage.remove("token");
          dispatch(LoginFailure());
        }}
      >
        <div className="icon">
          <Icons.LogoOut />
        </div>
        Akkauntdan chiqish
      </div>
    </aside>
  );
};

export default Index;
