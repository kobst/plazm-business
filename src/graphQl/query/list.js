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
            }`
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

  export { getAllLists, getUserLists };
  