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
                  ownerId
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
                  ownerId
                  followers {
                    name
                    photo
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
      value: obj.value
    },
  };
  return graphQl;
};

export { getAllLists, getUserLists, getUserCreatedAndFollowedLists };
