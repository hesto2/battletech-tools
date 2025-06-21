import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ESaveDataMode } from '../../../dataSaves';
import { IAppGlobals } from '../../app-router';
import InputCheckbox from '../../components/form_elements/input_checkbox';
import UIPage from '../../components/ui-page';
import { useAuth } from '../../../auth/AuthProvider';
import { getConfig, setConfig } from '../../../auth/ApiClient';
import { StoredConfig } from '../../../auth/ConfigManager';
import { FaTrash } from 'react-icons/fa';

export default class SettingsHome extends React.Component<ISettingsHomeProps, ISettingsHomeState> {
    // [openPicker, data, authResponse] = useDrivePicker();

    constructor(props: ISettingsHomeProps) {
        super(props);
        this.state = {
            updated: false,
            selectedStorageTarget: this.props.appGlobals.appSettings.storageLocation,
        }

        this.props.appGlobals.makeDocumentTitle("Settings");
    }

    setUITheme = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.uiTheme = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    setDeveloperMenu = ( event: React.FormEvent<HTMLInputElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.developerMenu = event.currentTarget.checked;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    setAlphaStrikeMeasurementsInHexes = ( event: React.FormEvent<HTMLInputElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.alphaStrikeMeasurementsInHexes = event.currentTarget.checked;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    setStorageTarget = ( event: React.FormEvent<HTMLSelectElement>): void => {
      this.setState({
        selectedStorageTarget: +event.currentTarget.value,
      })
    }

    render = (): JSX.Element => {

      return (
        <UIPage current="settings-home" appGlobals={this.props.appGlobals}>
            <div className="row">
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>User Interface</legend>

                  <label>
                    App Theme:
                    <select
                      value={this.props.appGlobals.appSettings.uiTheme}
                      onChange={this.setUITheme}
                    >
                      <option value="">Default</option>
                      <option value="desaturated">Desaturated</option>
                      <option value="retro">Retro</option>
                    </select>
                  </label>

                  <InputCheckbox
                    label='Show Developer/Work In Progress Menu'
                    checked={this.props.appGlobals.appSettings.developerMenu}
                    onChange={this.setDeveloperMenu}
                  />

              <InputCheckbox
                  label='Alpha Strike Roster: Display Measurements in Hexes'
                  checked={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                  onChange={this.setAlphaStrikeMeasurementsInHexes}
                />

                </fieldset>

              </div>
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>Data Management</legend>
                    <p>To Backup and Restore your data from another device, visit the <Link to={`${process.env.PUBLIC_URL}/settings/backup-and-restore`}>Backup and Restore</Link> page</p>

                    <h5>Saved Configurations</h5>
                    <ConfigManagement />
                  </fieldset>
              </div>
            </div>

        </UIPage>
      );
    }
}

interface ISettingsHomeProps {
  appGlobals: IAppGlobals;
}

interface ISettingsHomeState {
  updated: boolean;
  selectedStorageTarget: ESaveDataMode;
}

// Functional component to manage saved configurations list and deletion
const ConfigManagement: React.FC = () => {
  const { tokens, isLoggedIn } = useAuth();
  const [configs, setConfigs] = useState<StoredConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch configs from server when tokens change
  useEffect(() => {
    const fetchConfigs = async () => {
      if (!tokens?.access_token) {
        setLoading(false);
        return;
      }
      try {
        const remote = await getConfig(tokens.access_token);
        if (remote.savedConfigs) {
          setConfigs(JSON.parse(remote.savedConfigs));
        }
      } catch (e) {
        console.error('Failed to fetch remote configs', e);
      }
      setLoading(false);
    };
    fetchConfigs();
  }, [tokens]);

  const deleteConfigEntry = async (name: string) => {
    if (!window.confirm(`Delete configuration "${name}"?`)) return;
    const newList = configs.filter((c) => c.name !== name);
    setConfigs(newList);
    if (tokens?.access_token) {
      try {
        await setConfig({ savedConfigs: JSON.stringify(newList) }, tokens.access_token);
      } catch (e) {
        console.error('Failed to delete config', e);
      }
    }
  };

  if (!isLoggedIn) {
    return <p>Please log in to manage configurations.</p>;
  }

  if (loading) {
    return <p>Loading configurations...</p>;
  }

  if (configs.length === 0) {
    return <p>No configurations found.</p>;
  }

  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Saved</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {configs.map((cfg) => (
          <tr key={cfg.name}>
            <td>{cfg.name}</td>
            <td>{new Date(cfg.savedAt).toLocaleString()}</td>
            <td>
              <FaTrash
                role="button"
                style={{ cursor: 'pointer' }}
                title="Delete configuration"
                onClick={() => deleteConfigEntry(cfg.name)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};