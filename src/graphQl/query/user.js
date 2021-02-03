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
              }
            }
          }`,
      variables: {
        userSub: userSub,
      },
    };
    return graphQl;
  };
  export { getUser };

  