import React, { PureComponent } from 'react';
import { dateTime } from '@grafana/data';
import { SyncInfo } from 'app/types';

interface Props {
  ldapSyncInfo: SyncInfo;
  onUserSync: () => void;
}

interface State {}

const syncTimeFormat = 'dddd YYYY-MM-DD HH:mm zz';
const debugLDAPMappingURL = '/admin/ldap';

export class UserLdapSyncInfo extends PureComponent<Props, State> {
  handleUserSync = () => {
    console.log('Sync user');
    this.props.onUserSync();
  };

  render() {
    const { ldapSyncInfo } = this.props;
    const nextSyncTime = dateTime(ldapSyncInfo.nextSync).format(syncTimeFormat);
    const prevSyncSuccessful = ldapSyncInfo && ldapSyncInfo.prevSync;
    const prevSyncTime = prevSyncSuccessful ? dateTime(ldapSyncInfo.prevSync.started).format(syncTimeFormat) : '';

    return (
      <>
        <h3 className="page-heading">LDAP Synchronisation</h3>
        <div className="gf-form-group">
          <div className="gf-form">
            <table className="filter-table form-inline">
              <tbody>
                <tr>
                  <td>External sync</td>
                  <td>User synced via LDAP – some changes must be done in LDAP or mappings.</td>
                  <td>
                    <span className="label label-tag">LDAP</span>
                  </td>
                </tr>
                <tr>
                  {ldapSyncInfo.enabled ? (
                    <>
                      <td>Next scheduled synchronisation</td>
                      <td colSpan={2}>{nextSyncTime}</td>
                    </>
                  ) : (
                    <>
                      <td>Next scheduled synchronisation</td>
                      <td colSpan={2}>Not enabled</td>
                    </>
                  )}
                </tr>
                <tr>
                  {prevSyncSuccessful ? (
                    <>
                      <td>Last synchronisation</td>
                      <td>{prevSyncTime}</td>
                      <td>Successful</td>
                    </>
                  ) : (
                    <td colSpan={3}>Last synchronisation</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="gf-form-button-row">
            <button className="btn btn-secondary" onClick={this.handleUserSync}>
              Sync user
            </button>
            <a className="btn btn-inverse" href={debugLDAPMappingURL}>
              Debug LDAP Mapping
            </a>
          </div>
        </div>
      </>
    );
  }
}
