/*
@desc: add place graphQL mutation
@params: name, email, phoneNumber, userSub
*/
const AddUser = (values) => {
  const graphQl = {
    query: `
          mutation AddUser($name:String, $email:String, $phoneNumber:String, $userSub:String){
            addUser(input: { name:$name, email:$email, phoneNumber:$phoneNumber, userSub:$userSub}) {
              message
              success
              user {
                  name
                  email
                  phoneNumber
                  userSub
              }
            }
          }`,
    variables: {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      userSub: values.userSub,
    },
  };
  return graphQl;
};

/*
@desc: update user profile graphQL mutation
@params: name, email, phoneNumber, userSub
*/
const updateUserProfile = (values) => {
  const graphQl = {
    query: `
          mutation UpdateProfile($name:String, $email:String, $phoneNumber:String, $userSub:String, $photo:String, $lockProfile:Int){
            updateProfile(input: { name:$name, email:$email, phoneNumber:$phoneNumber, userSub:$userSub, photo:$photo, lockProfile:$lockProfile}) {
              message
              success
              user {
                  name
                  email
                  phoneNumber
                  userSub
                  lockProfile
                  photo 
              }
            }
          }`,
    variables: {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      userSub: values.userSub,
      photo: values.photo? values.photo:"",
      lockProfile: values.lockProfile
    },
  };
  return graphQl;
};

export { AddUser, updateUserProfile };
