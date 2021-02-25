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

  export { getAllLists };
  