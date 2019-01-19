import React from 'react';
import { getPlaces } from '../../types/api';
import { Query } from 'react-apollo';
import PlacesPresenter from './PlacesPresenter';
import { GET_PLACES } from '../../sharedQueries';

class PlacesQuery extends Query<getPlaces>{ }

class PlacesContainer extends React.Component {


  public render() {
    return (
      <PlacesQuery query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacesPresenter data={data} loading={loading} />
        )}
      </PlacesQuery>

    );
  }
}

export default PlacesContainer;