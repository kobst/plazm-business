import React, { useState, useEffect, useRef } from "react";
import Input from '../component/UI/Input/Input'
      function SearchLocationInput() { 
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
                          autoComplete.setFields(["address_components", "formatted_address","name"]);
                          autoComplete.addListener("place_changed", () =>
                         handlePlaceSelect(updateQuery)
                        );
                        }
    
                async function handlePlaceSelect(updateQuery) {
                     const addressObject = autoComplete.getPlace();
                     const value = addressObject.name
                     updateQuery(value);
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
                refs={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Business Name"
                value={query}
            />
            
            );
        }

    export default SearchLocationInput;
