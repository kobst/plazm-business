import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  if (autoCompleteRef.current.length < 4) {
    return;
  }
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function GooglePlacesSearch({
  autoCompleteRef,
  isNoDataFound,
  query,
  onChange,
  disabled,
  placeholder,
  searchFeedList,
}) {
  const history = useHistory();

  useEffect(() => {
    if (isNoDataFound) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q&libraries=places`,
        () => handleScriptLoad(onChange, autoCompleteRef)
      );
    }
  }, [isNoDataFound]);

  /** to display business details page */
  const displayBusinessDetail = (id) => {
    history.push(`/b/${id}`);
  };

  return (
    <>
      <input
        ref={autoCompleteRef}
        value={query}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      {searchFeedList.length &&
        searchFeedList.map((ele) => {
          return (
            <ul>
              <li onClick={() => displayBusinessDetail(ele._id)}>
                {ele.company_name}
              </li>
            </ul>
          );
        })}
    </>
  );
}

export default GooglePlacesSearch;
