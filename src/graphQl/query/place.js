/*
@desc: getPlace query
*/
const getPlace = (obj) => {
  const graphQl = {
    query: `
          query SearchPlacesByUserId($id: ID!, $value: Int, $filters: filterInput, $ownerId:ID){
            searchPlacesByUserId(input: {id:$id, value:$value, filters:$filters, ownerId:$ownerId}) {
              message
              success
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
                totalLikes
                totalComments
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
                    taggedLists {
                      _id
                      name
                      description
                      items
                      type
                      photo
                      account_id
                      createdAt
                    }
                    ownerId {
                      _id
                      name
                      email
                      photo
                    }
                    likes {
                      name
                      email
                      userSub
                      phoneNumber
                      photo 
                      lockProfile
                      _id
                    }
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
                      name
                      }
                    body
                    replies {
                        userId {
                          _id
                          name
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
      id: obj.businessId,
      value: obj.value,
      filters: obj.filters,
      ownerId: obj.ownerId || null
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
