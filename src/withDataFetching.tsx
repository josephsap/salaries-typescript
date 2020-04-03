import * as React from "react";
import axios from 'axios';

const withDataFetching = (WrappedComponent) => {
  class WithDataFetching extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        locations: [],
        titles: [],
        descriptions: []
      };
    }

    componentDidMount() {
      function getTitles() {
        return axios.get('https://events.thesupply.com/api/salaries/titles');
      }

      function getLocations() {
        return axios.get('https://events.thesupply.com/api/salaries/locations');
      }

      function getDefaultDescriptions() {
        return axios.get('https://events.thesupply.com/api/salaries/digital-producer');
      }

      const _this = this;
      axios.all([getTitles(), getLocations(), getDefaultDescriptions()])
        .then(axios.spread(function (titles, locations, descriptions) {
          _this.setState({
            titles: titles.data,
            locations: locations.data,
            descriptions: descriptions.data,
            loading: false
          })
        })
        )
    }

    render() {
      return (
        <WrappedComponent
          loading={this.state.loading}
          titles={this.state.titles}
          descriptions={this.state.descriptions}
          locations={this.state.locations}
        />
      );
    }
  }

  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;

  return WithDataFetching;

};

export default withDataFetching;
