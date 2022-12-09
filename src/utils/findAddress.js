/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Input from '../component/UI/Input/Input'
      function FindAddress({id,handleChange,addressValue,setAddress}) { 
            const [query, setQuery] = useState(addressValue);
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
                     const value = addressObject.formatted_address
                     updateQuery(value)
                     setAddress(value)
                }

            useEffect(() => {
            loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
             () => handleScriptLoad(setQuery, autoCompleteRef)
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Input
                id={id}
                refs={autoCompleteRef}
                // eslint-disable-next-line no-sequences
                onChange={event => (setQuery(event.target.value), handleChange(event))}
                placeholder=""
                value={addressValue}
            />
            
            );
        }

    export default FindAddress;
