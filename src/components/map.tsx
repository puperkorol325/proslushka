import React from "react";
import { Yamap } from "react-native-yamap-plus";
import mapCustomization from "../../proslushka_map_customization.json";

type MapProps = {
    style: {[key: string]: any };
    onPress?: (e?: any) => void;
};

const Map: React.FC<MapProps> = ({ style, onPress }) => {

    return (
        <Yamap 
            style={style} 
            initialRegion={{
                lat: 55.5,
                lon: 37.3,
                zoom: 11
            }}
            onMapPress={onPress}
            nightMode={true}
            mapStyle={JSON.stringify(mapCustomization)}
            />
    );
}

export default Map;