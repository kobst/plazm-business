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

/*
@desc: create event graphQL mutation
@params: title, description, user, eventSchedule, recurring, media
*/
const createEvent = (values) => {
  const graphQl = {
    query: `
        mutation AddEvent($title: String, $description:String, $user:ID, $business:ID,  $eventSchedule:eventScheduleInput, $recurring:String, $media:[media]){
            addEvent(input: {title:$title, description:$description, user:$user, business:$business, eventSchedule:$eventSchedule, recurring: $recurring, media: $media}) {
            message
            success
            event {
              _id
              business {
                _id
                company_name
              }
              user {
                _id
                name
                photo
              }
              title
              description
              eventSchedule {
                start_time
                end_time
              }
              recurring
              media {
                image
                thumbnail
              }
            }
          }
        }`,
    variables: {
      title: values.title,
      description: values.description,
      user: values.user,
      business: values.business,
      eventSchedule: values.eventSchedule,
      recurring: values.recurring,
      media: values.media,
    },
  };
  return graphQl;
};

export { addLikeToEvents, createEvent };
