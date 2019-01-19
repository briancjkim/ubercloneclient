import React from 'react';
import { LOG_USER_OUT } from '../../sharedQueries.local';
import { GET_PLACES, USER_PROFILE } from '../../sharedQueries';
import { Mutation, Query } from 'react-apollo';
import { getPlaces, userProfile } from '../../types/api';
import SettingsPresenter from './Settingspresenter';

class MiniProfileQuery extends Query<userProfile>{ }
class PlacesQuery extends Query<getPlaces>{ }

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <PlacesQuery query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    userData={userData}
                    placesLoading={placesLoading}
                    placesData={placesData}
                    logUserOut={logUserOut}
                  />
                )}
              </PlacesQuery>

            )}
          </MiniProfileQuery>
        )}

      </Mutation>
    )

  }
}

export default SettingsContainer;