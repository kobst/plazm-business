import React, { useState, useEffect, useRef } from "react";
import Input from '../component/UI/Input/Input'
      function SearchLocationInput({id,handleChange,error,setBusinessInfo,setName}) { 
            const [query, setQuery] = useState("");
            const autoCompleteRef = useRef(null);
            let autoComplete;

            const loadScript = (url, callback) => {
                let script = document.createElement("script");
                script.type = "text/javascript";
    
                    if (script.readyState) {
                        script.onreadystatechange = function() {
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
                          autoComplete = new window.google.maps.places.Autocomplete(
                          autoCompleteRef.current
                        );
                          autoComplete.addListener("place_changed", () =>
                         handlePlaceSelect(updateQuery)
                        );
                        }
    
                async function handlePlaceSelect(updateQuery) {
                     const addressObject = autoComplete.getPlace();
                     const value = addressObject.name
                     setBusinessInfo(addressObject)
                     setName(value)
                     updateQuery(value)
                }

            useEffect(() => {
            loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVZIvAZkQsaxLD3UdFH5EH3DvYmSYG6Q&libraries=places`,
             () => handleScriptLoad(setQuery, autoCompleteRef)
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Input
                error={error}
                id={id}
                refs={autoCompleteRef}
                // eslint-disable-next-line no-sequences
                onChange={event => (setQuery(event.target.value), handleChange(event))}
                placeholder=""
                value={query}
            />
            
            );
        }

    export default SearchLocationInput;
