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
export { getUser,getAllUsers };
