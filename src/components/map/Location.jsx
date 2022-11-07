import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "../../reducers/map";

const Location = memo(({ state }) => {
  const [coords, setCoords] = useState([41.634384, 69.937986]);
	const dispatch = useDispatch();
  const ymaps = useYMaps()

  const onMapClick = (event) => {
    const newCoords = event.get("coords");

    ymaps.geocode(newCoords).then((res) => {
      const firstGeoObject = res.geoObjects.get(0);

      // getAdministrativeAreas Ташкентская область,Бостанлыкский район
      // getLocalities городской посёлок Чарвак
      // getThoroughfare городской улица Нурчилар
      // getPremiseNumber 9

      if (firstGeoObject.getPremiseNumber()) {
        const newAddress = [
          firstGeoObject.getAdministrativeAreas(),
          firstGeoObject.getLocalities(),
          firstGeoObject.getThoroughfare(),
          firstGeoObject.getPremiseNumber()
        ].join(", ");
        setCoords(newCoords);
				dispatch(setAddress(newAddress))

  
      } else if (firstGeoObject.getThoroughfare()) {
        const newAddress = [
          firstGeoObject.getLocalities(),
          firstGeoObject.getThoroughfare()
        ].join(", ");

      } 
    });
  };
  
  return (
    <Map
      // onLoad={(ymaps) => loadSuggest(ymaps)}
      state={state}
      onClick={onMapClick}
      modules={["SuggestView", "control.SearchControl", "geocode"]}
      width="100%"
      height="60vh"
      controls={[]}
    >
      <Placemark geometry={coords} />
    </Map>
  );
});

export default Location