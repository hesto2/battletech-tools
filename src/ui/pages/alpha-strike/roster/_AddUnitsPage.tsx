import * as React from 'react';
import { FaBars, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { AlphaStrikeUnit, IASMULUnit } from '../../../../classes/alpha-strike-unit';
import { BattleMech } from '../../../../classes/battlemech';
import { getMULASSearchResults } from '../../../../utils';
import { getMULAerospaceRoles, getMULEraIDs, getMULEraLabel, getMULFactionIDs, getMULFactionLabels, getMULGroundRoles, getMULTypeIDs, getMULTypeLabel } from '../../../../utils/mulUtilities';
import { IAppGlobals } from '../../../app-router';
import InputField from '../../../components/form_elements/input_field';
import TextSection from '../../../components/text-section';
import CurrentForceList from './_CurrentForceList';
import { generateUUID } from '../../../../utils/generateUUID';

//TODO: Clearfix Hack for overflowing results
/*
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

*/


export default class AlphaStrikeAddUnitsView extends React.Component<IAlphaStrikeAddUnitsViewProps, IAlphaStrikeAddUnitsViewState> {

    constructor( props: IAlphaStrikeAddUnitsViewProps ) {
        super(props)


        this.state = {
            searchResults: this.props.appGlobals.appSettings.alphasStrikeCachedSearchResults,
            contextMenuSearch: -1,
            contextMenuSavedBattleMechs: -1,
            searchSort: 'Name',
            lastSearchId: ''
        }
    }

    toggleContextMenuSearch = ( searchIndex: number ): void => {
        let newIndex: number = -1;
        if( this.state.contextMenuSearch !== searchIndex) {
          newIndex = searchIndex;
        }

        this.setState({
          contextMenuSearch: newIndex,
          contextMenuSavedBattleMechs: -1,
        })
      }

      toggleContextMenuSavedBattleMechs = ( searchIndex: number ): void => {
        let newIndex: number = -1;
        if( this.state.contextMenuSavedBattleMechs !== searchIndex) {
          newIndex = searchIndex;
        }

        this.setState({
          contextMenuSavedBattleMechs: newIndex,
          contextMenuSearch: -1,
        })
      }

    updateSearch = ( event: React.FormEvent<HTMLInputElement> ): void => {

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.alphaStrikeSearchTerm = event.currentTarget.value;
        this.props.appGlobals.saveAppSettings( appSettings );

        this.updateSearchResults();
    }

    updateRules = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchRules = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateTech = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchTech = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateRole = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchRole = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateEra = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchEra = +event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateType = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchType = +event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateFactionSearch = ( event: React.FormEvent<HTMLInputElement> ): void => {
        
        let appSettings = this.props.appGlobals.appSettings;
  
        appSettings.alphaStrikeFactionSearchTerm = event.currentTarget.value;
        if( appSettings.alphaStrikeFactionSearchTerm.length < 3 ) {
          appSettings.alphaStrikeFactionSuggestions = [];
          this.props.appGlobals.saveAppSettings( appSettings );
          return;
        }

        let arrFound = [];
        for( let factionID of getMULFactionIDs() ) {
          if( getMULFactionLabels(factionID).toLowerCase().includes( appSettings.alphaStrikeFactionSearchTerm.toLowerCase() ) ) {
            arrFound.push( factionID  );
          }
        }
        appSettings.alphaStrikeFactionSuggestions = arrFound;
        this.props.appGlobals.saveAppSettings( appSettings );
    }

    addFactionSelected = ( factionID: number ): void => {
      if( this.props.appGlobals.appSettings.alphaStrikeSearchFactions.includes( factionID ) ) {
        return;
      }
      let appSettings = this.props.appGlobals.appSettings;
      appSettings.alphaStrikeSearchFactions.push( factionID );
      this.props.appGlobals.saveAppSettings( appSettings );
      this.updateSearchResults();
    }

    removeFactionSelected = ( factionID: number ): void => {
      console.log('removeFactionSelected', factionID);
      let appSettings = this.props.appGlobals.appSettings;
      appSettings.alphaStrikeSearchFactions = appSettings.alphaStrikeSearchFactions.filter( (faction) => faction !== factionID );
      console.log(appSettings.alphaStrikeSearchFactions);
      this.props.appGlobals.saveAppSettings( appSettings );
      this.updateSearchResults();
    }


    updateSearchResults = async (): Promise<void> => {

      let currentSearchId = generateUUID();

      this.setState({
        lastSearchId: currentSearchId
      });

      let data: IASMULUnit[] = await getMULASSearchResults(
        this.props.appGlobals.appSettings.alphaStrikeSearchTerm,
        this.props.appGlobals.appSettings.alphaStrikeSearchRules,
        this.props.appGlobals.appSettings.alphaStrikeSearchTech,
        this.props.appGlobals.appSettings.alphaStrikeSearchRole,
        this.props.appGlobals.appSettings.alphaStrikeSearchEra,
        this.props.appGlobals.appSettings.alphaStrikeSearchType,
        this.props.appGlobals.appSettings.alphaStrikeSearchFactions,
        !navigator.onLine,
        false,
        this.props.appGlobals,
      );

      if(this.state.lastSearchId !== currentSearchId) {
        console.log("updateSearchResults: searchId mismatch, aborting");
        return;
      }

      data.sort((a: IASMULUnit, b: IASMULUnit): number => {
        const primarySort = this.state.searchSort;
        const secondarySort = this.state.searchSort === 'Name'
            ? 'BFPointValue'
            : 'Name';

        /* primary sort */
        if (a[primarySort] < b[primarySort]) return -1;
        else if (a[primarySort] > b[primarySort]) return 1;

        /* fallback sort to break primary sort ties */
        if (a[secondarySort] < b[secondarySort]) return -1;
        else if (a[secondarySort] > b[secondarySort]) return 1;

        return 0;
    });

    //   console.log("updateSearchResults data", data);
      this.setState({
        searchResults: data,
        contextMenuSearch: -1,
      });

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphasStrikeCachedSearchResults = data;
      this.props.appGlobals.saveAppSettings( appSettings );

    }

    addToGroup = (
      mulUnit: AlphaStrikeUnit,
      groupIndex: number = 0,
    ): void => {
      if( this.props.appGlobals.currentASForce ) {
        this.props.appGlobals.currentASForce.addToGroup( mulUnit, groupIndex );

        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        this.setState({
          contextMenuSearch: -1,
        });


      }
    }


    handleSort = ({ target: { value } }: any) => {
        this.setState({ searchSort: value });
        this.updateSearchResults();
    }

    render = (): JSX.Element => {
      if(!this.props.appGlobals.currentASForce) {
        return <></>
      }

        return(
            <>
                  <div className="row">
    <div className="col">
      <CurrentForceList
          appGlobals={this.props.appGlobals}
          // openAddingUnits={this.openAddingUnits}
          openEditUnit={this.props.openEditUnit}
      />
    </div>
    <div className="col">
        <TextSection
            label="Search for Units"
        >
            <div className="small-text text-center">
                We integrate with the <a href="http://masterunitlist.info/" target="_blank">Master Unit List</a> to make sure that all the stats are as official and as up to date as possible.
            </div>
{navigator && navigator.onLine ? (
    <>

<fieldset className="fieldset">
                    <div className="row">
                      <div className="col-md-6 text-center">

                    <InputField
                         type="search"
                         onChange={this.updateSearch}
                         value={this.props.appGlobals.appSettings.alphaStrikeSearchTerm}
                         label="Search Terms"
                    />
                      </div>
                      <div className="col-md-6 text-center">
                      <label>
                      Search Rules:<br />
                      <select
                        onChange={this.updateRules}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchRules}
                      >
                        <option value="">All</option>
                        <option value="introductory">Introductory</option>
                        <option value="standard">Standard</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </label>

                      </div>
</div>
<div className="row">
                      <div className="col-md-6 text-center">
                      <label>
                      Search Tech:<br />
                      <select
                        onChange={this.updateTech}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchTech}
                      >
                        <option value="">All</option>
                        <option value="inner sphere">Inner Sphere</option>
                        <option value="clan">Clan</option>
                      </select>
                    </label>

                    <label>
                      Type:<br />
                      <select
                        onChange={this.updateType}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchType}
                      >
                        <option value="">All</option>
                        {getMULTypeIDs().map( (typeID ) => {
                          return <option key={typeID} value={typeID}>{getMULTypeLabel( typeID )}</option>
                        })}
                        {/* {btEraOptions.map( (era, eraIndex) => {
                          return (
                            <option key={eraIndex} value={era.yearStart}>{era.name}</option>
                          )
                        })} */}
                      </select>
                    </label>
                          
                      
                      </div>
                      <div className="col-md-6 text-center">

                      <label>
                      Era:<br />
                      <select
                        onChange={this.updateEra}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchEra}
                      >
                        <option value="">All</option>
                        {getMULEraIDs().map( (eraID ) => {
                          return <option key={eraID} value={eraID}>{getMULEraLabel( eraID )}</option>
                        })}
                        {/* {btEraOptions.map( (era, eraIndex) => {
                          return (
                            <option key={eraIndex} value={era.yearStart}>{era.name}</option>
                          )
                        })} */}
                      </select>
                    </label>

                    <label>
                      Role:<br />
                      <select
                        onChange={this.updateRole}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchRole}
                      >
                        <option value="">All</option>
                        <optgroup label="Ground Unit Roles">
                        {getMULGroundRoles().map( (role, roleIndex ) => {
                          return <option key={roleIndex} value={role}>{role}</option>
                        })}
                        </optgroup>
                        <optgroup label="Aerospace Roles">
                        {getMULAerospaceRoles().map( (role, roleIndex ) => {
                          return <option key={roleIndex} value={role}>{role}</option>
                        })}
                        </optgroup>


                      </select>
                    </label>
                    
                      </div>
                     
                    </div>
                    <div className="row">
                      <div className="col-md-12 text-center">
                      <InputField
                         type="search"
                         onChange={this.updateFactionSearch}
                         value={this.props.appGlobals.appSettings.alphaStrikeFactionSearchTerm}
                         label="Filter Availability By Factions"
                         placeholder='Type 3 or more characters to search. MUL uses OR logic for multiple factions.'
                        />
                      </div>
                      <div className="col-md-6 text-center">
                      {this.props.appGlobals.appSettings.alphaStrikeFactionSuggestions.length > 0 ? (
                      <label htmlFor="factionFilter">
                      Add to Faction Filter?<br />
                      {this.props.appGlobals.appSettings.alphaStrikeFactionSuggestions.map( (factionID) => { 
                        return <div className="text-left"><button onClick={() => this.addFactionSelected(factionID)} className="btn-sm btn btn-primary"><FaPlus /></button>&nbsp;{getMULFactionLabels(factionID)}</div>
                      })}
                      </label>
                      ) : null}
                      </div>
                      <div className="col-md-6 text-center">
                      {this.props.appGlobals.appSettings.alphaStrikeSearchFactions.length > 0 ? (
                    <label htmlFor="factionFilter">
                      Current Faction Filter:<br />
                      {this.props.appGlobals.appSettings.alphaStrikeSearchFactions.map( (factionID) => { 
                        return <div className="text-left"><button onClick={() => this.removeFactionSelected(factionID)} className="btn btn-sm btn-danger"><FaTrash /></button>{getMULFactionLabels(factionID)}</div>
                      })}
                      </label>
                    ):null}
                      </div>
                    </div>
                  

                  </fieldset>

                <h3 className="text-center">Search Results ({this.state.searchResults.length})</h3>
                <div className="search-sort-wrapper">
                    Sort:
                    <span>
                        <input
                            id="search-sort-name"
                            type="radio"
                            name="searchSort"
                            value="Name"
                            checked={this.state.searchSort === 'Name'}
                            onChange={this.handleSort}
                        />
                        <label htmlFor="search-sort-name">Name</label>
                    </span>
                    <span>
                        <input
                            id="search-sort-pv"
                            type="radio"
                            name="searchSort"
                            value="BFPointValue"
                            checked={this.state.searchSort === 'BFPointValue'}
                            onChange={this.handleSort}
                        />
                        <label htmlFor="search-sort-pv">PV</label>
                    </span>
                </div>
                  <div className="table-wrapper">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th>Name</th>
                          <th>Rules</th>
                          <th>Tech</th>
                          <th>Era</th>
                          <th>Type</th>
                          <th>Points</th>

                        </tr>
                        <tr>
                          <th>&nbsp;</th>
                          <th colSpan={4}>Notes</th>
                          <th colSpan={2}>Role</th>
                        </tr>
                      </thead>

                      {this.state.searchResults.length > 0 ? (
                        <>
                          {this.state.searchResults.map( (asUnit: IASMULUnit, unitIndex: number) => {

                            return (
                              <tbody key={unitIndex}>
                              <tr>
                                <td rowSpan={2} valign="middle" style={{verticalAlign: "middle"}} className="text-left min-width no-wrap">

  {this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
    (
      <div className="drop-down-menu-container">
        <button
          className="btn-sm btn btn-primary"
          onClick={() => this.toggleContextMenuSearch(unitIndex)}
          title="Open the context menu for this unit"
        >
          <FaBars />
        </button>
        <ul
          className={this.state.contextMenuSearch === unitIndex ? "styleless dd-menu active" : "styleless dd-menu"}
        >
          {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
            return (
              <li
                key={asGroupIndex}
                onClick={() => {
                  let unitObj = new AlphaStrikeUnit();
                  unitObj.importMUL( JSON.parse(JSON.stringify(asUnit)) );
                  this.addToGroup( unitObj, asGroupIndex)
                }}
                title={"Adds this unit to your group '" + asGroup.getName(asGroupIndex + 1) + "'"}
              >
                <FaPlus />&nbsp;
                Add to {asGroup.getName(asGroupIndex + 1)}
              </li>
            )
          })}

        </ul>
      </div>
    ) : (
      <button
        className="btn-sm btn btn-primary no-right-margin"
        onClick={() => {
          let unitObj = new AlphaStrikeUnit();
          unitObj.importMUL( JSON.parse(JSON.stringify(asUnit)) );
          this.addToGroup( unitObj, 0)
        }}
        title="Add this unit to your current group"
      >
        <FaPlus />
      </button>
  )}

    <button
      className="btn btn-primary btn-sm"
      onClick={() => {
        let unitObj = new AlphaStrikeUnit();
        unitObj.importMUL( asUnit );
        this.props.openViewUnit( unitObj )
      }}
      title="View this unit's Alpha Strike Card"
    >
      <FaEye />
    </button>
  </td>
                                <td>{asUnit.Name}</td>

                                <td>{asUnit.Rules}</td>
                                <td>{asUnit.Technology.Name}</td>
                                <td>{getMULEraLabel(asUnit.EraId)}</td>
                                <td>{asUnit.BFType}</td>
                                <td>{asUnit.BFPointValue}</td>

                              </tr>
                              <tr>
                                <td colSpan={4} className=" text-left">
                                  <strong title="Move">MV</strong>: {asUnit.BFMove}
                                  &nbsp;|&nbsp;<strong title="Armor/Internal Structure values">A/IS</strong>: {asUnit.BFArmor}/{asUnit.BFStructure}
                                  &nbsp;|&nbsp;<strong title="Alpha Strike Damage Bands">Damage</strong>: {asUnit.BFDamageShort}/{asUnit.BFDamageMedium}/{asUnit.BFDamageLong}
                                  {asUnit.BFOverheat  && asUnit.BFOverheat > 0 ? (
                                    <>
                                    &nbsp;|&nbsp;<strong title="Overheat Value">OHV</strong>: {asUnit.BFOverheat}
                                    </>
                                  ) : null}
                                  {asUnit.BFAbilities && asUnit.BFAbilities.trim() ? (
                                    <>
                                      &nbsp;|&nbsp;<strong title="Special Abilities">Special</strong>: {asUnit.BFAbilities}
                                    </>
                                  ) : null}

                                </td>
                                <td colSpan={3} className=" text-left">
                                  {asUnit.Role.Name}
                                </td>
                              </tr>
                              </tbody>
                            )
                          })}
                        </>
                      ) : (
                        <>
                        {this.props.appGlobals.appSettings.alphaStrikeSearchTerm.length < 3 ? (
                          <tbody>
                          <tr>
                            <td className="text-center" colSpan={7}>
                              Please type a search term 3 or more characters.
                            </td>
                          </tr>
                          </tbody>
                        ) : (
                          <tbody>
                          <tr>
                            <td className="text-center" colSpan={7}>
                              Sorry, there are no matches with those parameters. It is a remote possibility that the MUL is down if other searches don't work.
                            </td>
                          </tr>
                          </tbody>
                        )}
                        </>
                      )}

                    </table>
                  </div>
    </>
) : (
    <div className="alert alert-warning">
        We're sorry, searching the Master Unit List for units requires an Internet connection, please connect to the Internet.
    </div>
)}

                </TextSection>

{this.props.appGlobals.battleMechSaves && this.props.appGlobals.battleMechSaves.length > 0 ? (
    <TextSection
        label="Your Created BattleMechs"
    >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Name</th>
                        {/* <th>Rules</th>
                        <th>Tech</th>
                        <th>Era</th>
                        <th>Type</th> */}
                        <th>Points</th>

                      </tr>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={3}>Notes</th>

                      </tr>
                    </thead>

        {this.props.appGlobals.battleMechSaves.map( (bm, unitIndex) => {
            let bmObj = new BattleMech();
            bmObj.import( bm );

            let asUnit = bmObj.calcAlphaStrike();

            return (
                <tbody key={unitIndex}>
                <tr>
                  <td className="text-left min-width no-wrap">

{this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
(
<div className="drop-down-menu-container">
<button

className="btn btn-primary btn-sm"
onClick={() => this.toggleContextMenuSavedBattleMechs(unitIndex)}
title="Open the context menu for this unit"
>
<FaBars />
</button>
<ul
className={this.state.contextMenuSavedBattleMechs === unitIndex ? "styleless dd-menu active" : "styleless dd-menu"}
>
{this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
return (
<li
  key={asGroupIndex}
  onClick={() => this.addToGroup(asUnit, asGroupIndex)}
  title={"Adds this unit to your group '" + asGroup.getName(asGroupIndex + 1) + "'"}
>
  <FaPlus />&nbsp;
  Add to {asGroup.getName(asGroupIndex + 1)}
</li>
)
})}

</ul>
</div>
) : (
<button
className="btn btn-primary btn-sm no-right-margin"
onClick={() => this.addToGroup(asUnit, 0)}
title="Add this unit to your current group"
>
<FaPlus />
</button>
)}

<button
className="btn btn-primary btn-sm"
onClick={() => this.props.openViewUnit(asUnit)}
title="View this unit's Alpha Strike Card"
>
<FaEye />
</button>
</td>
                  <td title={"UUID: " + asUnit.mechCreatorUUID}>{asUnit.name}</td>

                  {/* <td>{asUnit.r}</td>
                  <td>{asUnit.Technology.Name}</td>
                  <td>{asUnit.EraStart}</td>
                  <td>{asUnit.BFType}</td> */}
                  <td>{asUnit.basePoints}</td>

                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td colSpan={3} className="med-small-text">

                    <strong title="Alpha Strike Damage Bands">Damage</strong>: {asUnit.damage.short}/{asUnit.damage.medium}/{asUnit.damage.long}
                    {asUnit.overheat  && asUnit.overheat > 0 ? (
                      <>
                       &nbsp;|&nbsp;<strong title="Overheat Value">OHV</strong>: {asUnit.overheat}
                      </>
                    ) : null}
                    {asUnit.abilities.length > 0 ? (
                      <>
                        &nbsp;|&nbsp;<strong title="Special Abilities">Special</strong>: {asUnit.abilities.join(", ")}
                      </>
                    ) : null}

                  </td>
                </tr>
                </tbody>
            )
        }) }
            </table>
    </TextSection>
) : null}
    </div>
  </div>
            </>
        )
    }
}

interface IAlphaStrikeAddUnitsViewProps {
    appGlobals: IAppGlobals;
    openEditUnit( showASUnit: AlphaStrikeUnit ): void;
    openViewUnit( theUnit: AlphaStrikeUnit ): void;
}

interface IAlphaStrikeAddUnitsViewState {
    searchResults: IASMULUnit[];
    contextMenuSearch: number;
    contextMenuSavedBattleMechs: number;
    searchSort: 'Name' | 'BFPointValue';
    lastSearchId: string;
}