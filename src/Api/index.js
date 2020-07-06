// export const callApi = async() => {
//     const response= await fetch(`http://localhost:4000/api/place/${name}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const body = await response.text();
//   return JSON.parse(body)
// }
// export const addUser = async () => {
//     const response= await fetch(`http://localhost:4000/api/users`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             name:username,
//            lastName:lastName,
//           phoneNumber:phone_number,
//            email:email,
//            password:password

//         })
//       });
//       const body = await response.text();
//       const id = JSON.parse(body).list._id
//       return id

// }
// export const addBusiness = async (userId) => {
//     const response= await fetch(`http://localhost:4000/api/place`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
            
//                 status: businessInfo.business_status,
//                 userAddress: businessInfo.formatted_address,
//                 telephone: businessInfo.international_phone_number,
//                 companyName:businessInfo.name,
//                 placeId: businessInfo.place_id,
//                 mapLink:businessInfo.url,
//                 rating: businessInfo.rating,
//                 website: businessInfo.website,
//                 userId: userId,
//                 latitude: businessInfo.geometry.location.lat(),
//                 longitude: businessInfo.geometry.location.lng(),
            
//       })
//     });
//       const body = await response.text();
//       console.log(body)
//       return body

// }
// export const updateBusiness = async (userId) => {
//     const response= await fetch(`http://localhost:4000/api/place`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({  
//              userId: userId,
                
            
//       })
//     });
//       const body = await response.text();
//       console.log(body)
//       return body

// }