/*
@desc: getPlace query
*/
const getPlace = (obj) => {
  const graphQl = {
    query: `
          query SearchPlacesByUserId($id: ID!, $value: Int, $filters: filterInput, $ownerId:ID, $sideFilters: sideFilterInput){
            searchPlacesByUserId(input: {id:$id, value:$value, filters:$filters, ownerId:$ownerId, sideFilters: $sideFilters}) {
              message
              success
              totalPosts
              place {
                _id
                userSub
                hours_format {
                    StartDay
                    EndDay
                    Start
                    End
                }
                additional_media
                filter_tags
                company_name
                address
                telephone
                handles {
                    twitter
                    facebook
                    instagram
                    linkedin
                }
                default_image_url
            }
            posts {
                postId
                totalLikes
                totalComments
                postDetails {
                    _id
                    data
                    listId {
                      _id
                      name
                    }
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
      ownerId: obj.ownerId || null,
      sideFilters: obj.sideFilters || {likes: false, recent: true}
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
