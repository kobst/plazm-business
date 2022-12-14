import React, {useEffect} from 'react';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const unloadScript = () => {
  if (!!document.querySelector('.pac-container')) {
    document.querySelector('.pac-container').remove();
    return;
  }
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  if (autoCompleteRef.current.length < 4) {
    return;
  }
  autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current);
  autoComplete.addListener('place_changed', () => handlePlaceSelect(updateQuery));
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  updateQuery(addressObject, true);
}

function GooglePlacesSearch({autoCompleteRef, isNoDataFound, query, onChange, disabled, placeholder}) {
  useEffect(() => {
    if (isNoDataFound) {
      loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
          () => handleScriptLoad(onChange, autoCompleteRef)
      );
    } else unloadScript();
  }, [isNoDataFound]);

  return (
    <input
      ref={autoCompleteRef}
      value={query}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
}

export default GooglePlacesSearch;
