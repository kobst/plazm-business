/*
@desc: add like to a event
@params: postId, userId
*/
const addLikeToEvents = (values) => {
    const graphQl = {
      query: `
            mutation AddLikeToEvents($id: ID!, $userId:ID!){
                addLikeToEvents(input: {id:$id, userId:$userId}) {
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
        id: values.eventId,
        userId: values.userId,
      },
    };
    return graphQl;
  };
  
  export { addLikeToEvents };