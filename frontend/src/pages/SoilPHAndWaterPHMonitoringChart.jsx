/**
 * Sample for Column series
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
export let data1 = [
  { x: "2024-09-24", y: 6.1, toolTipMappingName: "Soil Moisture: 23.7" },
  { x: "2024-09-25", y: 6.2, toolTipMappingName: "Soil Moisture: 25.2" },
  { x: "2024-09-26", y: 6.0, toolTipMappingName: "Soil Moisture: 22.9" },
  { x: "2024-09-27", y: 6.1, toolTipMappingName: "Soil Moisture: 24.1" },
  { x: "2024-09-28", y: 6.2, toolTipMappingName: "Soil Moisture: 23.5" },
  { x: "2024-09-29", y: 6.3, toolTipMappingName: "Soil Moisture: 24.8" },
  { x: "2024-09-30", y: 6.1, toolTipMappingName: "Soil Moisture: 25.0" },
  { x: "2024-10-1", y: 6.0, toolTipMappingName: "Soil Moisture: 24.3" },
  { x: "2024-10-2", y: 6.3, toolTipMappingName: "Soil Moisture: 24.5" },
  { x: "2024-10-3", y: 6.2, toolTipMappingName: "Soil Moisture: 25.3" },
];
export let data2 = [
  { x: "2024-09-24", y: 7.3, toolTipMappingName: "Soil Moisture: 23.7" },
  { x: "2024-09-25", y: 7.2, toolTipMappingName: "Soil Moisture: 25.2" },
  { x: "2024-09-26", y: 7.4, toolTipMappingName: "Soil Moisture: 22.9" },
  { x: "2024-09-27", y: 7.3, toolTipMappingName: "Soil Moisture: 24.1" },
  { x: "2024-09-28", y: 7.2, toolTipMappingName: "Soil Moisture: 23.5" },
  { x: "2024-09-29", y: 7.1, toolTipMappingName: "Soil Moisture: 24.8" },
  { x: "2024-09-30", y: 7.3, toolTipMappingName: "Soil Moisture: 25.0" },
  { x: "2024-10-1", y: 7.4, toolTipMappingName: "Soil Moisture: 24.3" },
  { x: "2024-10-2", y: 7.1, toolTipMappingName: "Soil Moisture: 24.5" },
  { x: "2024-10-3", y: 7.1, toolTipMappingName: "Soil Moisture: 25.3" },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const SoilPHAndWaterPHMonitoringChart = () => {
  const loaded = (args) => {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  };
  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Fluent2";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
    if (selectedTheme === "highcontrast") {
      args.chart.series[0].marker.dataLabel.font.color = "#000000";
      args.chart.series[1].marker.dataLabel.font.color = "#000000";
      args.chart.series[2].marker.dataLabel.font.color = "#000000";
    }
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          legendSettings={{ enableHighlight: true }}
          primaryXAxis={{
            labelIntersectAction: Browser.isDevice ? "None" : "Trim",
            labelRotation: Browser.isDevice ? -45 : 0,
            valueType: "Category",
            interval: 1,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
          }}
          primaryYAxis={{
            title: "Medal Count",
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            maximum: 10,
            interval: 10,
          }}
          chartArea={{ border: { width: 0 } }}
          load={load.bind(this)}
          tooltip={{
            enable: true,
            header: "<b>${point.tooltip}</b>",
            shared: true,
          }}
          width={Browser.isDevice ? "100%" : "75%"}
          title="Olympic Medal Counts - RIO"
          loaded={loaded.bind(this)}
        >
          <Inject
            services={[
              ColumnSeries,
              Legend,
              Tooltip,
              Category,
              DataLabel,
              Highlight,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              tooltipMappingName="toolTipMappingName"
              xName="x"
              columnSpacing={0.1}
              yName="y"
              name="Gold"
              type="Column"
            />
            <SeriesDirective
              dataSource={data2}
              tooltipMappingName="toolTipMappingName"
              xName="x"
              columnSpacing={0.1}
              yName="y"
              name="Silver"
              type="Column"
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};
export default SoilPHAndWaterPHMonitoringChart;
