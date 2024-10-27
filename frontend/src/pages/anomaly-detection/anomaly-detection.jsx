import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  Page,
} from "@syncfusion/ej2-react-grids";
import { machineDataList } from "./datasource";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { isNullOrUndefined } from "@syncfusion/ej2-base";
import ollama from "ollama";

function AnamolyDetection() {
  let gridInstance;
  let AIgeneratedData = [];
  const toolbarTemplate = () => {
    return (
      <ButtonComponent
        id="anomaly"
        isPrimary={true}
        onClick={DetectAnomalyData}
      >
        Detect Anomaly Data
      </ButtonComponent>
    );
  };
  const toolbarOptions = [{ template: toolbarTemplate }];
  function DetectAnomalyData() {
    gridInstance.showSpinner();
    DetectAnamolyData();
  }
  const DetectAnamolyData = async () => {
    const gridReportJson = JSON.stringify(gridInstance.dataSource);
    const userInput = generatePrompt(gridReportJson);

    try {
      const response = await ollama.chat({
        model: "llama3.2:3b",
        messages: [{ role: "user", content: userInput }],
      });

      let aiOutput = response.message.content;

      // Remove the markdown code block and parse the JSON directly
      aiOutput = aiOutput.replace("```json", "").replace("```", "");
      AIgeneratedData = JSON.parse(aiOutput);

      gridInstance.hideSpinner();

      if (AIgeneratedData.length) {
        gridInstance.showColumns(["Anomaly Description"]);
        for (let i = 0; i < AIgeneratedData.length; i++) {
          const item = AIgeneratedData[i];
          gridInstance.setRowData(item.MachineID, item);
        }
      }
    } catch (error) {
      console.error("Error detecting anomaly data:", error);
      gridInstance.hideSpinner(); // Ensure spinner is hidden in case of error
    }
  };

  function generatePrompt(data) {
    return `Given the following datasource are bounded in the Grid table\n\n${data}.\n Return the anomaly data rows (ie. pick the ir-relevant datas mentioned in the corresponding table) present in the table mentioned above as like in the same format provided do not change the format. Example: Watch out the soil_moisture count and the factors that is used to acheive the mentioned production rate(air_temperature, humidiy, soil_temperature) If the soil_moisture is not relevant to the concern factors mark it as anomaly Data. If it is anomaly data then due to which column data it is marked as anomaly that particular column name should be updated in the AnomalyFieldName. Also Update the AnomalyDescription stating that due to which reason it is marked as anomaly a short description. Example if the data is marked as anomaly due to the Temperature column, Since the mentioned temperature is too high than expected, it is marked as anomaly data.\n\nGenerate an output in JSON format only and Should not include any additional information or contents in response`;
  }
  function CustomizeCell(args) {
    if (AIgeneratedData != null && AIgeneratedData.length > 0) {
      let isAnamolyData = false;
      AIgeneratedData.map((e) => {
        if (
          !isNullOrUndefined(e.AnomalyFieldName) &&
          e.timestamp === args.data.timestamp &&
          (e.AnomalyFieldName === args.column?.field ||
            args.column?.field === "AnomalyDescription")
        ) {
          isAnamolyData = true;
        }
      });
      if (isAnamolyData) {
        args.cell?.classList.add("anomaly-cell");
        args.cell?.classList.remove("normal-cell");
      }
    } else if (args.column?.field === "AnomalyDescription") {
      args.cell?.classList.add("normal-cell");
    }
  }
  return (
    <div className="control-pane">
      <div className="control-section">
        <div id="container">
          <GridComponent
            id="Grid"
            ref={(grid) => (gridInstance = grid)}
            dataSource={machineDataList}
            toolbar={toolbarOptions}
            queryCellInfo={CustomizeCell}
            enableHover={false}
            enableStickyHeader={true}
            allowTextWrap={true}
            rowHeight={75}
            height={450}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="timestamp"
                isPrimaryKey={true}
                headerText="Timestamp"
                textAlign="Right"
                width={85}
              />
              <ColumnDirective
                field="soil_moisture"
                headerText="Soil Moisture"
                textAlign="Right"
                width={120}
              />
              <ColumnDirective
                field="air_temperature"
                headerText="Air Temperature"
                textAlign="Right"
                width={100}
              />
              <ColumnDirective
                field="humidity"
                headerText="Humidity"
                textAlign="Right"
                width={100}
              />
              <ColumnDirective
                field="soil_temperature"
                headerText="Soil Temperature"
                textAlign="Right"
                width={140}
              />
              <ColumnDirective
                field="soil_ph"
                headerText="Soil pH"
                textAlign="Right"
                width={140}
              />
              <ColumnDirective
                field="water_ph"
                headerText="Water pH"
                textAlign="Right"
                width={140}
              />
              <ColumnDirective
                field="AnomalyDescription"
                visible={false}
                headerText="Anomaly Description"
                width={290}
              />
            </ColumnsDirective>
            <Inject services={[Toolbar, Page]} />
          </GridComponent>
        </div>
      </div>
    </div>
  );
}
export default AnamolyDetection;
