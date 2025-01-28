import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONST_BATTLETECH_URL } from "../../configVars";
import { IAppGlobals } from "../app-router";
import BattleTechLogo from "./battletech-logo";
import "./top-menu.scss";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../auth/AuthProvider";

export default function TopMenu(props: ITopMenuProps) {
  const toggleMobile = (): void => {
    props.appGlobals.toggleMobile();
  };
  const closeMobile = (): void => {
    props.appGlobals.closeMobile();
  };
  const { isLoggedIn, logout, onCompleteLogin, email } = useAuth();

  let menuStructure: IMenuDef[] = [
    {
      label: "Home",
      url: "/",
      tag: "home",
    },
  ];

  if (!props.appGlobals.appSettings.developerMenu) {
    menuStructure.push({
      label: "Classic BattleTech",
      url: "/classic-battletech",
      tag: "classic-battletech-home",
      startsWithTag: "classic-battletech",
      subMenu: [
        {
          label: "Home",
          url: "/classic-battletech/",
          tag: "classic-battletech-home",
        },
        {
          label: "'Mech Creator",
          url: "/classic-battletech/mech-creator",
          tag: "classic-battletech-mech-creator",
        },
        {
          label: "Roster",
          url: "/classic-battletech/roster",
          tag: "classic-battletech-roster",
        },
      ],
    });

    menuStructure.push({
      label: "Alpha Strike",
      url: "/alpha-strike",
      tag: "alpha-strike-home",
      startsWithTag: "alpha-strike",
      subMenu: [
        {
          label: "Home",
          url: "/alpha-strike/",
          tag: "alpha-strike-home",
        },
        {
          label: "Roster",
          url: "/alpha-strike/roster",
          tag: "alpha-strike-roster",
        },
      ],
    });
  } else {
    menuStructure.push({
      label: "Classic BattleTech",
      url: "/classic-battletech",
      tag: "classic-battletech-home",
      startsWithTag: "classic-battletech",
      subMenu: [
        {
          label: "Home",
          url: "/classic-battletech/",
          tag: "classic-battletech-home",
        },
        {
          label: "'Mech Creator",
          url: "/classic-battletech/mech-creator",
          tag: "classic-battletech-mech-creator",
        },
        {
          label: "Roster",
          url: "/classic-battletech/roster",
          tag: "classic-battletech-roster",
        },
      ],
    });

    menuStructure.push({
      label: "Alpha Strike",
      url: "/alpha-strike/roster",
      tag: "alpha-strike-home",
      startsWithTag: "alpha-strike",
      subMenu: [
        {
          label: "Home",
          url: "/alpha-strike/",
          tag: "alpha-strike-home",
        },
        {
          label: "Roster",
          url: "/alpha-strike/roster",
          tag: "alpha-strike-roster",
        },
        // {
        //     label: "Unit Creator",
        //     url: "/alpha-strike/unit-creator",
        //     tag: "alpha-strike-unit-creator",
        // }
      ],
    });
  }

  menuStructure.push({
    label: "Game Management",
    url: "/game-management/match-play",
    tag: "game-management-home",
    startsWithTag: "game-management",
    subMenu: [
      {
        label: "Home",
        url: "/game-management/",
        tag: "game-management-home",
      },
      {
        label: "Alpha Strike Match Play Generator",
        url: "/game-management/match-play",
        tag: "game-management-match-play",
      },
    ],
  });

  menuStructure.push({
    label: "About",
    url: "/about",
    tag: "about",
  });

  menuStructure.push({
    label: "Status",
    url: "/dev-status",
    tag: "dev-status",
  });

  menuStructure.push({
    label: "Settings",
    url: "/settings",
    tag: "settings-home",
    startsWithTag: "settings",
    subMenu: [
      {
        label: "Settings",
        url: "/settings/",
        tag: "settings-home",
      },
      {
        label: "Backup and Restore",
        url: "/settings/backup-and-restore",
        tag: "settings-roster",
      },
    ],
  });

  if (props.appGlobals.appSettings.developerMenu) {
    menuStructure.push({
      label: "Equipment Editor",
      url: "/equipment-editor",
      tag: "equipment-editor",
    });

    menuStructure.push({
      label: "SSW Sanity Check",
      url: "/ssw-sanity-check",
      tag: "ssw-sanity-check",
    });
  }

  let currentSubmenu: IMenuDef[] = [];
  for (let menu of menuStructure) {
    if (
      menu &&
      menu.startsWithTag &&
      menu.subMenu &&
      menu.subMenu.length > 0 &&
      props.current?.startsWith(menu.startsWithTag)
    ) {
      currentSubmenu = menu.subMenu;
    }
  }
  return (
    <>
      <header className="topmenu">
        <ul className="main-menu">
          <li
            onClick={toggleMobile}
            className="mobile-menu-button d-inline d-md-none"
          >
            <FaBars />
          </li>
          {menuStructure.map((item, itemIndex) => {
            return (
              <React.Fragment key={itemIndex}>
                {item.startsWithTag &&
                item.subMenu &&
                item.subMenu.length > 0 ? (
                  <>
                    <li className="d-none d-md-inline">
                      <Link
                        className={
                          props.current?.startsWith(item.startsWithTag)
                            ? "current"
                            : ""
                        }
                        to={`${process.env.PUBLIC_URL}${item.url}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="d-none d-md-inline">
                    <Link
                      className={props.current === item.tag ? "current" : ""}
                      to={`${process.env.PUBLIC_URL}${item.url}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            );
          })}
          {isLoggedIn ? (
            <li className="login">
              <a href="#" onClick={logout}>
                Log Out: {email}
              </a>
            </li>
          ) : (
            <div className={"google-btn"}>
              <GoogleLogin
                theme="filled_black"
                onSuccess={(response) => {
                  if (response.credential) {
                    onCompleteLogin(response);
                  }
                }}
                onError={() => {
                  console.log("Login failed");
                }}
                useOneTap={true}
                auto_select={true}
              />
            </div>
          )}

          <li className="logo">
            <a
              href={CONST_BATTLETECH_URL}
              rel="noopener noreferrer"
              target="_blank"
              title="Click here to go to the official BattleTech website!"
            >
              <BattleTechLogo
                baseColor={
                  props.appGlobals.appSettings.uiTheme === "desaturated"
                    ? "#ddd"
                    : ""
                }
                altColor={
                  props.appGlobals.appSettings.uiTheme === "desaturated"
                    ? "#aaa"
                    : ""
                }
                // bottomAltColor='#2528d6'
              />
            </a>
          </li>
        </ul>
        {/* {subMenu} */}
        {currentSubmenu ? (
          <ul className="sub-menu">
            {currentSubmenu.map((item, itemIndex) => {
              return (
                <li key={itemIndex} className="d-none d-md-inline">
                  <Link
                    className={props.current === item.tag ? "current" : ""}
                    to={`${process.env.PUBLIC_URL}${item.url}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </header>
      <div className="mobile-menu">
        <ul className="main-menu">
          {menuStructure.map((item, itemIndex) => {
            return (
              <React.Fragment key={itemIndex}>
                {item.subMenu &&
                item.subMenu.length > 0 &&
                item.startsWithTag ? (
                  <li>
                    <div>{item.label}</div>
                    <ul className="sub-menu">
                      {item.subMenu.map((subItem, subItemIndex) => {
                        return (
                          <li key={subItemIndex}>
                            <Link
                              onClick={closeMobile}
                              className={
                                props.current === subItem.tag ? "current" : ""
                              }
                              to={`${process.env.PUBLIC_URL}${subItem.url}`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ) : (
                  <li>
                    <Link
                      onClick={closeMobile}
                      className={props.current === item.tag ? "current" : ""}
                      to={`${process.env.PUBLIC_URL}${item.url}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
}

interface ITopMenuProps {
  current?: string;
  sub?: string;
  appGlobals: IAppGlobals;
}

interface IMenuDef {
  label: string;
  tag: string;
  url: string;
  startsWithTag?: string;
  subMenu?: IMenuDef[];
}
