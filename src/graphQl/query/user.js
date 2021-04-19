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
const getUserFavorites = ({id,value}) => {
  const graphQl = {
    query: `
          query GetUserFavoritesBusiness($id: ID!, $value: Int){
            getUserFavoritesBusiness(input: {id:$id, value:$value}) {
              message
              success
              data {
                favorites {
                _id
                filter_tags
                company_name
                default_image_url
                hours_format {
                  StartDay
                  EndDay
                  Start
                  End
              }
                status
                updatedAt
                }
                totalPosts
                totalFollowers
              }
              totalFavorites
            }
          }`,
    variables: {
      id: id,
      value:value
    },
  };
  return graphQl;
};
export { getUser,getAllUsers,getUserFavorites };
