import axios from 'axios';
import _ from 'lodash';

export const getFriendListLeaderBoard = (
  friendList,
  tableData,
  setTableData
) => {
  const data = JSON.stringify({
    friends: Object.entries(friendList).map(([id]) => id),
  });

  const config = {
    method: 'post',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/friends`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getGlobalLeaderBoard = (
  globalPageNumber,
  setGlobalPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/global`,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: globalPageNumber,
    },
  };

  axios(config)
    .then(function ({ data }) {
      const { globalRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setGlobalPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getCountryLeaderBoard = (
  country,
  countryPageNumber,
  setCountryPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/country`,
    params: {
      page: countryPageNumber,
      country,
    },
  };
  axios(config)
    .then(({ data }) => {
      const { countryRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setCountryPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getFriendListRatingLeaderBoard = (
  friendList,
  tableData,
  setTableData
) => {
  const data = JSON.stringify({
    friends: Object.entries(friendList).map(([id]) => id),
  });

  const config = {
    method: 'post',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/rating/friends`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getGlobalRatingLeaderBoard = (
  globalPageNumber,
  setGlobalPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/rating/global`,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      page: globalPageNumber,
    },
  };

  axios(config)
    .then(function ({ data }) {
      const { globalRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setGlobalPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getCountryRatingLeaderBoard = (
  country,
  countryPageNumber,
  setCountryPageCount,
  tableData,
  setTableData
) => {
  const config = {
    method: 'get',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/rating/country`,
    params: {
      page: countryPageNumber,
      country,
    },
  };
  axios(config)
    .then(({ data }) => {
      const { countryRankList: response, contestantCount } = data;
      const pageCount = Math.ceil(contestantCount / 50);
      setCountryPageCount(pageCount);
      if (!_.isEqual(tableData, response)) setTableData(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getContest = (contestDetails, setContestDetails) => {
  var config = {
    method: 'get',
    url: `https://leetboardbe-subhrangshupandeyhit.b4a.run/contest`,
  };

  axios(config)
    .then(function ({ data: response }) {
      if (!_.isEqual(response, contestDetails)) setContestDetails(response);
    })
    .catch(function (error) {
      console.log('ERROR : ', error);
    });
};
