/*
@desc: create post graphQL mutation
@params: business, data, media, taggedUsers, taggedLists, ownerId
*/
const createPost = (values) => {
  const graphQl = {
    query: `
          mutation CreatePost($business: ID, $data:String, $media:[media], $taggedUsers:[ID], $taggedLists: [ID], $ownerId: ID, $listId: ID){
              createPost(input: {business:$business, data:$data, media:$media, taggedUsers:$taggedUsers, taggedLists:$taggedLists, ownerId:$ownerId, listId:$listId }) {
              message
              success
              totalPosts
              post {
                _id
                data
                listId {
                  _id
                  name
                }
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
      listId: values.listId,
    },
  };
  return graphQl;
};

/*
@desc: add like to a post
@params: postId, userId
*/
const addLikeToPost = (values) => {
  const graphQl = {
    query: `
          mutation AddLikeToPost($id: ID!, $userId:ID!){
            addLikeToPost(input: {id:$id, userId:$userId}) {
              message
              success
              like {
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
      id: values.postId,
      userId: values.userId,
    },
  };
  return graphQl;
};

export { createPost, addLikeToPost };
