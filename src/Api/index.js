export const callPlace = async (userSub) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/place-fetch/${userSub}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  const val = JSON.parse(body)
  return val
}
export const fetchPosts = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  const val = JSON.parse(body)
  return val
}

export const fetchComments = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  const val = JSON.parse(body)
  return val
}
export const fetchEvents = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  const val = JSON.parse(body)
  return val
}
export const fetchUsers = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/accounts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  const val = JSON.parse(body)
  return val
}

export const callApi = async (name) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/place/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const body = await response.text();
  return JSON.parse(body)
}

export const addBusiness = async (userSub, businessInfo) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      status: businessInfo.business_status,
      userAddress: businessInfo.formatted_address,
      telephone: businessInfo.international_phone_number,
      companyName: businessInfo.name,
      placeId: businessInfo.place_id,
      mapLink: businessInfo.url,
      rating: businessInfo.rating,
      website: businessInfo.website,
      userSub: userSub,
      latitude: businessInfo.geometry.location.lat(),
      longitude: businessInfo.geometry.location.lng(),

    })
  });
  const body = await response.text();
  return body

}
export const updateBusiness = async (value, userSub) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: value._id,
      status: value.status,
      userAddress: value.address,
      telephone: value.telephone,
      companyName: value.company_name,
      placeId: value.place_id,
      mapLink: value.url,
      type: value.type,
      rating: value.rating,
      website: value.web_site,
      userSub: userSub,
      latitude: value.latitude,
      longitude: value.longitude,
      city: value.city,
      postalCode: value.postalCode,
      stateProvince: value.stateProvince,
      twitter: value.handles.twitter,
      instagram: value.handles.instagram,
      facebook: value.handles.facebook,
      linkedin: value.handles.linkedin,
      filterTags: value.filter_tags,
      file: value.default_image_url,
      price: value.price,
      genType: value.genType,
      openingHours: value.hours,


    })
  });
  const body = await response.text();
  return body

}
