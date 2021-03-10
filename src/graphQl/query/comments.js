/*
@desc: findPostComments query
*/
const findPostComments = (id) => {
    const graphQl = {
      query: `
            query GetComment($id: ID!){
                getComment(input: {id:$id}) {
                message
                success
                post {
                    _id
                    itemId 
                    userId {
                        _id
                        name
                        email
                        phoneNumber
                        userSub
                        photo
                        lockProfile
                        }
                      taggedUsers {
                          _id
                          name
                          email
                        }
                      body
                      likes {
                        _id
                        name
                        email
                        phoneNumber
                        userSub
                        photo
                        lockProfile
                      }
                      replies {
                          userId {
                            _id
                            name
                            email
                            phoneNumber
                            userSub
                            photo
                            lockProfile
                            }
                            taggedUsers {
                              _id
                              name
                              email
                            }
                      body
                      created_on
                  }
                  createdAt
                  updatedAt
              }
              }
            }`,
            variables: {
                id:id,
              },
    };
    return graphQl;
  };
  export { findPostComments };