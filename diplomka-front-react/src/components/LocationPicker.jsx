import { useCallback, useMemo, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const defaultCenter = {
    lat: 48.7164,
    lng: 21.2611,
};

export default function LocationPicker({ onChange }) {
    const [position, setPosition] = useState(defaultCenter);
    const [map, setMap] = useState(null);

    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyC4mvKqFx7UpDau_aEpiTSTPZp9uCGEU6U",
    });

    const center = useMemo(() => position, [position]);

    const updatePosition = useCallback(
        (coords) => {
            setPosition(coords);
            onChange?.(coords);
        },
        [onChange]
    );

    const handleUseMyLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert("Геолокація не підтримується браузером");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };

                updatePosition(coords);

                if (map) {
                    map.panTo(coords);
                    map.setZoom(16);
                }
            },
            (err) => {
                console.error(err);
                alert("Не вдалося отримати локацію");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }, [map, updatePosition]);

    const handleMapClick = useCallback(
        (e) => {
            if (!e.latLng) return;

            const coords = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            };

            updatePosition(coords);
        },
        [updatePosition]
    );

    const handleMarkerDragEnd = useCallback(
        (e) => {
            if (!e.latLng) return;

            const coords = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            };

            updatePosition(coords);
        },
        [updatePosition]
    );

    const handleLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    if (loadError) {
        return <div>Помилка завантаження Google Maps</div>;
    }

    if (!isLoaded) {
        return <div>Завантаження карти...</div>;
    }

    return (
        <div>
            <button type="button" onClick={handleUseMyLocation}>
                Використати мою локацію
            </button>

            <div style={{ margin: "12px 0" }}>
                <strong>lat:</strong> {position.lat} <strong>lng:</strong> {position.lng}
            </div>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onClick={handleMapClick}
                onLoad={handleLoad}
                options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                <Marker
                    position={position}
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                />
            </GoogleMap>
        </div>
    );
}