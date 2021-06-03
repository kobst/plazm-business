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
                  listFollowed
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
const getUserFavorites = ({id,value,filters,longitude,latitude}) => {
  const graphQl = {
    query: `
          query GetUserFavoritesBusiness($id: ID!, $value: Int, $filters:homeSearchFilterInput!,$latitude: Float!,$longitude: Float!){
            getUserFavoritesBusiness(input: {id:$id, value:$value, filters:$filters, latitude:$latitude, longitude:$longitude}) {
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
      value:value,
      filters: filters,
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude)
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
                  _id
                  company_name
                  favorites
                  filter_tags
                  hours_format {
                    Start
                    End
                    StartDay
                    EndDay
                  }
                  default_image_url
                }
                taggedUsers {
                  _id
                  name
                }
                taggedLists {
                  name
                }
                ownerId {
                  _id
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
                user {
                  name
                  photo
                }
                likes
                media {
                  image
                  thumbnail
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

/*
@desc: getUserProfileData query
*/
const GetUserProfileData = (id) => {
  const graphQl = {
    query: `
          query GetUserProfileData($id: ID!){
            getUserProfileData(input: {id:$id}) {
              success
              message
              findTotalPostByUser
              listCreatedByUser
              user {
                name
                photo
                listFollowed
              }
            }
          }`,
    variables: {
      id: id,
    },
  };
  return graphQl;
};
export { getUser,getAllUsers,getUserFavorites, GetMyFeedData, GetUserProfileData };
