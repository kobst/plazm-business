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
const getUserLists = (id) => {
  const graphQl = {
    query: `
          query getUserLists($id: ID!){
            getUserLists(input: {id:$id}) {
              message
              success
              list {
                  _id
                  name
                  description
                }
              }
          }`,
    variables: {
      id: id,
    },
  };
  return graphQl;
};

export { getAllLists,getUserLists };
