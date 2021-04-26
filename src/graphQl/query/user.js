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

/*
@desc: GetMyFeedData query
*/
const GetMyFeedData = (obj) => {
  const graphQl = {
    query: `
          query GetMyFeedData($id: ID!, $value: Int){
            getMyFeedData (input: {id: $id, value:$value}){
              message
              success
              totalPlaces 
              data {
                _id
                data
                business {
                  company_name
                  favorites
                  filter_tags
                  hours_format {
                    Start
                    End
                    StartDay
                    EndDay
                  }
                }
                taggedUsers {
                  _id
                  name
                }
                taggedLists {
                  name
                }
                ownerId {
                  name
                  photo
                }
                listId {
                  _id
                  name
                }
                title
                description
                type
                eventSchedule {
                  start_time
                  end_time
                }
                location {
                  type
                  coordinates
                }
                totalPosts {
                  totalPosts
                }
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
export { getUser,getAllUsers,getUserFavorites, GetMyFeedData };
