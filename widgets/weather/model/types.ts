export interface WeatherWidgetWithGraphProps {
    lat: number;
    lon: number;
    onDelete?: VoidFunction; 
    isShowButton?: boolean;
    isFull?: boolean;
}