/*
@desc: findBusinessPhotosGraphql query
*/
const findBusinessPhotosGraphql = (id) => {
  const graphQl = {
    query: `
            query GetPostImages($id: ID!){
                getPostImages(input: {id:$id}) {
                message
                success
                post
              }
            }`,
    variables: {
      id: id,
    },
  };
  return graphQl;
};
export {findBusinessPhotosGraphql};
