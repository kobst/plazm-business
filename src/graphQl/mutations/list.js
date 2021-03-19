/*
@desc: add list
@params: name, description, media, ownerId
*/
const CreateList = (values) => {
    const graphQl = {
      query: `
            mutation CreateList($name: String, $description:String, $media:[media], $ownerId: ID){
                createList(input: {name:$name, description:$description, media:$media, ownerId:$ownerId}) {
                message
                success
                list {
                    _id
                    name
                    description
                    ownerId
                    posts
                    likes
                    followers
                    media {
                      image
                      thumbnail
                    }
                  }
              }
            }`,
      variables: {
        name: values.title,
        description: values.description,
        media: values.media,
        ownerId: values.ownerId,
      },
    };
    return graphQl;
  };

/*
@desc: add post to a list
@params: name, description, media, ownerId
*/
const addPostToList = (values) => {
  const graphQl = {
    query: `
          mutation addPostToList($listId: ID!, $postId:ID! ){
            addPostToList(input: {listId:$listId, postId:$postId}) {
              message
              success
              list {
                  _id
                  name
                  description
                  ownerId
                  posts
                  likes
                  followers
                  media {
                    image
                    thumbnail
                  }
                }
            }
          }`,
    variables: {
      listId: values.listId,
      postId: values.postId,
    },
  };
  return graphQl;
};
  
  export { CreateList, addPostToList };