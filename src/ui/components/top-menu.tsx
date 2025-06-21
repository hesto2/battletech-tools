import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONST_BATTLETECH_URL } from "../../configVars";
import { IAppGlobals } from "../app-router";
import BattleTechLogo from "./battletech-logo";
import "./top-menu.scss";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../auth/AuthProvider";
import { Button, Modal, Form } from "react-bootstrap";
import { useRemoteData } from "../../auth/RemoteDataProvider";
import { getActiveConfigName, StoredConfig } from "../../auth/ConfigManager";
import { getConfig, setConfig } from "../../auth/ApiClient";

export default function TopMenu(props: ITopMenuProps) {
  const toggleMobile = (): void => {
    props.appGlobals.toggleMobile();
  };
  const closeMobile = (): void => {
    props.appGlobals.closeMobile();
  };
  const { isLoggedIn, logout, email, login, tokens } = useAuth();

  // Remote data (last saved time)
  const { lastUpdated } = useRemoteData();

  // Local configuration management
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [configName, setConfigName] = useState<string>(getActiveConfigName() || "");

  // List of configs fetched from server
  const [remoteConfigs, setRemoteConfigs] = useState<StoredConfig[]>([]);

  // Temp states for modal inputs
  const [tempSaveName, setTempSaveName] = useState<string>(configName);
  const [tempLoadName, setTempLoadName] = useState<string>(configName);

  const lastSavedDisplay = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : "Never";

  const fetchRemoteConfigs = async (): Promise<StoredConfig[]> => {
    if (!tokens?.access_token) return [];
    try {
      const remote = await getConfig(tokens.access_token);
      if (remote.savedConfigs) {
        return JSON.parse(remote.savedConfigs);
      }
    } catch (e) {
      console.error("Failed to fetch remote configs", e);
    }
    return [];
  };

  const openLoadModal = async () => {
    const list = await fetchRemoteConfigs();
    setRemoteConfigs(list);
    if (list.length > 0) {
      setTempLoadName(list[0].name);
    }
    setShowLoadModal(true);
  };

  const openSaveModal = async () => {
    const list = await fetchRemoteConfigs();
    setRemoteConfigs(list);
    setTempSaveName(configName);
    setShowSaveModal(true);
  };

  const handleSaveConfirm = async () => {
    if (!tokens?.access_token) return;

    const data: any = {};
    ["currentASForce", "favoriteASGroups"].forEach((key) => {
      data[key] = localStorage.getItem(key);
    });

    // Fetch current saved list
    let savedList: StoredConfig[] = await fetchRemoteConfigs();
    // Remove existing by same name
    savedList = savedList.filter((c) => c.name !== tempSaveName);

    const newConfig: StoredConfig = {
      name: tempSaveName || "Unnamed Config",
      savedAt: Date.now(),
      device: navigator.userAgent,
      data,
    };
    savedList.push(newConfig);

    await setConfig(
      { savedConfigs: JSON.stringify(savedList) },
      tokens.access_token
    );

    setRemoteConfigs(savedList);
    // Persist active configuration locally
    localStorage.setItem("activeConfigName", newConfig.name);
    setConfigName(newConfig.name);
    setShowSaveModal(false);
  };

  const handleLoadConfirm = async () => {
    if (!tempLoadName) return;
    const cfg = remoteConfigs.find((c) => c.name === tempLoadName);
    if (cfg) {
      Object.keys(cfg.data).forEach((key) => {
        const value = (cfg.data as any)[key];
        if (value !== undefined && value !== null) {
          localStorage.setItem(key, value as string);
        } else {
          localStorage.removeItem(key);
        }
      });
      // Store active config name locally so it persists after reload
      localStorage.setItem("activeConfigName", cfg.name);
      setConfigName(cfg.name);

      // Previously reloaded page to apply config globally; now we rely on components reading from localStorage as needed.
    }
    setShowLoadModal(false);
  };

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
          {isLoggedIn && (
            <li className="config-actions d-none d-md-inline">
              <Button
                size="sm"
                variant="primary"
                onClick={openLoadModal}
              >
                Load
              </Button>{" "}
              <Button
                size="sm"
                variant="primary"
                onClick={openSaveModal}
                title={`Last saved: ${lastSavedDisplay}`}
              >
                Save
              </Button>
            </li>
          )}
          {isLoggedIn ? (
            <li className="login">
              <a href="#" onClick={logout}>
                Log Out: {email}
              </a>
              <small className="ms-2 d-inline-block">
                Active Force: {configName || "None"}
              </small>
            </li>
          ) : (
            <div className={"google-btn"}>
              <Button onClick={login}>Login</Button>
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
      {/* Save Configuration Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="configNameInput">
            <Form.Label>Configuration Name</Form.Label>
            <Form.Control
              type="text"
              value={tempSaveName}
              placeholder="Enter configuration name"
              onChange={(e) => setTempSaveName(e.target.value)}
            />
            <Form.Text className="text-light">
              Selecting an existing name will overwrite it.
            </Form.Text>
          </Form.Group>
          {remoteConfigs.length > 0 && (
            <Form.Group className="mb-3" controlId="existingConfigsSelect">
              <Form.Label>Or select existing</Form.Label>
              <Form.Select
                value={tempSaveName}
                onChange={(e) => setTempSaveName(e.target.value)}
              >
                <option value="">-- New Configuration --</option>
                {remoteConfigs.map((cfg) => (
                  <option key={cfg.name} value={cfg.name}>
                    {cfg.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveConfirm}
            disabled={!tempSaveName.trim()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Load Configuration Modal */}
      <Modal show={showLoadModal} onHide={() => setShowLoadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Load Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {remoteConfigs.length === 0 ? (
            <p>No configurations saved.</p>
          ) : (
            <Form.Select
              value={tempLoadName}
              onChange={(e) => setTempLoadName(e.target.value)}
            >
              {remoteConfigs.map((cfg) => (
                <option key={cfg.name} value={cfg.name}>
                  {cfg.name}
                </option>
              ))}
            </Form.Select>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoadModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleLoadConfirm}
            disabled={!tempLoadName}
          >
            Load
          </Button>
        </Modal.Footer>
      </Modal>
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
