/*
@desc: getUser query
*/
const getUser = (userSub) => {
  const graphQl = {
    query: `
          query GetUser($userSub: String){
            getUser(input: {userSub:$userSub}) {
              message
              success
              user {
                  name
                  email
                  userSub
                  phoneNumber
                  photo 
                  lockProfile
                  _id
                  favorites
              }
            }
          }`,
    variables: {
      userSub: userSub,
    },
  };
  return graphQl;
};
/*
@desc: getAllUser query
*/
const getAllUsers = () => {
  const graphQl = {
    query: `
        query GetAllUser{
          getAllUser {
            message
            success
            user {
                name
                email
                userSub
                phoneNumber
                photo 
                lockProfile
                _id
            }
          }
        }`,
  };
  return graphQl;
};

/*
@desc: getUserFavoritesBusiness query
*/
const getUserFavorites = (id) => {
  const graphQl = {
    query: `
          query GetUserFavoritesBusiness($id: ID!){
            getUserFavoritesBusiness(input: {id:$id}) {
              message
              success
              data {
                favorites {
                filter_tags
                company_name
                default_image_url
                status
                updatedAt
                }
                totalPosts
                totalFollowers
              }
            }
          }`,
    variables: {
      id: id,
    },
  };
  return graphQl;
};
export { getUser,getAllUsers,getUserFavorites };
