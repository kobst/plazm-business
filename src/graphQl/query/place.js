/*
@desc: getPlace query
*/
const getPlace = (userSub) => {
  const graphQl = {
    query: `
          query SearchPlacesByUserId($id: ID!){
            searchPlacesByUserId(input: {id:$id}) {
              message
              success
              totalLikes
              totalComments
              place {
                _id
                location {
                  type
                  coordinates
                }
                latitude
                longitude
                hours_format {
                    StartDay
                    EndDay
                    Start
                    End
                }
                additional_media
                filter_tags
                posts
                events
                company_name
                city
                address
                postal_code
                state_province
                telephone
                hours
                genType
                web_site
                place_id
                group_classification
                handles {
                    twitter
                    facebook
                    instagram
                    linkedin
                }
                rating
                default_image_url
                type
                status
                profilePhotoAvailable
                map_link
                userSub
            }
            posts {
                postId
                postDetails {
                    _id
                    data
                    taggedUsers {
                        list_ids
                        _id
                        name
                        blurb
                        photo
                        createdAt
                        updatedAt
                    }
                    taggedLists
                    ownerId
                    likes
                    media {
                        image
                        thumbnail
                    }
                    location {
                        type
                        coordinates
                    }
                    createdAt
                    updatedAt          
                }
                comments {
                    userId {
                      _id
                      list_ids
                      name
                      blurb
                      photo
                      createdAt
                      updatedAt
                      }
                    body
                    replies {
                        userId {
                            _id
                            list_ids
                            name
                            blurb
                            photo
                            createdAt
                            updatedAt
                            }
                    body
                    created_on
                }
                createdAt
                updatedAt
                }
            }
            }
          }`,
    variables: {
      id: userSub,
    },
  };
  return graphQl;
};

/*
@desc: searchAllPlaces query
*/
const searchAllPlaces = () => {
  const graphQl = {
    query: `
          query SearchAllPlaces{
            searchAllPlaces {
              message
              success
              place {
                _id
                company_name
                userSub
            }
            }
          }`,
  };
  return graphQl;
};
export { getPlace, searchAllPlaces };
