/*
@desc: create post graphQL mutation
@params: business, data, media, taggedUsers, taggedLists, ownerId
*/
const createPost = (values) => {
  const graphQl = {
    query: `
          mutation CreatePost($business: ID, $data:String, $media:[media], $taggedUsers:[ID], $taggedLists: [ID], $ownerId: ID){
              createPost(input: {business:$business, data:$data, media:$media, taggedUsers:$taggedUsers, taggedLists:$taggedLists, ownerId:$ownerId }) {
              message
              success
              post {
                _id
                data
                business {
                  _id
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
              taggedLists
              ownerId
              likes
              media {
                  image
                  thumbnail
              }
              createdAt
              updatedAt   
              }
            }
          }`,
    variables: {
      business: values.business,
      data: values.data,
      media: values.media,
      taggedUsers: values.taggedUsers,
      taggedLists: values.taggedLists,
      ownerId: values.ownerId,
    },
  };
  return graphQl;
};

export { createPost };
