/*
@desc: getAllLists query
*/
const getAllLists = () => {
  const graphQl = {
    query: `
            query GetLists{
                getLists {
                message
                success
                list {
                    _id
                    name
                    description
                    type
                    photo
                    account_id
                    items
                    createdAt
                    updatedAt
                  }
                }
            }`,
  };
  return graphQl;
};

/*
@desc: getUserLists query
*/
const getUserLists = (ownerId) => {
  const graphQl = {
    query: `
          query GetUserLists($id: ID!){
            getUserLists(input: {id: $id}) {
              message
              success
              list {
                  _id
                  name
                  ownerId {
                    _id
                    name
                  }
                }
              }
          }`,
    variables: {
      id: ownerId,
    },
  };
  return graphQl;
};

/*
@desc: getUserCreatedAndFollowedLists query
*/
const getUserCreatedAndFollowedLists = (obj) => {
  const graphQl = {
    query: `
          query GetUserCreatedAndFollowedLists($id: ID!, $value: Int){
            getUserCreatedAndFollowedLists (input: {id: $id, value:$value}){
              message
              success
              totalLists
              list {
                  _id
                  isPublic
                  ownerId
                  followers {
                    userId {
                      name
                      photo
                    }
                  }
                  name
                  description
                  type
                  media {
                    image
                  }
                  createdAt
                  updatedAt
                }
              }
          }`,
    variables: {
      id: obj.id,
      value: obj.value,
    },
  };
  return graphQl;
};
/*
@desc: getListDetails query
*/
const GetListDetails = (obj) => {
  const graphQl = {
    query: `
          query GetListDetails($id: ID!, $value: Int){
            getListDetails (input: {id: $id, value:$value}){
              message
              success
              totalLists 
              listDetails {
                _id
                isPublic
                name
                description
                ownerId {
                  _id
                  name
                }
                media {
                  image
                }
                updatedAt
              }
              data {
                _id
                data
                business {
                  _id
                  company_name
                  favorites
                  filter_tags
                  default_image_url
                  hours_format {
                    StartDay
                    EndDay
                    Start
                    End 
                  }
                }
                likes
                taggedUsers {
                  _id
                  name
                }
                taggedLists {
                  _id
                  name
                }
                ownerId {
                  _id
                  name
                  photo
                }
                listId {
                  _id
                  name
                }
                totalPosts {
                  totalPosts
                }
                media
                totalComments{
                  totalCount
                }
                createdAt
              }
              }
          }`,
    variables: {
      id: obj.id,
      value: obj.value,
    },
  };
  return graphQl;
};

/*
@desc: getMostTrendingLists query
*/
const getMostTrendingLists = (value) => {
  const graphQl = {
    query: `
          query FetchMostTrendingLists($value: Int){
            fetchMostTrendingLists(input: {value: $value}) {
              message
              success
              totalLists
              list {
                _id
                name
                description
                isPublic
                media {
                  image
                }
                ownerId {
                  _id
                  name
                }
                followers {
                _id
                name
                photo
                }
                updatedAt
                }
              }
          }`,
    variables: {
      value: value,
    },
  };
  return graphQl;
};

/*
@desc: getMostPopularLists query
*/
const getMostPopularLists = (value) => {
  const graphQl = {
    query: `
          query FetchMostPopularLists($value: Int){
            fetchMostPopularLists(input: {value: $value}) {
              message
              success
              totalLists
              list {
                _id
                name
                description
                media {
                  image
                }
                ownerId {
                  _id
                  name
                }
                followers {
                  _id
                  name
                  photo
                }
                updatedAt
              }
            }
          }`,
    variables: {
      value: value,
    },
  };
  return graphQl;
};

export {
  getAllLists,
  getUserLists,
  getUserCreatedAndFollowedLists,
  GetListDetails,
  getMostTrendingLists,
  getMostPopularLists
};
